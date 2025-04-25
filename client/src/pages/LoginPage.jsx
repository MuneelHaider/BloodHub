import { useState } from 'react'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const { data } = await axios.post('/login', { email, password })
      localStorage.setItem('token', data.token)
      window.dispatchEvent(new Event('authUpdated')) // trigger navbar to update

      const payload = JSON.parse(atob(data.token.split('.')[1]))
      navigate(payload.role === 'admin' ? '/admin' : '/donors')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign In</h2>
        {error && <div className="error-box">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit" className="btn-primary">Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
