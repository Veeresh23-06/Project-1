import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/i18n/translations'
import { dummyItems, dummyTestimonials } from '@/data/dummyData'
import { CATEGORIES, LOCATIONS } from '@/config/categories'
import { FiSearch, FiFileText, FiCheckCircle, FiBell, FiHeart, FiStar, FiMapPin, FiClock } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const { language } = useLanguageStore()
  const t = translations[language]
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedLocation) params.set('location', selectedLocation)
    if (selectedStatus) params.set('status', selectedStatus)
    navigate(`/browse?${params.toString()}`)
  }

  const steps = [
    { icon: <FiFileText className="w-8 h-8" />, title: t.home.howItWorks.step1.title, desc: t.home.howItWorks.step1.description },
    { icon: <FiSearch className="w-8 h-8" />, title: t.home.howItWorks.step2.title, desc: t.home.howItWorks.step2.description },
    { icon: <FiBell className="w-8 h-8" />, title: t.home.howItWorks.step3.title, desc: t.home.howItWorks.step3.description },
    { icon: <FiHeart className="w-8 h-8" />, title: t.home.howItWorks.step4.title, desc: t.home.howItWorks.step4.description },
  ]

  const recentItems = dummyItems.slice(0, 4)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">

      {/* ── HERO ── */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
                {t.home.hero.title}<br />
                <span className="text-green-600">{t.home.hero.subtitle}</span>
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-md">
                {t.home.hero.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/report-lost"
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-sm">
                  {t.home.hero.reportLost}
                </Link>
                <Link to="/report-found"
                  className="px-6 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 dark:hover:bg-gray-800 transition-colors">
                  {t.home.hero.reportFound}
                </Link>
              </div>
            </motion.div>

            {/* Right – illustration */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.15 }}
              className="flex items-center justify-center">
              <div className="relative w-80 h-80 bg-green-50 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-2">📦</div>
                  <p className="text-xl font-bold text-green-700 dark:text-green-400">LOST &amp; FOUND</p>
                </div>
                {/* floating badges */}
                <div className="absolute top-6 right-4 bg-white dark:bg-gray-700 rounded-xl shadow-lg px-3 py-2 text-sm font-semibold text-green-600">📱 Electronics</div>
                <div className="absolute bottom-10 left-2 bg-white dark:bg-gray-700 rounded-xl shadow-lg px-3 py-2 text-sm font-semibold text-blue-600">🔑 Keys</div>
                <div className="absolute top-20 left-0 bg-white dark:bg-gray-700 rounded-xl shadow-lg px-3 py-2 text-sm font-semibold text-purple-600">👜 Bags</div>
              </div>
            </motion.div>
          </div>

          {/* ── SEARCH BAR ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t.home.search.placeholder}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
              <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white text-sm">
                <option value="">{t.home.search.allCategories}</option>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
              <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)}
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white text-sm">
                <option value="">{t.home.search.allLocations}</option>
                {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white text-sm">
                <option value="">{t.home.search.allStatus}</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
              <button type="submit"
                className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap">
                {t.home.search.button}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.home.howItWorks.title}</h2>
            <p className="text-gray-500 dark:text-gray-400">{t.home.howItWorks.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT ITEMS ── */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t.home.recentItems.title}</h2>
            </div>
            <Link to="/browse" className="text-green-600 hover:text-green-700 font-semibold text-sm">
              {t.home.recentItems.viewAll} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentItems.map((item, i) => (
              <motion.div key={item.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}>
                <Link to={`/item/${item.id}`}
                  className="block bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden group">
                  <div className="relative h-44 overflow-hidden">
                    <img src={item.imageUrl} alt={item.itemName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold uppercase ${item.status === 'lost' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.itemName}</h3>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mb-1">
                      <FiMapPin className="w-3 h-3 mr-1" />{item.location}
                    </div>
                    <div className="flex items-center text-gray-400 text-xs">
                      <FiClock className="w-3 h-3 mr-1" />
                      {formatDistanceToNow(new Date(item.createdAt.seconds * 1000), { addSuffix: true })}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.home.testimonials.title}</h2>
            <p className="text-gray-500 dark:text-gray-400">{t.home.testimonials.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dummyTestimonials.map((testimonial, i) => (
              <motion.div key={testimonial.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                <div className="flex items-center mb-1">
                  {[...Array(testimonial.rating)].map((_, j) => <FiStar key={j} className="w-4 h-4 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">{testimonial.avatar}</div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{testimonial.name}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default HomePage
