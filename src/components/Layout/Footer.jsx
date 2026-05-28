import { Link } from 'react-router-dom'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/i18n/translations'
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi'

/**
 * Footer Component
 * Site footer with links and contact information
 */
const Footer = () => {
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">FindIt</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t.footer.aboutDesc}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                <FiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">{t.nav.home}</Link></li>
              <li><Link to="/browse" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">{t.nav.browse}</Link></li>
              <li><Link to="/report-lost" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">{t.nav.reportLost}</Link></li>
              <li><Link to="/report-found" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">{t.nav.reportFound}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t.footer.contact}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <FiMail className="w-4 h-4" />
                <span>support@findit.edu</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <FiPhone className="w-4 h-4" />
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <FiMapPin className="w-4 h-4" />
                <span>Campus, City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} FindIt. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
