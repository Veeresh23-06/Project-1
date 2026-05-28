import { Link } from 'react-router-dom'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/i18n/translations'
import { FiSearch, FiFileText, FiCheckCircle, FiBell, FiPackage } from 'react-icons/fi'
import { motion } from 'framer-motion'

/**
 * Home Page Component
 * Landing page with hero section, how it works, and recent items
 */
const HomePage = () => {
  const { language } = useLanguageStore()
  const t = translations[language]

  const features = [
    {
      icon: <FiFileText className="w-8 h-8" />,
      title: t.home.howItWorks.step1.title,
      description: t.home.howItWorks.step1.description,
    },
    {
      icon: <FiSearch className="w-8 h-8" />,
      title: t.home.howItWorks.step2.title,
      description: t.home.howItWorks.step2.description,
    },
    {
      icon: <FiBell className="w-8 h-8" />,
      title: t.home.howItWorks.step3.title,
      description: t.home.howItWorks.step3.description,
    },
    {
      icon: <FiCheckCircle className="w-8 h-8" />,
      title: t.home.howItWorks.step4.title,
      description: t.home.howItWorks.step4.description,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                {t.home.hero.title}
                <br />
                <span className="text-primary-600">{t.home.hero.subtitle}</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t.home.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/report-lost"
                  className="px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all transform hover:scale-105 text-center font-semibold"
                >
                  {t.home.hero.reportLost}
                </Link>
                <Link
                  to="/report-found"
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border-2 border-primary-600 rounded-xl hover:bg-primary-50 dark:hover:bg-gray-700 transition-all text-center font-semibold"
                >
                  {t.home.hero.reportFound}
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-96 flex items-center justify-center">
                <FiPackage className="w-64 h-64 text-primary-600 opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📦</div>
                    <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                      Lost & Found
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.home.howItWorks.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t.home.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your Lost Item?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join hundreds of students who have recovered their belongings
          </p>
          <Link
            to="/browse"
            className="inline-block px-8 py-4 bg-white text-primary-600 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 font-semibold"
          >
            Browse Items Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
