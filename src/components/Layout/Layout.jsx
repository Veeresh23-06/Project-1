import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useAuthStore } from '@/store/authStore'
import Navbar from './Navbar'
import Footer from './Footer'

/**
 * Main Layout Component
 * Wraps all pages with Navbar and Footer
 */
const Layout = () => {
  const { setUser, setLoading } = useAuthStore()

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [setUser, setLoading])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
