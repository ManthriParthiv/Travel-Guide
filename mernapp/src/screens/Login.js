import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Login.css'

export default function Login() {
  return (
    <div>
      <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-btn">Sign In</button>
          <p className="sign-up-text">
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
        </form>
      </div>
      </div>
    </div>
  )
}
