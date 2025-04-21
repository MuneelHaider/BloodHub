import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDonors } from '../contexts/DonorsContext'
import { useUser } from '../contexts/UserContext'
import { FaTint, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendarAlt, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa'
import { format, parseISO, isAfter, subMonths } from 'date-fns'

const DonorDetailPage = () => {
  const { id } = useParams()
  const { getDonorById, loading } = useDonors()
  const { currentUser } = useUser()
  const [donor, setDonor] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading) {
      const donorData = getDonorById(id)
      if (donorData) {
        setDonor(donorData)
      } else {
        setNotFound(true)
      }
    }
  }, [id, loading, getDonorById])

  // Check if the donor has donated in the last 3 months
  const isRecentDonor = donor?.lastDonation 
    ? isAfter(parseISO(donor.lastDonation), subMonths(new Date(), 3))
    : false

  const handleMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message
      alert(`Message sent to ${donor.name}: ${message}`)
      // Navigate to messages page with this donor conversation open
      navigate('/messages')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center my-12">
        <div className="w-12 h-12 border-4 border-primary-600 rounded-full animate-spin border-t-transparent"></div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="text-center py-12">
        <FaExclamationTriangle className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">Donor not found</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          We couldn't find the donor you're looking for. They may have removed their profile or the link is incorrect.
        </p>
        <Link to="/donors" className="btn btn-primary">
          Back to Donors
        </Link>
      </div>
    )
  }

  if (!donor) return null

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/donors" className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors mb-6">
        <FaArrowLeft className="mr-2" />
        Back to donors list
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                {donor.profileImage ? (
                  <img 
                    src={donor.profileImage} 
                    alt={donor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-primary-100 flex items-center justify-center text-primary-700 text-3xl font-bold">
                    {donor.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{donor.name}</h1>
              
              <div className="flex flex-wrap gap-3 mb-3">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700">
                  <FaTint className="mr-1" />
                  {donor.bloodType}
                </div>
                
                {isRecentDonor ? (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    Recently donated
                  </div>
                ) : donor.available ? (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Available
                  </div>
                ) : (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    Not available
                  </div>
                )}
                
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                  {donor.donationCount} {donor.donationCount === 1 ? 'donation' : 'donations'}
                </div>
              </div>
              
              {!donor.available && (
                <div className="mb-4 p-3 bg-yellow-50 text-yellow-800 rounded-md flex items-start">
                  <FaExclamationTriangle className="flex-shrink-0 mt-0.5 mr-2" />
                  <p className="text-sm">
                    This donor is currently unavailable for donation. They might have recently donated or have other temporary restrictions.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium mb-3">Contact Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <FaMapMarkerAlt className="w-5 h-5 text-gray-500 mr-2" />
                    <span>{donor.location}</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FaPhone className="w-5 h-5 text-gray-500 mr-2" />
                    <span>{donor.phone}</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FaEnvelope className="w-5 h-5 text-gray-500 mr-2" />
                    <span>{donor.email}</span>
                  </li>
                  {donor.lastDonation && (
                    <li className="flex items-center text-gray-700">
                      <FaCalendarAlt className="w-5 h-5 text-gray-500 mr-2" />
                      <span>Last Donation: {format(parseISO(donor.lastDonation), 'MMMM d, yyyy')}</span>
                    </li>
                  )}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">About</h3>
                <p className="text-gray-700">
                  {donor.bio || 'No additional information provided by this donor.'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Don't show messaging UI if viewing own profile */}
          {currentUser?.id !== donor.userId && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-3">Send a Message</h3>
              <div className="mb-4">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input h-24 w-full"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={handleMessage}
                  disabled={!message.trim()}
                  className="btn btn-primary py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Message
                </button>
                <Link to="/messages" className="btn btn-outline py-2 px-4">
                  Go to Messages
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DonorDetailPage