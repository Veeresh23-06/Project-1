/**
 * Loading Skeleton Components
 * Skeleton loaders for different content types
 */

export const ItemCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  </div>
)

export const ItemDetailsSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
      <div>
        <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-xl mb-6"></div>
        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
      <div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  </div>
)

export const DashboardSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
        ))}
      </div>
    </div>
  </div>
)

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
    </div>
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="p-6 flex items-center space-x-4">
          <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
)
