import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { FiUsers, FiPackage, FiClock, FiCheckCircle } from 'react-icons/fi'

/**
 * Admin Dashboard Page
 * Manage users, items, and claims
 */
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalItems: 0,
    pendingClaims: 0,
    resolvedClaims: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Fetch users count
      const usersSnapshot = await getDocs(collection(db, 'users'))
      const totalUsers = usersSnapshot.size

      // Fetch items count
      const itemsSnapshot = await getDocs(collection(db, 'items'))
      const totalItems = itemsSnapshot.size

      // Fetch claims
      const claimsSnapshot = await getDocs(collection(db, 'claims'))
      const claims = claimsSnapshot.docs.map((doc) => doc.data())
      const pendingClaims = claims.filter((c) => c.status === 'pending').length
      const resolvedClaims = claims.filter((c) => c.status !== 'pending').length

      setStats({
        totalUsers,
        totalItems,
        pendingClaims,
        resolvedClaims,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
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
          Admin Dashboard
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Total Users
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stats.totalUsers}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Total Items
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stats.totalItems}
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
                  Pending Claims
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stats.pendingClaims}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-xl flex items-center justify-center">
                <FiClock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Resolved Claims
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stats.resolvedClaims}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                <FiCheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Manage Users
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              View and manage all registered users
            </p>
            <button className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              View Users
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Manage Items
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Review and moderate reported items
            </p>
            <button className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              View Items
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Manage Claims
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Approve or reject item claims
            </p>
            <button className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              View Claims
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
