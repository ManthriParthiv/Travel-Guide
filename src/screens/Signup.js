import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/signup.css';

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await fetch(`https://travel-guide-kp2f.onrender.com/api/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });

    const text = await response.text(); 
    let json;

    try {
      json = JSON.parse(text);
    } catch (err) {
      throw new Error("Invalid server response");
    }

    if (!response.ok || !json.success) {
      throw new Error(json.message || "Signup failed");
    }

    alert("Signup successful!");
    navigate('/login');
  } catch (error) {
    alert(error.message || "Something went wrong! Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="signup-background">
        <div className="signup-container">
          <h2 className="signup-heading">Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter your full name"
                value={credentials.name}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Create a password"
                value={credentials.password}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="geolocation">Location</label>
              <input
                type="text"
                className="form-control"
                name="geolocation"
                placeholder="Enter your location"
                value={credentials.geolocation}
                onChange={onChange}
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-success"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </button>
            <Link to='/login' className="btn btn-danger">
              Already have an account? Login
            </Link>
          </form>
        </div>
      </div>
      <div>
        <Footer/>
    </div>
    </>
  );
}