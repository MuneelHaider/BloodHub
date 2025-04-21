import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDonors } from '../contexts/DonorsContext'
import { useUser } from '../contexts/UserContext'
import { FaTint, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const CreateDonationPage = () => {
  const { currentUser } = useUser()
  const { createDonorPost, donors } = useDonors()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    userId: currentUser?.id,
    name: currentUser?.name || '',
    bloodType: currentUser?.bloodType || '',
    location: currentUser?.location || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    lastDonation: '',
    available: true,
    bio: '',
    donationCount: 0,
    profileImage: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  // Check if user already has a donor post
  const existingDonor = donors.find(donor => donor.userId === currentUser?.id)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      await createDonorPost(formData)
      setSuccess(true)
      setTimeout(() => {
        navigate('/donors')
      }, 2000)
    } catch (err) {
      setError('Failed to create donor post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (existingDonor) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <FaCheckCircle className="mx-auto h-12 w-12 text-primary-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">You're already registered as a donor</h2>
          <p className="text-gray-600 mb-6">
            You already have a donor profile in our system. You can view or update your donor information.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate(`/donors/${existingDonor.id}`)}
              className="btn btn-primary py-2 px-6"
            >
              View My Donor Profile
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="btn btn-outline py-2 px-6"
            >
              Update My Information
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <FaCheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Donor Profile Created!</h2>
          <p className="text-gray-600 mb-6">
            Your donor profile has been successfully created. You'll be redirected to the donors page.
          </p>
          <div className="w-12 h-12 border-4 border-primary-600 rounded-full animate-spin border-t-transparent mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Become a Blood Donor</h1>
      <p className="text-gray-600 mb-6">
        Complete the form below to register as a blood donor. Your information will be visible to users looking for donors.
      </p>
      
      {error && (
        <div className="mb-6 p-4 bg-error-50 text-error-600 rounded-md flex items-center">
          <FaTimesCircle className="mr-2 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            </div>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input w-full"
              />
            </div>
            
            <div>
              <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 mb-1">
                Blood Type
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaTint className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="bloodType"
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  required
                  className="input pl-10 w-full"
                >
                  <option value="">Select blood type</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="City, State"
                  className="input pl-10 w-full"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="lastDonation" className="block text-sm font-medium text-gray-700 mb-1">
                Last Donation Date (if applicable)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="lastDonation"
                  name="lastDonation"
                  value={formData.lastDonation}
                  onChange={handleChange}
                  className="input pl-10 w-full"
                />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Bio / Additional Information
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about your donation history, availability, or any other relevant information..."
                rows="4"
                className="input w-full"
              ></textarea>
            </div>
            
            <div className="md:col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="available"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="available" className="ml-2 block text-sm text-gray-700">
                  I am currently available for blood donation
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-outline py-2 px-4 mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary py-2 px-6 flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Profile...
                </>
              ) : 'Register as Donor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateDonationPage