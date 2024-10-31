import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; 

export default function Dashboard() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Home</Link>
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
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Travel Planner</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Weather Report</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Chat Assistance</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}