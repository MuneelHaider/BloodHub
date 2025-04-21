import { useState, useEffect } from 'react'
import { useDonors } from '../contexts/DonorsContext'
import { useUser } from '../contexts/UserContext'
import { Link } from 'react-router-dom'
import DonorCard from '../components/donors/DonorCard'
import DonorFilter from '../components/donors/DonorFilter'
import { FaSearch, FaUserPlus } from 'react-icons/fa'

const DonorsPage = () => {
  const { donors, loading, searchDonors } = useDonors()
  const { isAuthenticated } = useUser()
  const [filteredDonors, setFilteredDonors] = useState([])
  const [searchParams, setSearchParams] = useState({ location: '', bloodType: '' })
  const [noResults, setNoResults] = useState(false)

  useEffect(() => {
    if (!loading) {
      handleSearch(searchParams)
    }
  }, [loading, donors])

  const handleSearch = (params) => {
    setSearchParams(params)
    const results = searchDonors(params.location, params.bloodType)
    setFilteredDonors(results)
    setNoResults(results.length === 0)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Find Blood Donors</h1>
          <p className="text-gray-600">
            Search for blood donors by location and blood type. Connect with donors directly to arrange donations.
          </p>
        </div>
        
        {!isAuthenticated && (
          <div className="mt-4 md:mt-0">
            <Link to="/register" className="btn btn-primary py-2 px-4 flex items-center">
              <FaUserPlus className="mr-2" />
              Register to Donate
            </Link>
          </div>
        )}
      </div>

      <DonorFilter onSearch={handleSearch} />

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="w-12 h-12 border-4 border-primary-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
      ) : noResults ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <FaSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No donors found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            We couldn't find any donors matching your search criteria. Try adjusting your filters or check back later.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDonors.map(donor => (
            <DonorCard key={donor.id} donor={donor} />
          ))}
        </div>
      )}
    </div>
  )
}

export default DonorsPage