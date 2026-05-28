import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi'

/**
 * Contact Page Component
 */
const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get in touch with us for any queries or support
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center text-primary-600">
                  <FiMail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    Email
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    support@findit.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center text-primary-600">
                  <FiPhone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    Phone
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center text-primary-600">
                  <FiMapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    Location
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    University Campus, Block A
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center text-primary-600">
                  <FiClock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    Office Hours
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Mon - Fri, 9:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Illustration */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
              <div className="text-8xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Lost & Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Find it. Report it. Reclaim it. Because every item matters.
              </p>
            </div>
          </div>

          {/* Contact Form Placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send us a message
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              For inquiries, please email us at support@findit.com or call us during office hours.
            </p>
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-500">
                Contact form coming soon...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
