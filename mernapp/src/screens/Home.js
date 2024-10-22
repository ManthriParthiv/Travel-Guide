import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../App.css';

export default function Home() {
  return (
    <div>
      <div><Navbar /></div>
      
      <div className="hero" id="hero">
        <h1>Welcome to Ultimate Travel Guide For Your Trip</h1>
        <p>Experience the new way of travel around the world</p>
        <a href="#main-features" className="cta">Start Your Adventure</a>
      </div>

      <div className="content1">
      <div className="main-features" id="main-features">
        <h2>Why Should you use travel planner ?</h2>
        <div className="feature">
          <h3>Real Time weather tracker</h3>
          <p>ccurately track the weather with your preferred Mood</p>
        </div>

        <div className="feature" id="feature">
          <h3>Chatbot Guide</h3>
          <p>It helps you to assist your trip to make more Impactful</p>
        </div>

        <div className="feature1" id="feature1">
          <h3>User Reviews & Testimonials</h3>
          <p>“Best travel site ever! Helped me plan the perfect trip!”</p>
        </div>

        <div className="feature">
          <h3>Interactive Map Feature</h3>
          <p>Click on a location to explore in-depth guides.</p>
        </div>

        <div className="feature">
          <h3>Blog & Articles</h3>
          <p>Read about the top 10 hidden gems to visit in Europe!</p>
        </div>
      </div>
      </div>

      <div className="content2" id="content2">
        <h2>Featured Destinations</h2>
        <div className="carousel-track">
          <div className="carousel-item" style={{ backgroundImage: "url('https://example.com/bali.jpg')" }}>
            <h3>Bali, Indonesia</h3>
          </div>
          <div className="carousel-item" style={{ backgroundImage: "url('https://example.com/paris.jpg')" }}>
            <h3>Paris, France</h3>
          </div>
          <div className="carousel-item" style={{ backgroundImage: "url('https://example.com/colorado.jpg')" }}>
            <h3>Colorado, USA</h3>
          </div>
        </div>
      </div>

      <div className="popular-categories">
        <h2>Popular Categories</h2>
        <ul>
          <li className="category">Adventure Travel</li>
          <li className="category">Family Vacations</li>
          <li className="category">Cultural Experiences</li>
          <li className="category">Budget Travel Tips</li>
        </ul>
      </div>

      <div className="newsletter">
        <h2>Join Our Travel Community!</h2>
        <p>Sign up for weekly insights and inspiration.</p>
        <input type="email" placeholder="Enter your email" />
        <button className="cta">Subscribe</button>
      </div>

      <div><Footer /></div>
    </div>
  );
}
