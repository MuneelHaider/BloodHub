import { Link } from 'react-router-dom'
import './Footer.css'
import { FaReact } from 'react-icons/fa'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h2 className="footer-title">
            🩸 BloodHub
          </h2>
          <p>
            BloodHub simplifies the process of connecting donors with those in urgent need of blood across Pakistan.
          </p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/donors">Find Donors</Link></li>
            <li><Link to="/register">Become a Donor</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>
          <p>Email: muneelhaider@gmail.com</p>
          <p>Email: i210643@nu.edu.pk</p>
          <p>Phone: 0308 8828340</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {year} BloodHub.</p>
      </div>
    </footer>
  )
}

export default Footer
