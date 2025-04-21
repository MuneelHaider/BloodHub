import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import { useDonors } from '../contexts/DonorsContext'
import { FaTint, FaSearch, FaUserPlus, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const DashboardPage = () => {
  const { currentUser } = useUser()
  const { donors, loading } = useDonors()
  const [recentDonors, setRecentDonors] = useState([])
  const [userStats, setUserStats] = useState({
    totalDonors: 0,
    availableDonors: 0
  })
  
  useEffect(() => {
    if (!loading) {
      // Get most recent donors
      const sortedDonors = [...donors].sort((a, b) => {
        // Sort by newest first if we had actual timestamps
        // For this demo, we'll just take the last 3
        return b.id - a.id
      })
      
      setRecentDonors(sortedDonors.slice(0, 3))
      
      // Calculate stats
      setUserStats({
        totalDonors: donors.length,
        availableDonors: donors.filter(donor => donor.available).length
      })
    }
  }, [loading, donors])

  const donorsByBloodType = () => {
    const bloodTypes = {}
    
    donors.forEach(donor => {
      if (bloodTypes[donor.bloodType]) {
        bloodTypes[donor.bloodType]++
      } else {
        bloodTypes[donor.bloodType] = 1
      }
    })
    
    return Object.entries(bloodTypes).sort((a, b) => b[1] - a[1])
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Hello, {currentUser?.name}</h1>
          <p className="text-gray-600">
            Welcome to your BloodHub dashboard. Find donors or become one today.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <Link to="/donors" className="btn btn-primary py-2 px-4">
            <FaSearch className="mr-2" />
            Find Donors
          </Link>
          <Link to="/donate" className="btn btn-outline py-2 px-4">
            <FaTint className="mr-2" />
            Become a Donor
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
              <FaTint className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Total Donors</h2>
              <p className="mt-1 text-3xl font-bold text-primary-600">{userStats.totalDonors}</p>
              <p className="mt-1 text-sm text-gray-500">
                Registered blood donors on our platform
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
              <FaUserPlus className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Available Donors</h2>
              <p className="mt-1 text-3xl font-bold text-green-600">{userStats.availableDonors}</p>
              <p className="mt-1 text-sm text-gray-500">
                Donors currently available for donation
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
              <FaMapMarkerAlt className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Your Location</h2>
              <p className="mt-1 text-xl font-bold text-gray-900">{currentUser?.location || 'Not set'}</p>
              <p className="mt-1 text-sm text-gray-500">
                Update your location in profile settings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Donors */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Donors</h2>
          <p className="mt-1 text-sm text-gray-500">
            The most recently registered blood donors
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-primary-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
        ) : recentDonors.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">No donors available yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {recentDonors.map(donor => (
              <div key={donor.id} className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      {donor.profileImage ? (
                        <img 
                          src={donor.profileImage} 
                          alt={donor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary-100 flex items-center justify-center text-primary-700 text-lg font-semibold">
                          {donor.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{donor.name}</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {donor.bloodType}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {donor.location}
                      </span>
                      {donor.available ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Not available
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Link 
                      to={`/donors/${donor.id}`}
                      className="btn btn-primary py-2 px-4"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="bg-gray-50 px-6 py-3 flex justify-center">
          <Link 
            to="/donors"
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            View all donors
          </Link>
        </div>
      </div>

      {/* Blood Type Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Donors by Blood Type</h2>
            <p className="mt-1 text-sm text-gray-500">
              Number of donors available by blood type
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-primary-600 rounded-full animate-spin border-t-transparent"></div>
            </div>
          ) : (
            <div className="p-6">
              <div className="space-y-4">
                {donorsByBloodType().map(([type, count]) => (
                  <div key={type} className="flex items-center">
                    <div className="w-12 h-12 flex-shrink-0 bg-primary-600 text-white rounded-lg flex items-center justify-center font-bold text-lg mr-4">
                      {type}
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                          className="bg-primary-600 h-4 rounded-full"
                          style={{ width: `${(count / userStats.totalDonors) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-4 text-lg font-semibold text-gray-900 w-12 text-right">
                      {count}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
            <p className="mt-1 text-sm text-gray-500">
              Get started with these common tasks
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <Link to="/donors" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 flex-shrink-0 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <FaSearch className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Find Donors</h3>
                    <p className="text-sm text-gray-500">Search for blood donors by location and blood type</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/donate" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 flex-shrink-0 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mr-4">
                    <FaTint className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Become a Donor</h3>
                    <p className="text-sm text-gray-500">Register as a blood donor and help save lives</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/messages" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 flex-shrink-0 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mr-4">
                    <FaEnvelope className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Messages</h3>
                    <p className="text-sm text-gray-500">Communicate with donors and recipients</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage