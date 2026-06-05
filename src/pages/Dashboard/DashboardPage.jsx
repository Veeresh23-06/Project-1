import { useState, useEffect } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { useAuthStore } from '@/store/authStore'
import { FiPackage, FiCheckCircle, FiClock } from 'react-icons/fi'

/**
 * User Dashboard Page
 * Shows user's reported items and claims
 */
const DashboardPage = () => {
  const [items, setItems] = useState([])
  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuthStore()

  useEffect(() => {
    if (user) {
      fetchUserData()
    }
  }, [user])

  const fetchUserData = async () => {
    try {
      // Fetch user's items
      const itemsQuery = query(
        collection(db, 'items'),
        where('userId', '==', user.uid)
      )
      const itemsSnapshot = await getDocs(itemsQuery)
      const itemsData = itemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setItems(itemsData)

      // Fetch user's claims
      const claimsQuery = query(
        collection(db, 'claims'),
        where('claimantId', '==', user.uid)
      )
      const claimsSnapshot = await getDocs(claimsQuery)
      const claimsData = claimsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setClaims(claimsData)
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
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
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          My Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Items Reported
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {items.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center">
                <FiPackage className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Claims Made
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {claims.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                <FiClock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Items Recovered
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {items.filter((i) => i.status === 'claimed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                <FiCheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* My Items */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            My Items
          </h2>
          {items.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              No items reported yet
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center space-x-4">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.itemName}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {item.itemName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.location}{item.date ? ` • ${new Date(item.date?.seconds ? item.date.seconds * 1000 : item.date).toLocaleDateString()}` : ''}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
