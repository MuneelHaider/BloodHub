import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DonorsPage from './pages/DonorsPage'
import DonorDetailPage from './pages/DonorDetailPage'
import MessagesPage from './pages/MessagesPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import EditUserPage from './pages/EditUserPage'
import AdminEditUserPage from './pages/AdminEditUserPage'
import AdminEditDonationPage from './pages/AdminEditDonationPage'

function App() {
  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/donors" element={<DonorsPage />} />
          <Route path="/donors/:id" element={<DonorDetailPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/profile" element={<EditUserPage />} />
          <Route path="/admin/users/:id/edit" element={<AdminEditUserPage />} />
          <Route path="/admin/donations/:id/edit" element={<AdminEditDonationPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
