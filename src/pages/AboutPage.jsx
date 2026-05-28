import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/i18n/translations'
import { FiCheckCircle, FiSearch, FiShield, FiUsers } from 'react-icons/fi'

/**
 * About Page Component
 */
const AboutPage = () => {
  const { language } = useLanguageStore()
  const t = translations[language]

  const features = [
    {
      icon: <FiCheckCircle className="w-6 h-6" />,
      title: 'Easy Reporting',
      description: 'Fill out a quick form to report your item.',
    },
    {
      icon: <FiSearch className="w-6 h-6" />,
      title: 'Quick Search',
      description: 'Search through all reported items easily.',
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: 'Secure & Reliable',
      description: 'Your data is safe and secure with us.',
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: 'Community Driven',
      description: 'Built by students, for students.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About FindIt
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            FindIt is a campus lost and found platform designed to help students and staff
            reunite with their lost items. Together, we can build a more caring community.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Illustration Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-9xl mb-6">📦</div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Lost & Found Made Simple
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Our mission is to make it easy for everyone on campus to report and find lost items.
                Every item matters, and we're here to help reunite you with what's yours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
