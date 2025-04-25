import { Link } from 'react-router-dom'
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div className="landing">

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Donate Blood, Save Lives</h1>
          <p>Connect with blood donors in your area and help save lives. Join our community today.</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">Register Now</Link>
            <Link to="/login" className="btn btn-secondary">Sign In</Link>
          </div>
        </div>
      </header>

      {/* How It Works */}
      <section className="section">
        <h2>How BloodHub Works</h2>
        <div className="cards">
          <div className="card"><h3>Create an Account</h3><p>Sign up and join our community.</p></div>
          <div className="card"><h3>Post as a Donor</h3><p>Add your info and blood type to help.</p></div>
          <div className="card"><h3>Find Donors</h3><p>Search by location and blood type.</p></div>
          <div className="card"><h3>Connect</h3><p>Message and coordinate donation.</p></div>
        </div>
      </section>

      {/* Blood Types */}
      <section className="section alt">
        <h2>Blood Types</h2>
        <p className="desc">Understanding blood types is crucial for safe transfusions.</p>
        <div className="blood-grid">
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
            <div key={type} className="blood-card">
              <div className="blood-icon">{type}</div>
              <h3>Type {type}</h3>
              <p>{type === 'O-' ? 'Universal donor' : type === 'AB+' ? 'Universal recipient' : 'Compatible with specific types'}</p>
            </div>
          ))}
        </div>
        <div className="center">
          <Link to="/register" className="btn btn-primary">Become a Donor Today</Link>
        </div>
      </section>

      {/* Impact */}
      <section className="section">
        <div className="impact-container">
          <div className="impact-text">
            <h2>Make an Impact</h2>
            <p>Every two seconds, someone in the world needs blood. One donation can save up to three lives.</p>
            <ul>
              <li>✓ One donation can save multiple lives</li>
              <li>✓ Blood cannot be manufactured</li>
              <li>✓ Donation is safe, simple, and quick</li>
            </ul>
            <Link to="/register" className="btn btn-primary">Start Saving Lives</Link>
          </div>
          <div className="impact-image">
            <img src="https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&w=800&q=80" alt="Blood Donation" />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section cta">
        <h2>Ready to Save Lives?</h2>
        <p>Join BloodHub and help others through blood donation.</p>
        <div className="hero-buttons">
          <Link to="/register" className="btn btn-primary">Register Now</Link>
          <Link to="/login" className="btn btn-secondary">Sign In</Link>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
