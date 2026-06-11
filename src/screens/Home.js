import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from "react-router-dom";
import '../App.css';

export default function Home() {
  return (
    <div className="home-container page-wrapper">
      <Navbar />
      
      <div className="content-wrapper">
        <section className="hero-section">
          <div className="hero-content">
            <h1>✈️ Ultimate Travel Guide</h1>
            <p className="hero-subtitle">Experience seamless travel planning for your next adventure</p>
            <Link to="/login" className="cta-button">Start Your Journey →</Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section" id="features">
          <div className="section-header">
            <h2>🌟 Why Use Our Travel Planner?</h2>
            <p>Smart, interactive trip planning designed exactly around how you love to explore.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <h3>🤖 AI Powered Itinerary Planner</h3>
              <p>Draft highly personalized day-by-day itineraries complete with hotels, ratings, pricing, and travel times tailored to your budget.</p>
            </div>
            
            <div className="feature-card">
              <h3>🛰️ Journey Analyzer</h3>
              <p>Input any flight code, train number, or bus route to get instant schedules, duration, precautions, and safety reports.</p>
            </div>

            <div className="feature-card">
              <h3>🌦️ Live Weather Forecasts</h3>
              <p>Stay prepared with an integrated 5-day weather forecast system for your exact travel destinations.</p>
            </div>

            <div className="feature-card">
              <h3>📍 Live Local Services</h3>
              <p>Geolocate your coordinates to explore nearby essential amenities, transit points, safety resources, and popular dining in real-time.</p>
            </div>

            <div className="feature-card">
              <h3>🗺️ Integrated Maps Search</h3>
              <p>Navigate easily with quick, coordinate-synced Google Maps search links for all recommended hotels and attractions.</p>
            </div>

            <div className="feature-card">  
              <h3>💼 Secure Trip Dashboard</h3>
              <p>Save and manage all your generated itineraries in a personalized account dashboard for easy reference anytime.</p>
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="categories-section">
          <div className="section-header">
            <h2>📌 Popular Travel Categories</h2>
            <p>Find inspiration for your next adventure</p>
          </div>
          
          <div className="categories-grid">
            <div className="category-card">
              <h3>Adventure Travel</h3>
              <p>Hiking, rafting, and adrenaline-packed experiences</p>
            </div>
            <div className="category-card">
              <h3>Family Vacations</h3>
              <p>Kid-friendly destinations and activities</p>
            </div>
            <div className="category-card">
              <h3>Cultural Experiences</h3>
              <p>Immerse yourself in local traditions</p>
            </div>
            <div className="category-card">
              <h3>Budget Travel</h3>
              <p>Smart tips for affordable adventures</p>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}
