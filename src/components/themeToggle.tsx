import { useEffect, useRef, useState } from "react"
import { Sun, Moon, Laptop } from "lucide-react"

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system")
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  
  useEffect(() => {
    const root = document.documentElement

    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      root.classList.remove("dark")
      if (isDark) root.classList.add("dark")
      localStorage.removeItem("theme")
    } else if (theme === "dark") {
      root.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      root.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [theme])

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {theme === "light" ? (
          <Sun className="h-5 w-5 text-yellow-500" />
        ) : theme === "dark" ? (
          <Moon className="h-5 w-5 text-blue-400" />
        ) : (
          <Laptop className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          <button
            onClick={() => setTheme("light")}
            className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Sun className="mr-2 h-4 w-4" /> Light
          </button>
          <button
            onClick={() => setTheme("dark")}
            className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Moon className="mr-2 h-4 w-4" /> Dark
          </button>
          <button
            onClick={() => setTheme("system")}
            className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Laptop className="mr-2 h-4 w-4" /> System
          </button>
        </div>
      )}
    </div>
  )
}

export default ThemeToggle
