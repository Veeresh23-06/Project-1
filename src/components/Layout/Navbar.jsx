import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useLanguageStore } from '@/store/languageStore'
import { useThemeStore } from '@/store/themeStore'
import { translations } from '@/i18n/translations'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'
import toast from 'react-hot-toast'
import { 
  FiMenu, FiX, FiSun, FiMoon, FiMonitor, 
  FiUser, FiLogOut, FiSettings 
} from 'react-icons/fi'

/**
 * Navbar Component
 * Responsive navigation with theme toggle and language selector
 */
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  
  const { user } = useAuthStore()
  const { language, setLanguage } = useLanguageStore()
  const { theme, setTheme } = useThemeStore()
  const navigate = useNavigate()
  
  const t = translations[language]

  const handleLogout = async () => {
    try {
      await signOut(auth)
      toast.success('Logged out successfully')
      navigate('/')
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  const themeIcons = {
    light: <FiSun className="w-5 h-5" />,
    dark: <FiMoon className="w-5 h-5" />,
    system: <FiMonitor className="w-5 h-5" />,
  }

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              FindIt
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">{t.nav.home}</Link>
            <Link to="/browse" className="nav-link">{t.nav.browse}</Link>
            <Link to="/report-lost" className="nav-link">{t.nav.reportLost}</Link>
            <Link to="/report-found" className="nav-link">{t.nav.reportFound}</Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <div className="relative">
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {themeIcons[theme]}
              </button>
              {themeMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2">
                  {['light', 'dark', 'system'].map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTheme(t)
                        setThemeMenuOpen(false)
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                    >
                      {themeIcons[t]}
                      <span className="capitalize">{t}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
              >
                {language.toUpperCase()}
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2">
                  {['en', 'kn', 'hi'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang)
                        setLangMenuOpen(false)
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {lang === 'en' ? 'English' : lang === 'kn' ? 'ಕನ್ನಡ' : 'हिंदी'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Menu or Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <FiUser className="w-5 h-5" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      {t.nav.dashboard}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 text-red-600"
                    >
                      <FiLogOut />
                      <span>{t.nav.logout}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                {t.nav.login}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" className="block py-2">{t.nav.home}</Link>
            <Link to="/browse" className="block py-2">{t.nav.browse}</Link>
            <Link to="/report-lost" className="block py-2">{t.nav.reportLost}</Link>
            <Link to="/report-found" className="block py-2">{t.nav.reportFound}</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block py-2">{t.nav.dashboard}</Link>
                <button onClick={handleLogout} className="block py-2 text-red-600">
                  {t.nav.logout}
                </button>
              </>
            ) : (
              <Link to="/login" className="block py-2">{t.nav.login}</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
