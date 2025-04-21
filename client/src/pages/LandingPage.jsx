import { Link } from 'react-router-dom'
import { FaSearch, FaTint, FaUsers, FaComments } from 'react-icons/fa'

const LandingPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <header className="relative bg-primary-700 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Donate Blood, Save Lives
            </h1>
            <p className="text-xl md:text-2xl text-white opacity-90 mb-10">
              Connect with blood donors in your area and help save lives. Join our community today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="btn bg-white text-primary-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                Register Now
              </Link>
              <Link to="/login" className="btn bg-transparent text-white border-2 border-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105">
                Sign In
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white"></div>
      </header>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How BloodHub Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Create an Account</h3>
              <p className="text-gray-600">Sign up and join our community of donors and recipients.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTint className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Post as a Donor</h3>
              <p className="text-gray-600">Add your information and blood type to help those in need.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Donors</h3>
              <p className="text-gray-600">Search for donors by location and blood type.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaComments className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect</h3>
              <p className="text-gray-600">Message donors directly and coordinate the donation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blood Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Blood Types</h2>
          <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Understanding blood types is crucial for safe transfusions. Here's a quick reference guide to blood compatibility.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
              <div key={type} className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 text-white font-bold text-xl mb-3">
                  {type}
                </div>
                <h3 className="text-xl font-semibold mb-2">Type {type}</h3>
                <p className="text-gray-600 text-sm">
                  {type === 'O-' ? 'Universal donor' : 
                   type === 'AB+' ? 'Universal recipient' : 
                   'Compatible with specific types'}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/register" className="btn btn-primary py-3 px-8 rounded-lg shadow inline-block">
              Become a Donor Today
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Make an Impact</h2>
              <p className="text-lg text-gray-600 mb-6">
                Every two seconds, someone in the world needs blood. A single donation can save up to three lives.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold mt-1">✓</div>
                  <p className="ml-3 text-gray-600">One donation can save multiple lives</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold mt-1">✓</div>
                  <p className="ml-3 text-gray-600">Blood cannot be manufactured – it can only come from donors</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold mt-1">✓</div>
                  <p className="ml-3 text-gray-600">The donation process is safe, simple, and takes only about an hour</p>
                </li>
              </ul>
              <Link to="/register" className="btn btn-primary py-3 px-8 rounded-lg shadow inline-block">
                Start Saving Lives
              </Link>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Blood donation" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <p className="text-2xl font-bold">Blood donation is a small act that makes a big difference</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-700 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Save Lives?</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-10">
            Join BloodHub today and become part of a community dedicated to helping others through blood donation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="btn bg-white text-primary-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              Register Now
            </Link>
            <Link to="/login" className="btn bg-transparent text-white border-2 border-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage