import { createContext, useState, useContext, useEffect } from 'react'

// Mock donor data
const mockDonors = [
  {
    id: '1',
    userId: '1',
    name: 'John Doe',
    bloodType: 'O+',
    location: 'New York, NY',
    phone: '(212) 555-1234',
    email: 'john@example.com',
    lastDonation: '2023-09-15',
    available: true,
    bio: 'Regular donor with O+ blood type. Available for emergency donations.',
    donationCount: 12,
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '2',
    userId: '2',
    name: 'Jane Smith',
    bloodType: 'A-',
    location: 'Los Angeles, CA',
    phone: '(310) 555-5678',
    email: 'jane@example.com',
    lastDonation: '2023-10-20',
    available: true,
    bio: 'First-time donor. Excited to help those in need!',
    donationCount: 1,
    profileImage: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: '3',
    userId: '3',
    name: 'Michael Johnson',
    bloodType: 'B+',
    location: 'Chicago, IL',
    phone: '(773) 555-9012',
    email: 'michael@example.com',
    lastDonation: '2023-08-05',
    available: false,
    bio: 'Regular donor for the past 5 years. Will be available again in 2 weeks.',
    donationCount: 20,
    profileImage: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: '4',
    userId: '4',
    name: 'Emily Wilson',
    bloodType: 'AB+',
    location: 'Houston, TX',
    phone: '(713) 555-3456',
    email: 'emily@example.com',
    lastDonation: '2023-11-01',
    available: true,
    bio: 'Universal recipient with rare AB+ blood. Happy to donate platelets as well.',
    donationCount: 8,
    profileImage: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    id: '5',
    userId: '5',
    name: 'David Brown',
    bloodType: 'O-',
    location: 'Miami, FL',
    phone: '(305) 555-7890',
    email: 'david@example.com',
    lastDonation: '2023-07-22',
    available: true,
    bio: 'Universal donor with O- blood. Available for emergencies 24/7.',
    donationCount: 15,
    profileImage: 'https://randomuser.me/api/portraits/men/5.jpg'
  }
]

const DonorsContext = createContext()

export const DonorsProvider = ({ children }) => {
  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch donors on mount
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDonors(mockDonors)
      setLoading(false)
    }, 500)
  }, [])

  // Get donor by ID
  const getDonorById = (id) => {
    return donors.find(donor => donor.id === id) || null
  }

  // Search donors
  const searchDonors = (location, bloodType) => {
    let filteredDonors = [...donors]
    
    if (location) {
      filteredDonors = filteredDonors.filter(donor => 
        donor.location.toLowerCase().includes(location.toLowerCase())
      )
    }
    
    if (bloodType) {
      filteredDonors = filteredDonors.filter(donor => 
        donor.bloodType.toLowerCase() === bloodType.toLowerCase()
      )
    }
    
    return filteredDonors
  }

  // Create donor post
  const createDonorPost = (donorData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDonor = {
          id: (donors.length + 1).toString(),
          ...donorData,
          donationCount: 0
        }
        
        setDonors(prevDonors => [...prevDonors, newDonor])
        resolve(newDonor)
      }, 500)
    })
  }

  // Update donor post
  const updateDonorPost = (id, updatedData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setDonors(prevDonors => 
          prevDonors.map(donor => 
            donor.id === id ? { ...donor, ...updatedData } : donor
          )
        )
        
        const updatedDonor = { ...getDonorById(id), ...updatedData }
        resolve(updatedDonor)
      }, 500)
    })
  }

  const value = {
    donors,
    loading,
    getDonorById,
    searchDonors,
    createDonorPost,
    updateDonorPost
  }

  return <DonorsContext.Provider value={value}>{children}</DonorsContext.Provider>
}

export const useDonors = () => {
  const context = useContext(DonorsContext)
  if (!context) {
    throw new Error('useDonors must be used within a DonorsProvider')
  }
  return context
}