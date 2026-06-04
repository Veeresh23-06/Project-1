import { useState, useEffect, useCallback } from 'react'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { Link, useSearchParams } from 'react-router-dom'
import { CATEGORIES, LOCATIONS } from '@/config/categories'
import { dummyItems } from '@/data/dummyData'
import { formatDistanceToNow } from 'date-fns'
import { FiSearch, FiMapPin, FiClock, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { ItemCardSkeleton } from '@/components/UI/LoadingSkeleton'

const PER_PAGE = 8

const BrowseItemsPage = () => {
  const [searchParams] = useSearchParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [status, setStatus] = useState(searchParams.get('status') || '')
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const q = query(collection(db, 'items'), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      const firebaseItems = snap.docs.map(d => ({ id: d.id, ...d.data(), createdAt: d.data().createdAt?.toDate ? { seconds: d.data().createdAt.toDate().getTime() / 1000 } : d.data().createdAt }))
      const merged = [...dummyItems, ...firebaseItems.filter(fi => !dummyItems.find(d => d.id === fi.id))]
      setItems(merged)
    } catch {
      setItems(dummyItems)
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchItems() }, [fetchItems])
  useEffect(() => { setPage(1) }, [search, category, location, status, sort])

  const filtered = items
    .filter(i => !search || i.itemName.toLowerCase().includes(search.toLowerCase()) || i.description?.toLowerCase().includes(search.toLowerCase()))
    .filter(i => !category || i.category === category)
    .filter(i => !location || i.location === location)
    .filter(i => !status || i.status === status)
    .sort((a, b) => sort === 'newest'
      ? (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
      : (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0))

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const hasFilters = search || category || location || status
  const clearAll = () => { setSearch(''); setCategory(''); setLocation(''); setStatus('') }

  const selectClass = "text-sm bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="section-title mb-1.5">Browse Items</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Find your lost items or help others by identifying found items.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── SIDEBAR ── */}
          <aside className="w-full lg:w-56 shrink-0">
            <div className="sticky top-24 card p-5 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Filters</h3>
                {hasFilters && (
                  <button onClick={clearAll} className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                    <FiX size={11}/> Clear all
                  </button>
                )}
              </div>

              {/* Categories */}
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2.5">Categories</p>
                <div className="space-y-0.5">
                  {[{ id: '', label: 'All Categories' }, ...CATEGORIES].map(c => (
                    <button key={c.id} onClick={() => setCategory(c.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${category === c.id
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-semibold'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                      {c.icon && <span className="mr-1.5">{c.icon}</span>}{c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2.5">Locations</p>
                <div className="space-y-0.5 max-h-48 overflow-y-auto">
                  {['', ...LOCATIONS].map(l => (
                    <button key={l} onClick={() => setLocation(l)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${location === l
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-semibold'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                      {l || 'All Locations'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2.5">Status</p>
                {[['', 'All Status'], ['lost', 'Lost'], ['found', 'Found'], ['claimed', 'Claimed']].map(([val, label]) => (
                  <button key={val} onClick={() => setStatus(val)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${status === val
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-semibold'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="relative flex-1 min-w-[200px]">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search items..."
                  className="input pl-9 h-10 text-sm" />
              </div>
              <select value={sort} onChange={e => setSort(e.target.value)} className={selectClass}>
                <option value="newest">Sort: Newest</option>
                <option value="oldest">Sort: Oldest</option>
              </select>
              <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => <ItemCardSkeleton key={i} />)}
              </div>
            ) : paged.length === 0 ? (
              <div className="card p-16 text-center">
                <p className="text-4xl mb-4">🔍</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No items found</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Try adjusting your filters or search query</p>
                <button onClick={clearAll} className="btn-primary mx-auto">Clear filters</button>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div key={`${page}-${category}-${status}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {paged.map((item, i) => (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}>
                      <Link to={`/item/${item.id}`}
                        className="card block group overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                        <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-gray-800">
                          {item.imageUrl
                            ? <img src={item.imageUrl} alt={item.itemName}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            : <div className="w-full h-full flex items-center justify-center text-5xl">📦</div>}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          <span className={`absolute top-3 left-3 ${item.status === 'lost' ? 'badge-lost' : item.status === 'found' ? 'badge-found' : 'badge-claimed'}`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2 truncate">{item.itemName}</h3>
                          <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <FiMapPin size={10} className="shrink-0"/>{item.location}
                          </p>
                          <p className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                            <FiClock size={10} className="shrink-0"/>
                            {item.createdAt?.seconds
                              ? formatDistanceToNow(new Date(item.createdAt.seconds * 1000), { addSuffix: true })
                              : 'Recently'}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <FiChevronLeft size={16}/>
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i+1} onClick={() => setPage(i+1)}
                    className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors
                      ${page === i+1 ? 'bg-green-600 text-white' : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                    {i+1}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <FiChevronRight size={16}/>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrowseItemsPage
