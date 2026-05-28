import { useState, useEffect } from 'react'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { Link } from 'react-router-dom'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/i18n/translations'
import { CATEGORIES, LOCATIONS } from '@/config/categories'
import { FiSearch, FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import Sidebar from '@/components/UI/Sidebar'

/**
 * Browse Items Page
 * Display all lost and found items with filters
 */
const BrowseItemsPage = () => {
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const { language } = useLanguageStore()
  const t = translations[language]

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

  const handleClearFilters = () => {
    setSelectedCategory('')
    setSelectedLocation('')
    setSelectedStatus('')
    setSearchQuery('')
  }

  useEffect(() => {
    fetchItems()
  }, [])

  useEffect(() => {
    filterItems()
  }, [searchQuery, selectedCategory, selectedLocation, selectedStatus, items])

  const fetchItems = async () => {
    try {
      const q = query(collection(db, 'items'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const itemsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setItems(itemsData)
      setFilteredItems(itemsData)
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterItems = () => {
    let filtered = items

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    if (selectedLocation) {
      filtered = filtered.filter((item) => item.location === selectedLocation)
    }

    if (selectedStatus) {
      filtered = filtered.filter((item) => item.status === selectedStatus)
    }

    setFilteredItems(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Browse Items
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find your lost items or help others by identifying found items.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <Sidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              onClearAll={handleClearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative md:col-span-2">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* Quick Filters */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Locations</option>
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((item) => (
                <Link
                  key={item.id}
                  to={`/item/${item.id}`}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.itemName}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-6xl">📦</span>
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.itemName}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                          item.status === 'lost'
                            ? 'bg-red-100 text-red-600'
                            : item.status === 'found'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                      {item.location}
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs">
                      {item.createdAt && new Date(item.createdAt.seconds * 1000).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronLeft />
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === index + 1
                        ? 'bg-primary-600 text-white'
                        : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronRight />
                </button>
              </div>
            )}

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No items found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrowseItemsPage
