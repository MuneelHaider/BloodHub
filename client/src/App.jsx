import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import { DonorsProvider } from './contexts/DonorsContext'

// Layout components
import MainLayout from './components/layout/MainLayout'
import PublicLayout from './components/layout/PublicLayout'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import DonorsPage from './pages/DonorsPage'
import DonorDetailPage from './pages/DonorDetailPage'
import CreateDonationPage from './pages/CreateDonationPage'
import MessagesPage from './pages/MessagesPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <UserProvider>
      <DonorsProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/donors" element={<DonorsPage />} />
            <Route path="/donors/:id" element={<DonorDetailPage />} />
          </Route>
          
          <Route path="/" element={<MainLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="donate" element={<CreateDonationPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </DonorsProvider>
    </UserProvider>
  )
}

export default App