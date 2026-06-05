import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/signup.css';
import { auth, db } from '../service/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

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
      // Step 1: Register User with Email and Password via Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
      
      // Step 2: Set displayName to Name
      await updateProfile(userCredential.user, {
        displayName: credentials.name
      });

      // Step 3: Save user meta details in Firestore (location, email, etc.)
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: credentials.name,
        email: credentials.email,
        location: credentials.geolocation,
        createdAt: new Date().toISOString()
      });

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
    <div className="page-wrapper">
      <Navbar />
      <div className="signup-background content-wrapper">
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
      <Footer />
    </div>
  );
}