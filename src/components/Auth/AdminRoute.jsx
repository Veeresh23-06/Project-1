import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'

/**
 * Admin Route Component
 * Redirects to home if user is not an admin
 */
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuthStore()
  const [isAdmin, setIsAdmin] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          setIsAdmin(userDoc.data().role === 'admin')
        }
      }
      setChecking(false)
    }

    checkAdmin()
  }, [user])

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute
