import { Outlet } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import { Navigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { MessagesProvider } from '../../contexts/MessagesContext'

const MainLayout = () => {
  const { isAuthenticated, loading } = useUser()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary-600 rounded-full animate-spin border-t-transparent"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <MessagesProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </MessagesProvider>
  )
}

export default MainLayout