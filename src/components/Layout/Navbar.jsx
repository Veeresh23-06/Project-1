import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useLanguageStore } from '@/store/languageStore'
import { useThemeStore } from '@/store/themeStore'
import { translations } from '@/i18n/translations'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'
import toast from 'react-hot-toast'
import {
  FiMenu, FiX, FiSun, FiMoon, FiMonitor,
  FiUser, FiLogOut, FiGrid, FiChevronDown,
} from 'react-icons/fi'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  const { user } = useAuthStore()
  const { language, setLanguage } = useLanguageStore()
  const { theme, setTheme } = useThemeStore()
  const navigate = useNavigate()
  const location = useLocation()
  const navRef = useRef(null)
  const tr = translations[language]  // renamed to avoid shadowing

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setUserOpen(false)
        setThemeOpen(false)
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      toast.success('Logged out')
      navigate('/')
      setUserOpen(false)
    } catch {
      toast.error('Logout failed')
    }
  }

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  const linkCls = (path) =>
    `text-sm font-medium transition-colors ${
      isActive(path)
        ? 'text-green-600 dark:text-green-400'
        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
    }`

  const themeIcons = {
    light: <FiSun size={16} />,
    dark: <FiMoon size={16} />,
    system: <FiMonitor size={16} />,
  }

  const navLinks = [
    ['/', tr.nav.home],
    ['/browse', tr.nav.browse],
    ['/report-lost', tr.nav.reportLost],
    ['/report-found', tr.nav.reportFound],
    ['/about', tr.nav.about],
    ['/contact', tr.nav.contact],
  ]

  return (
    <nav ref={navRef} className="sticky top-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="text-base font-bold text-gray-900 dark:text-white">FindIt</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map(([path, label]) => (
            <Link key={path} to={path} className={linkCls(path)}>{label}</Link>
          ))}
        </div>

        {/* Right side controls */}
        <div className="hidden md:flex items-center gap-1.5">

          {/* Theme */}
          <div className="relative">
            <button
              onClick={() => { setThemeOpen(!themeOpen); setLangOpen(false); setUserOpen(false) }}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {themeIcons[theme]}
            </button>
            {themeOpen && (
              <div className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-1 z-50">
                {(['light', 'dark', 'system']).map((option) => (
                  <button
                    key={option}
                    onClick={() => { setTheme(option); setThemeOpen(false) }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800
                      ${theme === option ? 'text-green-600 font-semibold' : 'text-gray-700 dark:text-gray-300'}`}
                  >
                    {themeIcons[option]}
                    <span className="capitalize">{option}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language */}
          <div className="relative">
            <button
              onClick={() => { setLangOpen(!langOpen); setThemeOpen(false); setUserOpen(false) }}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {language.toUpperCase()} <FiChevronDown size={12} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-1 z-50">
                {[['en', 'English'], ['kn', 'ಕನ್ನಡ'], ['hi', 'हिंदी']].map(([code, label]) => (
                  <button
                    key={code}
                    onClick={() => { setLanguage(code); setLangOpen(false) }}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800
                      ${language === code ? 'text-green-600 font-semibold' : 'text-gray-700 dark:text-gray-300'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User / Login */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => { setUserOpen(!userOpen); setThemeOpen(false); setLangOpen(false) }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <FiChevronDown size={12} className="text-gray-500" />
              </button>
              {userOpen && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-1 z-50">
                  <div className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                      {user.displayName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setUserOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FiGrid size={14} /> {tr.nav.dashboard}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                  >
                    <FiLogOut size={14} /> {tr.nav.logout}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
            >
              {tr.nav.login}
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-4 space-y-1">
          {navLinks.map(([path, label]) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive(path)
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-1">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {tr.nav.dashboard}
                </Link>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false) }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                >
                  {tr.nav.logout}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-white bg-green-600 text-center hover:bg-green-700"
              >
                {tr.nav.login}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
