import { Link } from 'react-router-dom'
import { FiMail, FiPhone, FiMapPin, FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi'

const Footer = () => (
  <footer className="bg-gray-50 dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-base">F</span>
            </div>
            <span className="text-base font-bold text-gray-900 dark:text-white">FindIt</span>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mb-5">
            FindIt is a campus lost and found platform designed to help students and staff reunite with their lost items. Because every item matters.
          </p>
          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <a href="mailto:support@findit.com" className="flex items-center gap-2 hover:text-green-600 transition-colors">
              <FiMail size={14}/> support@findit.com
            </a>
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-green-600 transition-colors">
              <FiPhone size={14}/> +91 98765 43210
            </a>
            <p className="flex items-center gap-2">
              <FiMapPin size={14}/> University Campus, Block A
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-widest mb-4">Quick Links</h3>
          <ul className="space-y-2.5">
            {[['/', 'Home'], ['/browse', 'Browse Items'], ['/report-lost', 'Report Lost'], ['/report-found', 'Report Found']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-widest mb-4">Help</h3>
          <ul className="space-y-2.5">
            {[['#', 'FAQs'], ['/contact', 'Contact Us'], ['/about', 'About FindIt'], ['#', 'Privacy Policy'], ['#', 'Terms of Use']].map(([to, label]) => (
              <li key={label}>
                <Link to={to} className="text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} FindIt. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-gray-400 hover:text-green-600 transition-colors"><FiGithub size={16}/></a>
          <a href="#" className="text-gray-400 hover:text-green-600 transition-colors"><FiTwitter size={16}/></a>
          <a href="#" className="text-gray-400 hover:text-green-600 transition-colors"><FiInstagram size={16}/></a>
          <a href="mailto:support@findit.com" className="text-gray-400 hover:text-green-600 transition-colors"><FiMail size={16}/></a>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
