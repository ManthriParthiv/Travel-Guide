import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
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
          <ul className="navbar-nav ms-auto">  
            <li className="nav-item">
              <Link 
                className="nav-link btn btn-primary text-black ms-lg-2" 
                to="/aboutus"
                activeclassname="active"
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link btn btn-primary text-black ms-lg-2" 
                to="/contactus"
                activeclassname="active"
              >
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link btn btn-primary text-black ms-lg-2" 
                to="/login"
                activeclassname="active"
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link btn btn-primary text-black ms-lg-2"  
                to="/signup"
                activeclassname="active"
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