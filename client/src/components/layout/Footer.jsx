import { Link } from 'react-router-dom'
import { FaHeart, FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white shadow-inner pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-primary-700">Blood<span className="text-primary-600">Hub</span></span>
            </Link>
            <p className="text-gray-600 mb-4">
              BloodHub is a non-profit platform dedicated to connecting blood donors with those in need. Our mission is to make blood donation accessible and efficient, helping save lives across the globe.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/bloodhub" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600 transition-colors">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com/bloodhub" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600 transition-colors">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com/bloodhub" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600 transition-colors">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://github.com/bloodhub" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600 transition-colors">
                <FaGithub className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/donors" className="text-gray-600 hover:text-primary-600 transition-colors">Find Donors</Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-600 hover:text-primary-600 transition-colors">Become a Donor</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-primary-600 transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-primary-600 transition-colors">Register</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <p className="text-gray-600">
                  Created by the BloodHub Team
                </p>
              </li>
              <li>
                <p className="text-gray-600">
                  Version 1.0.0
                </p>
              </li>
              <li>
                <p className="text-gray-600">
                  Open Source Project
                </p>
              </li>
              <li>
                <a href="https://github.com/bloodhub/bloodhub" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600 transition-colors">
                  View on GitHub
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                BloodHub Foundation
              </li>
              <li className="text-gray-600">
                123 Main Street
              </li>
              <li className="text-gray-600">
                New York, NY 10001
              </li>
              <li className="text-gray-600">
                Email: contact@bloodhub.org
              </li>
              <li className="text-gray-600">
                Phone: (123) 456-7890
              </li>
              <li className="text-gray-600">
                Available 24/7 for emergencies
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6">
          <p className="text-center text-gray-500 text-sm">
            &copy; {currentYear} BloodHub Foundation. All rights reserved. Made with <FaHeart className="inline text-primary-600 mx-1" /> by the BloodHub Team.
          </p>
          <p className="text-center text-gray-400 text-sm mt-2">
            BloodHub is a registered non-profit organization dedicated to saving lives through blood donation.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer