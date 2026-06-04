import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/i18n/translations'
import { dummyItems, dummyTestimonials } from '@/data/dummyData'
import { CATEGORIES, LOCATIONS } from '@/config/categories'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import {
  FiSearch, FiFileText, FiBell, FiHeart, FiArrowRight,
  FiMapPin, FiClock, FiStar, FiCheckCircle,
} from 'react-icons/fi'

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }) }

const HomePage = () => {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')
  const [loc, setLoc] = useState('')
  const [status, setStatus] = useState('')
  const { language } = useLanguageStore()
  const t = translations[language]
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    const p = new URLSearchParams()
    if (q) p.set('q', q); if (cat) p.set('category', cat)
    if (loc) p.set('location', loc); if (status) p.set('status', status)
    navigate(`/browse?${p.toString()}`)
  }

  const steps = [
    { icon: <FiFileText className="w-6 h-6" />, ...{ title: t.home.howItWorks.step1.title, desc: t.home.howItWorks.step1.description } },
    { icon: <FiSearch className="w-6 h-6" />, ...{ title: t.home.howItWorks.step2.title, desc: t.home.howItWorks.step2.description } },
    { icon: <FiBell className="w-6 h-6" />, ...{ title: t.home.howItWorks.step3.title, desc: t.home.howItWorks.step3.description } },
    { icon: <FiHeart className="w-6 h-6" />, ...{ title: t.home.howItWorks.step4.title, desc: t.home.howItWorks.step4.description } },
  ]

  const stats = [
    { label: 'Items Reported', value: '500+' },
    { label: 'Items Recovered', value: '380+' },
    { label: 'Active Users', value: '1,200+' },
    { label: 'Success Rate', value: '76%' },
  ]

  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white dark:bg-[#0a0a0a] hero-gradient grid-bg py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left copy */}
            <div>
              <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}
                className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400
                           text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800 mb-6">
                <FiCheckCircle size={12} /> Campus Lost & Found System
              </motion.div>

              <motion.h1 initial="hidden" animate="show" variants={fadeUp} custom={1}
                className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-6">
                {t.home.hero.title}<br />
                <span className="gradient-text">{t.home.hero.subtitle}</span>
              </motion.h1>

              <motion.p initial="hidden" animate="show" variants={fadeUp} custom={2}
                className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-lg">
                {t.home.hero.description}
              </motion.p>

              <motion.div initial="hidden" animate="show" variants={fadeUp} custom={3}
                className="flex flex-wrap gap-3">
                <Link to="/report-lost" className="btn-primary">
                  {t.home.hero.reportLost} <FiArrowRight size={14} />
                </Link>
                <Link to="/report-found" className="btn-secondary">
                  {t.home.hero.reportFound}
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div initial="hidden" animate="show" variants={fadeUp} custom={4}
                className="grid grid-cols-4 gap-4 mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                {stats.map(s => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right visual */}
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex items-center justify-center">
              <div className="relative w-full max-w-sm mx-auto">
                {/* Main card */}
                <div className="card p-6 shadow-stripe-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center text-2xl">👜</div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">Blue Backpack</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><FiMapPin size={10}/> Library, Block A</p>
                    </div>
                    <span className="badge-lost ml-auto">Lost</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Match in progress...</p>
                </div>

                {/* Floating badges */}
                <motion.div animate={{ y: [0,-6,0] }} transition={{ repeat: Infinity, duration: 2.5, ease:'easeInOut' }}
                  className="absolute -top-4 -right-4 card px-3 py-2 shadow-stripe text-xs font-semibold text-green-600 dark:text-green-400 flex items-center gap-1.5">
                  <FiCheckCircle size={12}/> Match Found!
                </motion.div>
                <motion.div animate={{ y: [0,6,0] }} transition={{ repeat: Infinity, duration: 3, ease:'easeInOut', delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 card px-3 py-2 shadow-stripe text-xs font-semibold text-blue-600 dark:text-blue-400">
                  📧 Email Sent
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* ── SEARCH BAR ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="mt-12">
            <form onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-3 shadow-stripe-lg">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  value={q} onChange={e => setQ(e.target.value)}
                  placeholder={t.home.search.placeholder}
                  className="input pl-9 border-0 focus:ring-0 bg-transparent h-10 text-sm"
                />
              </div>
              <select value={cat} onChange={e => setCat(e.target.value)}
                className="h-10 px-3 text-sm bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[140px]">
                <option value="">{t.home.search.allCategories}</option>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
              </select>
              <select value={loc} onChange={e => setLoc(e.target.value)}
                className="h-10 px-3 text-sm bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[140px]">
                <option value="">{t.home.search.allLocations}</option>
                {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <select value={status} onChange={e => setStatus(e.target.value)}
                className="h-10 px-3 text-sm bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[120px]">
                <option value="">{t.home.search.allStatus}</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
              <button type="submit" className="btn-primary px-6 h-10 whitespace-nowrap">
                {t.home.search.button}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <motion.h2 initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}
              className="section-title mb-3">{t.home.howItWorks.title}</motion.h2>
            <motion.p initial="hidden" whileInView="show" variants={fadeUp} custom={1} viewport={{ once: true }}
              className="text-gray-500 dark:text-gray-400">{t.home.howItWorks.subtitle}</motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" variants={fadeUp} custom={i}
                viewport={{ once: true }}
                className="card p-6 group hover:-translate-y-1 transition-transform duration-300">
                <div className="w-11 h-11 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400 mb-4 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-green-600 dark:text-green-500 mb-1.5">Step {i + 1}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">{step.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT ITEMS ── */}
      <section className="py-20 px-4 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <motion.h2 initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}
                className="section-title">{t.home.recentItems.title}</motion.h2>
            </div>
            <Link to="/browse" className="text-sm font-semibold text-green-600 hover:text-green-700 flex items-center gap-1">
              {t.home.recentItems.viewAll} <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {dummyItems.slice(0, 4).map((item, i) => (
              <motion.div key={item.id} initial="hidden" whileInView="show" variants={fadeUp} custom={i} viewport={{ once: true }}>
                <Link to={`/item/${item.id}`} className="card block group overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                  <div className="relative h-44 overflow-hidden">
                    <img src={item.imageUrl} alt={item.itemName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className={`absolute top-3 left-3 ${item.status === 'lost' ? 'badge-lost' : 'badge-found'}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1.5">{item.itemName}</h3>
                    <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <FiMapPin size={10} />{item.location}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                      <FiClock size={10} />
                      {formatDistanceToNow(new Date(item.createdAt.seconds * 1000), { addSuffix: true })}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <motion.h2 initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}
              className="section-title mb-3">{t.home.testimonials.title}</motion.h2>
            <motion.p initial="hidden" whileInView="show" variants={fadeUp} custom={1} viewport={{ once: true }}
              className="text-gray-500 dark:text-gray-400">{t.home.testimonials.subtitle}</motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dummyTestimonials.map((item, i) => (
              <motion.div key={item.id} initial="hidden" whileInView="show" variants={fadeUp} custom={i} viewport={{ once: true }}
                className="card p-6">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(item.rating)].map((_, j) => (
                    <FiStar key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">"{item.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {item.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-4 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 to-emerald-700 p-10 text-center shadow-stripe-lg">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative">
              Ready to Recover Your Lost Items?
            </h2>
            <p className="text-green-100 mb-8 relative">
              Join thousands of students who have already used FindIt on campus.
            </p>
            <div className="flex flex-wrap justify-center gap-3 relative">
              <Link to="/browse" className="px-6 py-3 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors shadow-sm">
                Browse Items
              </Link>
              <Link to="/signup" className="px-6 py-3 bg-green-800/50 text-white font-bold rounded-xl hover:bg-green-800/70 transition-colors border border-green-500">
                Sign Up Free
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default HomePage
