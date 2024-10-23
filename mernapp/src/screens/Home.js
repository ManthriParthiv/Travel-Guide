import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../App.css';

export default function Home() {
  return (
    <div>
      <div><Navbar /></div>
      
      <div className="hero" id="hero">
        <h1><b>Welcome to Ultimate Travel Guide For Your Trip</b></h1>
        <p><b>Experience the new way of travel around the world</b></p>
        <a href="#main-features" className="cta"><b>Start Your Adventure</b></a>
      </div>

      <div className="content1">
        <div className="main-features" id="main-features">
          <h1><b>Why Should you use travel planner ?</b></h1>

          <div className="feature2">
            <h3>Personalized Itineraries</h3>
            <p>Create custom travel plans tailored to your interests and preferences, ensuring you don’t miss out on key attractions or activities.</p>
          </div>

          <div className="feature3">
            <h3>Budget Management</h3>
            <p>Keep track of your travel expenses and manage your budget effectively while on the go.</p>
          </div>

          <div className="feature4">
            <h3>Efficient Time Planning</h3>
            <p>Maximize your trip by organizing your time well. A travel planner helps you plan ahead and optimize your schedule.</p>
          </div>

          <div className="feature5">
            <h3>Safety and Emergency Alerts</h3>
            <p>Receive real-time alerts about safety concerns or emergencies, helping you stay prepared and safe during your travels.</p>
          </div>
        </div>
      </div>

      <div className="feature">
        <h3>Real Time weather tracker</h3>
        <p>Accurately track the weather with your preferred Mood</p>
      </div>
      
      <div className="feature1">
      <h3>Chatbot Guide</h3>
      <p>It helps you to assist your trip to make more Impactful</p>
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
