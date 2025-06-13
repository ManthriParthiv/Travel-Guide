import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from "react-router-dom";
import '../App.css';

export default function Home() {
  return (
    <div className="home-container">
      <Navbar />
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
          <p>Everything you need for a perfect trip in one place</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>🗺️ Smart Itinerary Planning</h3>
            <p>Discover and organize popular locations with our intelligent trip planner.</p>
          </div>
          
          <div className="feature-card">
            <h3>🤖 AI Travel Assistant</h3>
            <p>Get personalized recommendations and real-time assistance throughout your trip.</p>
          </div>

          <div className="feature-card">
            <h3>⏱️ Time Optimization</h3>
            <p>Maximize your experience with perfectly scheduled activities and routes.</p>
          </div>

          <div className="feature-card">
            <h3>🌦️ Live Weather Updates</h3>
            <p>Stay prepared with accurate, location-specific weather forecasts.</p>
          </div>

          <div className="feature-card">
            <h3>👮 Safety Information</h3>
            <p>Locate nearby police stations and safety resources in any location.</p>
          </div>

          <div className="feature-card">  
            <h3>🔍 Nearby Attractions</h3>
            <p>Discover hidden gems and popular spots near your destinations.</p>
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

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2 style={{color:"white"}}> 📬 Join Our Travel Community</h2>
          <p style={{color:"white"}}>Get weekly travel inspiration, tips, and exclusive offers</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button className="cta-button">Subscribe</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}