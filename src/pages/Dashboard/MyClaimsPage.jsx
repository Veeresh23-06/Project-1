import { useState, useEffect } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { useAuthStore } from '@/store/authStore'
import { Link } from 'react-router-dom'

/**
 * My Claims Page Component
 */
const MyClaimsPage = () => {
  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const { user } = useAuthStore()

  useEffect(() => {
    if (user) {
      fetchClaims()
    }
  }, [user])

  const fetchClaims = async () => {
    try {
      const q = query(
        collection(db, 'claims'),
        where('claimantId', '==', user.uid)
      )
      const querySnapshot = await getDocs(q)
      const claimsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setClaims(claimsData)
    } catch (error) {
      console.error('Error fetching claims:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredClaims = claims.filter((claim) => {
    if (activeTab === 'all') return true
    return claim.status === activeTab
  })

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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Claims
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your claims and responses.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {['all', 'pending', 'approved', 'rejected'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-semibold capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Claims Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Item
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredClaims.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-600 dark:text-gray-400">
                    No claims found
                  </td>
                </tr>
              ) : (
                filteredClaims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                      {claim.itemName || 'Item'}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {claim.type || 'Lost'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          claim.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-600'
                            : claim.status === 'approved'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        {claim.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {claim.createdAt && new Date(claim.createdAt.seconds * 1000).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/item/${claim.itemId}`}
                        className="text-primary-600 hover:text-primary-700 font-semibold"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MyClaimsPage
