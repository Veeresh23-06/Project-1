import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/i18n/translations'
import toast from 'react-hot-toast'
import { FiMail, FiArrowLeft } from 'react-icons/fi'

/**
 * Forgot Password Page Component
 */
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  
  const { language } = useLanguageStore()
  const t = translations[language].auth.forgotPassword

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await sendPasswordResetEmail(auth, email)
      toast.success('Password reset email sent!')
      setSent(true)
    } catch (error) {
      toast.error(error.message || 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
          </div>

          {!sent ? (
            <form onSubmit={handleResetPassword} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.email}
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold disabled:opacity-50"
              >
                {loading ? 'Sending...' : t.button}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail className="w-8 h-8 text-primary-600" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Check your email for password reset instructions
              </p>
            </div>
          )}

          {/* Back to Login */}
          <Link
            to="/login"
            className="mt-6 flex items-center justify-center space-x-2 text-primary-600 hover:text-primary-700"
          >
            <FiArrowLeft />
            <span>{t.backToLogin}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
