import { Link } from 'react-router-dom'
import { FaTint, FaMapMarkerAlt, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa'
import { format, parseISO, isAfter, subMonths } from 'date-fns'

const DonorCard = ({ donor }) => {
  // Check if the donor has donated in the last 3 months
  const isRecentDonor = donor.lastDonation 
    ? isAfter(parseISO(donor.lastDonation), subMonths(new Date(), 3))
    : false

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        {!donor.available && (
          <div className="absolute top-0 right-0 m-2 px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-md flex items-center">
            <FaExclamationTriangle className="mr-1" />
            Unavailable
          </div>
        )}
        <div className="p-4 flex flex-col md:flex-row md:items-center">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto md:mx-0">
              {donor.profileImage ? (
                <img 
                  src={donor.profileImage} 
                  alt={donor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary-100 flex items-center justify-center text-primary-700 text-2xl font-bold">
                  {donor.name.charAt(0)}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900">{donor.name}</h3>
            
            <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-3">
              <div className="flex items-center text-sm text-gray-600">
                <FaTint className="mr-1 text-primary-600" />
                <span className="font-medium">{donor.bloodType}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <FaMapMarkerAlt className="mr-1 text-gray-500" />
                <span>{donor.location}</span>
              </div>
              
              {donor.lastDonation && (
                <div className="flex items-center text-sm text-gray-600">
                  <FaCalendarAlt className="mr-1 text-gray-500" />
                  <span>Last Donation: {format(parseISO(donor.lastDonation), 'MMM d, yyyy')}</span>
                </div>
              )}
            </div>
            
            <div className="mt-3">
              {isRecentDonor ? (
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Recently donated
                </div>
              ) : donor.available ? (
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Available
                </div>
              ) : (
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Not available
                </div>
              )}
              
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 ml-2">
                {donor.donationCount} {donor.donationCount === 1 ? 'donation' : 'donations'}
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex-shrink-0 text-center md:text-right">
            <Link 
              to={`/donors/${donor.id}`}
              className="btn btn-primary py-2 px-4 w-full md:w-auto"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonorCard