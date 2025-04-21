import { useState } from 'react'
import { FaSearch, FaTint, FaMapMarkerAlt, FaFilter, FaTimes } from 'react-icons/fa'

const DonorFilter = ({ onSearch }) => {
  const [location, setLocation] = useState('')
  const [bloodType, setBloodType] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch({ location, bloodType })
  }

  const handleClear = () => {
    setLocation('')
    setBloodType('')
    onSearch({ location: '', bloodType: '' })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <form onSubmit={handleSearch}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full btn btn-secondary py-2 px-4 flex justify-center items-center"
            >
              {isFilterOpen ? <FaTimes className="mr-2" /> : <FaFilter className="mr-2" />}
              {isFilterOpen ? 'Close Filters' : 'Filters'}
            </button>
          </div>
          
          <div className={`md:flex md:flex-1 md:space-x-4 ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="flex-1 mt-4 md:mt-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaTint className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  className="input pl-10 w-full"
                >
                  <option value="">All Blood Types</option>
                  {bloodTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className={`flex space-x-2 mt-4 md:mt-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <button
              type="submit"
              className="flex-1 md:flex-none btn btn-primary py-2 px-4"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="flex-1 md:flex-none btn btn-outline py-2 px-4"
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default DonorFilter