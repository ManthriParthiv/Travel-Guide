import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        </div>
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