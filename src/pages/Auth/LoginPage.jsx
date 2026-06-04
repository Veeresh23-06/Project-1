import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/i18n/translations'
import toast from 'react-hot-toast'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { motion } from 'framer-motion'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const { language } = useLanguageStore()
  const t = translations[language].auth.login
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err) {
      const msg = err.code === 'auth/invalid-credential' ? 'Invalid email or password' : err.message
      toast.error(msg)
    } finally { setLoading(false) }
  }

  const handleGoogle = async () => {
    setLoading(true)
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
      toast.success('Welcome!')
      navigate('/dashboard')
    } catch (err) { toast.error(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] hero-gradient flex items-center justify-center px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="w-full max-w-sm">
        <div className="card p-8 shadow-stripe-lg">
          {/* Header */}
          <div className="flex justify-center mb-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold">F</span></div>
              <span className="font-bold text-gray-900 dark:text-white">FindIt</span>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-1">{t.title}</h1>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-7">{t.subtitle}</p>

          {/* Google */}
          <button onClick={handleGoogle} disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 border border-gray-200 dark:border-gray-700 rounded-lg py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mb-4 disabled:opacity-50">
            <FcGoogle size={18}/> {t.google}
          </button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700"/></div>
            <div className="relative flex justify-center"><span className="bg-white dark:bg-[#111] px-3 text-xs text-gray-400">or</span></div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label">{t.email}</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@campus.edu" required
                  className="input pl-9" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label mb-0">{t.password}</label>
                <Link to="/forgot-password" className="text-xs text-green-600 hover:text-green-700">{t.forgot}</Link>
              </div>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type={show ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required className="input pl-9 pr-10" />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {show ? <FiEyeOff size={16}/> : <FiEye size={16}/>}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="btn-primary w-full py-2.5 disabled:opacity-50">
              {loading ? 'Logging in...' : <>{t.button} <FiArrowRight size={14}/></>}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500 dark:text-gray-400">
            {t.noAccount}{' '}
            <Link to="/signup" className="text-green-600 font-semibold hover:text-green-700">{t.signupLink}</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage
