import { Outlet, Navigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import AdminNavbar from './AdminNavbar'
import Footer from './Footer'

const AdminLayout = () => {
  const { currentUser, loading } = useUser()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary-600 rounded-full animate-spin border-t-transparent"></div>
      </div>
    )
  }

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />
      <main className="flex-grow container py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AdminLayout