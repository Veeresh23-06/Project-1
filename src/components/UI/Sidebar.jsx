/**
 * Sidebar Component for Browse Items Page
 * Shows category, location, and status filters
 */
const Sidebar = ({ 
  selectedCategory, 
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  selectedStatus,
  setSelectedStatus,
  onClearAll 
}) => {
  const categories = [
    'All Categories',
    'Wallet',
    'ID Card',
    'Keys',
    'Electronics',
    'Bags',
    'Books',
    'Clothing',
    'Others'
  ]

  const locations = [
    'All Locations',
    'Library',
    'Canteen',
    'Main Gate',
    'Sports Complex',
    'Parking Area',
    'Classroom Block A',
    'Others'
  ]

  const statuses = [
    'All Status',
    'Lost',
    'Found',
    'Claimed'
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filters
        </h3>
        <button
          onClick={onClearAll}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Clear all
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Categories
        </h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === 'All Categories' ? '' : cat.toLowerCase())}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                (cat === 'All Categories' && !selectedCategory) ||
                selectedCategory === cat.toLowerCase()
                  ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Locations
        </h4>
        <div className="space-y-2">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setSelectedLocation(loc === 'All Locations' ? '' : loc)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                (loc === 'All Locations' && !selectedLocation) ||
                selectedLocation === loc
                  ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Status
        </h4>
        <div className="space-y-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status === 'All Status' ? '' : status.toLowerCase())}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                (status === 'All Status' && !selectedStatus) ||
                selectedStatus === status.toLowerCase()
                  ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
