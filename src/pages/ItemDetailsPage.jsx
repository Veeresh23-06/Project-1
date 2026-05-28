import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { QRCodeSVG } from 'qrcode.react'
import { FiMapPin, FiCalendar, FiTag, FiPhone, FiMail } from 'react-icons/fi'

/**
 * Item Details Page
 * Shows full details of a lost/found item
 */
const ItemDetailsPage = () => {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchItem()
  }, [id])

  const fetchItem = async () => {
    try {
      const docRef = doc(db, 'items', id)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        setItem({ id: docSnap.id, ...docSnap.data() })
      }
    } catch (error) {
      console.error('Error fetching item:', error)
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

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Item not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div>
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.itemName}
                  className="w-full h-96 object-cover rounded-xl"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                  <span className="text-gray-400 text-6xl">📦</span>
                </div>
              )}
              
              {/* QR Code */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  QR Code for Claiming
                </p>
                <div className="flex justify-center">
                  <QRCodeSVG value={`${window.location.origin}/item/${item.id}`} size={150} />
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {item.itemName}
                </h1>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    item.status === 'lost'
                      ? 'bg-red-100 text-red-600'
                      : item.status === 'found'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {item.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                  <FiTag className="w-5 h-5" />
                  <span>{item.category}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                  <FiMapPin className="w-5 h-5" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                  <FiCalendar className="w-5 h-5" />
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <FiPhone className="w-5 h-5" />
                    <a href={`tel:${item.phone}`} className="hover:text-primary-600">
                      {item.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <FiMail className="w-5 h-5" />
                    <a href={`mailto:${item.email}`} className="hover:text-primary-600">
                      {item.email}
                    </a>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                I Lost This Item
              </button>
            </div>
          </div>
        </div>

        {/* Similar Items Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Similar Items
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Placeholder for similar items - would be populated from database */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-4xl">📦</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Similar Item {i}
                    </h4>
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">
                      FOUND
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Location
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetailsPage
