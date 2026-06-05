import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './Navbar2.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top premium-navbar">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Travel Planner
        </Link>
      
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"  
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">  
            <li className="nav-item">
              <Link 
                className="nav-link text-black ms-lg-2" 
                to="/tracking"
              >
                Live Tracking
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link text-black ms-lg-2" 
                to="/aboutus"
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link text-black ms-lg-2" 
                to="/contactus"
              >
                Contact Us
              </Link>
            </li>
            <li className="nav-item ms-lg-3">
              <Link 
                className="btn btn-outline-primary btn-sm" 
                to="/login"
              >
                Login
              </Link>
            </li>
            <li className="nav-item ms-lg-2">
              <Link 
                className="btn btn-primary btn-sm text-white"  
                to="/signup"
                style={{ background: '#4f46e5', borderColor: '#4f46e5' }}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}