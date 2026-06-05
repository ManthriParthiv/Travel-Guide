import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content container">
        <div className="row g-4 justify-content-between align-items-start">
          {/* Logo & Description */}
          <div className="col-lg-4 col-md-6 footer-brand-column">
            <h4 className="footer-brand-title">✈️ Travel Planner</h4>
            <p className="footer-brand-description">
              Experience seamless, AI-powered travel planning. Explore nearby services, get real-time weather details, and create curated itineraries for your next adventure.
            </p>
          </div>
          
          {/* Quick Navigation Links */}
          <div className="col-lg-3 col-md-6 footer-links-column">
            <h5 className="footer-section-title">Explore</h5>
            <ul className="footer-quick-links list-unstyled">
              <li><Link to="/" className="footer-nav-link">Home</Link></li>
              <li><Link to="/aboutus" className="footer-nav-link">About Us</Link></li>
              <li><Link to="/contactus" className="footer-nav-link">Contact Us</Link></li>
              <li><Link to="/Nearby" className="footer-nav-link">Live Services</Link></li>
            </ul>
          </div>
          
          {/* Team GitHub Section */}
          <div className="col-lg-4 col-md-12 footer-social-column">
            <h5 className="footer-section-title">Connect with Developers</h5>
            <div className="developer-links">
              <div className="developer-item">
                <span className="developer-name">Parthiv</span>
                <a href="https://github.com/ManthriParthiv" target="_blank" rel="noopener noreferrer" className="dev-github-link">
                  <i className="bi bi-github"></i> github.com/ManthriParthiv
                </a>
              </div>
              <div className="developer-item">
                <span className="developer-name">Manohar</span>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="dev-github-link">
                  <i className="bi bi-github"></i> github.com
                </a>
              </div>
              <div className="developer-item">
                <span className="developer-name">Sai Komaram</span>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="dev-github-link">
                  <i className="bi bi-github"></i> github.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-divider-line"></div>
      
      <div className="copyright-section">
        <p className="copyright-text">
          © {new Date().getFullYear()} TravelPlanner. All rights reserved.
        </p>
        <div className="legal-links">
          <Link to="/terms" className="legal-link">Terms of Service</Link>
          <span className="divider">|</span>
          <Link to="/privacy" className="legal-link">Privacy Policy</Link>
          <span className="divider">|</span>
          <Link to="/cookies" className="legal-link">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}