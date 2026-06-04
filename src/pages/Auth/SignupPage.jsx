import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/config/firebase'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/i18n/translations'
import toast from 'react-hot-toast'
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { motion } from 'framer-motion'

const SignupPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [show, setShow] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const { language } = useLanguageStore()
  const t = translations[language].auth.signup
  const navigate = useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const saveUser = async (uid, extra) => {
    await setDoc(doc(db, 'users', uid), { uid, role: 'user', createdAt: new Date(), ...extra })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) return toast.error('Passwords do not match')
    if (!agreed) return toast.error('Please agree to terms')
    setLoading(true)
    try {
      const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password)
      await updateProfile(user, { displayName: form.name })
      await saveUser(user.uid, { name: form.name, email: form.email, phone: form.phone })
      toast.success('Account created!')
      navigate('/dashboard')
    } catch (err) {
      const msg = err.code === 'auth/email-already-in-use' ? 'Email already in use' : err.message
      toast.error(msg)
    } finally { setLoading(false) }
  }

  const handleGoogle = async () => {
    setLoading(true)
    try {
      const { user } = await signInWithPopup(auth, new GoogleAuthProvider())
      await saveUser(user.uid, { name: user.displayName, email: user.email, phone: '' })
      toast.success('Account created!')
      navigate('/dashboard')
    } catch (err) { toast.error(err.message) }
    finally { setLoading(false) }
  }

  const fields = [
    { name: 'name', label: t.name, type: 'text', placeholder: 'Your full name', icon: <FiUser size={15}/> },
    { name: 'email', label: t.email, type: 'email', placeholder: 'you@campus.edu', icon: <FiMail size={15}/> },
    { name: 'phone', label: t.phone, type: 'tel', placeholder: '+91 9876543210', icon: <FiPhone size={15}/> },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] hero-gradient flex items-center justify-center px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="w-full max-w-sm">
        <div className="card p-8 shadow-stripe-lg">
          <div className="flex justify-center mb-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold">F</span></div>
              <span className="font-bold text-gray-900 dark:text-white">FindIt</span>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-1">{t.title}</h1>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-7">{t.subtitle}</p>

          <button onClick={handleGoogle} disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 border border-gray-200 dark:border-gray-700 rounded-lg py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mb-4 disabled:opacity-50">
            <FcGoogle size={18}/> Continue with Google
          </button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700"/></div>
            <div className="relative flex justify-center"><span className="bg-white dark:bg-[#111] px-3 text-xs text-gray-400">or</span></div>
          </div>

          <form onSubmit={handleSignup} className="space-y-3.5">
            {fields.map(f => (
              <div key={f.name}>
                <label className="label">{f.label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{f.icon}</span>
                  <input name={f.name} type={f.type} value={form[f.name]} onChange={handleChange}
                    placeholder={f.placeholder} required className="input pl-9" />
                </div>
              </div>
            ))}

            <div>
              <label className="label">{t.password}</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input name="password" type={show ? 'text' : 'password'} value={form.password} onChange={handleChange}
                  placeholder="••••••••" required minLength={6} className="input pl-9 pr-10" />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {show ? <FiEyeOff size={16}/> : <FiEye size={16}/>}
                </button>
              </div>
            </div>

            <div>
              <label className="label">{t.confirmPassword}</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input name="confirmPassword" type={show ? 'text' : 'password'} value={form.confirmPassword} onChange={handleChange}
                  placeholder="••••••••" required className="input pl-9" />
              </div>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400">{t.terms}</span>
            </label>

            <button type="submit" disabled={loading}
              className="btn-primary w-full py-2.5 disabled:opacity-50">
              {loading ? 'Creating account...' : <>{t.button} <FiArrowRight size={14}/></>}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500 dark:text-gray-400">
            {t.hasAccount}{' '}
            <Link to="/login" className="text-green-600 font-semibold hover:text-green-700">{t.loginLink}</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default SignupPage
