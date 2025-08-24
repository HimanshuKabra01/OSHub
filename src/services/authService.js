// src/services/authService.js
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase.js";

class AuthService {
  
  /**
   * Initialize authentication state
   * @returns {Promise<void>}
   */
  async initializeAuth() {
    try {
      // This method syncs Firebase auth state with localStorage
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user && user.emailVerified) {
            // Get user data from Firestore
            const userData = await this.getUserDocument(user.uid);
            if (userData) {
              const combinedUserData = {
                uid: user.uid,
                email: user.email,
                displayName: userData.name || user.displayName,
                emailVerified: user.emailVerified,
                accountType: userData.accountType
              };
              this.storeUserData(combinedUserData);
            }
          } else {
            this.clearStoredUserData();
          }
          unsubscribe();
          resolve();
        });
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  }

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    const userData = this.getStoredUserData();
    return userData && userData.emailVerified;
  }

  /**
   * Store user data in localStorage
   * @param {Object} userData - User data to store
   */
  storeUserData(userData) {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  }

  /**
   * Get stored user data from localStorage
   * @returns {Object|null}
   */
  getStoredUserData() {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting stored user data:', error);
      return null;
    }
  }

  /**
   * Clear stored user data from localStorage
   */
  clearStoredUserData() {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
    } catch (error) {
      console.error('Error clearing stored user data:', error);
    }
  }

  /**
   * Sign up a new user with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {string} name - User's display name
   * @param {string} accountType - Type of account (e.g., 'developer', 'client', 'both')
   * @returns {Promise<Object>} - Success/error response
   */
  async signUp(email, password, name, accountType = 'developer') {
    try {
      // Validate input
      if (!email || !password || !name) {
        throw new Error('Email, password, and name are required');
      }

      const passwordValidation = this.validatePassword(password);
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.message);
      }

      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Store user data in Firestore
      await this.createUserDocument(user.uid, {
        email: email.toLowerCase(),
        name: name.trim(),
        accountType,
        emailVerified: false,
        createdAt: serverTimestamp(),
        lastLoginAt: null
      });

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: name.trim(),
        emailVerified: user.emailVerified,
        accountType
      };

      return {
        success: true,
        message: 'Account created successfully! Please check your email to verify your account.',
        user: userData
      };

    } catch (error) {
      console.error('Sign up error:', error);
      return {
        success: false,
        message: this.getErrorMessage(error)
      };
    }
  }

  /**
   * Sign in user with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<Object>} - Success/error response
   */
  async signIn(email, password) {
    try {
      // Validate input
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if email is verified
      if (!user.emailVerified) {
        // Sign out the user immediately
        await signOut(auth);
        throw new Error('Please verify your email before logging in. Check your inbox for the verification link.');
      }

      // Get user data from Firestore
      const firestoreUserData = await this.getUserDocument(user.uid);
      
      // Update last login time in Firestore
      await this.updateUserDocument(user.uid, {
        lastLoginAt: serverTimestamp(),
        emailVerified: true
      });

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: firestoreUserData?.name || user.displayName,
        emailVerified: user.emailVerified,
        accountType: firestoreUserData?.accountType || 'developer'
      };

      // Store user data in localStorage
      this.storeUserData(userData);

      return {
        success: true,
        message: 'Login successful!',
        user: userData
      };

    } catch (error) {
      console.error('Sign in error:', error);
      return {
        success: false,
        message: this.getErrorMessage(error)
      };
    }
  }

  /**
   * Sign out the current user
   * @returns {Promise<Object>} - Success/error response
   */
  async signOut() {
    try {
      await signOut(auth);
      this.clearStoredUserData();
      return {
        success: true,
        message: 'Signed out successfully'
      };
    } catch (error) {
      console.error('Sign out error:', error);
      return {
        success: false,
        message: 'Error signing out'
      };
    }
  }

  /**
   * Resend email verification
   * @returns {Promise<Object>} - Success/error response
   */
  async resendEmailVerification() {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No user is currently signed in');
      }

      if (user.emailVerified) {
        throw new Error('Email is already verified');
      }

      await sendEmailVerification(user);
      return {
        success: true,
        message: 'Verification email sent! Please check your inbox.'
      };
    } catch (error) {
      console.error('Resend verification error:', error);
      return {
        success: false,
        message: this.getErrorMessage(error)
      };
    }
  }

  /**
   * Create user document in Firestore
   * @param {string} uid - User's UID
   * @param {Object} userData - User data to store
   */
  async createUserDocument(uid, userData) {
    try {
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, userData);
    } catch (error) {
      console.error('Error creating user document:', error);
      throw error;
    }
  }

  /**
   * Update user document in Firestore
   * @param {string} uid - User's UID
   * @param {Object} updateData - Data to update
   */
  async updateUserDocument(uid, updateData) {
    try {
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, updateData, { merge: true });
    } catch (error) {
      console.error('Error updating user document:', error);
      throw error;
    }
  }

  /**
   * Get user document from Firestore
   * @param {string} uid - User's UID
   * @returns {Promise<Object|null>} - User data or null
   */
  async getUserDocument(uid) {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting user document:', error);
      return null;
    }
  }

  /**
   * Listen to authentication state changes
   * @param {Function} callback - Callback function to handle auth state changes
   * @returns {Function} - Unsubscribe function
   */
  onAuthStateChange(callback) {
    return onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        // Get additional user data from Firestore
        const userData = await this.getUserDocument(user.uid);
        const enhancedUser = {
          ...user,
          displayName: userData?.name || user.displayName,
          accountType: userData?.accountType
        };
        callback(enhancedUser);
      } else {
        callback(user);
      }
    });
  }

  /**
   * Get current user
   * @returns {Object|null} - Current user or null
   */
  getCurrentUser() {
    return auth.currentUser;
  }

  /**
   * Convert Firebase error codes to user-friendly messages
   * @param {Error} error - Firebase error
   * @returns {string} - User-friendly error message
   */
  getErrorMessage(error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/weak-password':
        return 'Password is too weak. Please use at least 6 characters.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';
      case 'auth/invalid-credential':
        return 'Invalid email or password.';
      default:
        // Return custom error messages or fall back to Firebase message
        return errorMessage || 'An unexpected error occurred. Please try again.';
    }
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {Object} - Validation result with isValid and message
   */
  validatePassword(password) {
    if (!password) {
      return {
        isValid: false,
        message: 'Password is required.'
      };
    }

    if (password.length < 6) {
      return {
        isValid: false,
        message: 'Password must be at least 6 characters long.'
      };
    }

    if (password.length < 8) {
      return {
        isValid: true,
        message: 'Password is acceptable but consider using 8+ characters for better security.'
      };
    }

    // Check for basic complexity
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    if (hasLetter && hasNumber) {
      return {
        isValid: true,
        message: 'Password strength is good.'
      };
    }

    return {
      isValid: true,
      message: 'Consider adding numbers and letters for better security.'
    };
  }
}

// Export a singleton instance
export default new AuthService();