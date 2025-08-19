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
   * Sign up a new user with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {string} name - User's display name
   * @param {string} accountType - Type of account (e.g., 'student', 'teacher', 'admin')
   * @returns {Promise<Object>} - Success/error response
   */
  async signUp(email, password, name, accountType = 'user') {
    try {
      // Validate input
      if (!email || !password || !name) {
        throw new Error('Email, password, and name are required');
      }

      if (password.length < 6) {
        throw new Error('Password should be at least 6 characters long');
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

      return {
        success: true,
        message: 'Account created successfully! Please check your email to verify your account.',
        user: {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified
        }
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

      // Update last login time in Firestore
      await this.updateUserDocument(user.uid, {
        lastLoginAt: serverTimestamp(),
        emailVerified: true
      });

      return {
        success: true,
        message: 'Login successful!',
        user: {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified
        }
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
    return onAuthStateChanged(auth, callback);
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

    return {
      isValid: true,
      message: 'Password strength is good.'
    };
  }
}

// Export a singleton instance
export default new AuthService();