import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../App.css';

export default function Home() {
  return (
    <div>
      <div><Navbar/></div>
      <div>.</div>
      <div>.</div>
      <div>Home</div>
      <div class="hero">
        <h1>Welcome to Ultimate Travel Guide For Your trip</h1>
        <p>Discover the World, One Journey at a Time</p>
        <a href="#start" class="cta">Start Your Adventure</a>
    </div>
      <div><Navbar /></div>
      
      <div className="hero" id="hero">
        <h1><b>Welcome to Ultimate Travel Guide For Your Trip</b></h1>
        <p><b>Experience the new way of travel around the world</b></p>
        <a href="#main-features" className="cta"><b>Start Your Adventure</b></a>
      </div>

      <div className="main-features" id="main-features">
        <h2>Main Features</h2>

        <div class="feature">
            <h3>Destination Highlights</h3>
            <p>Explore the beaches of Bali, the streets of Paris, and the mountains of Colorado.</p>
        </div>
      <div className="content1">
        <div className="main-features" id="main-features">
          <h1><b>Why Should you use travel planner ?</b></h1>
          <div className="feature3">
            <h3>Budget Management</h3>
            <p>Keep track of your travel expenses and manage your budget effectively while on the go.</p>
          </div>

        <div class="feature">
            <h3>Travel Tips & Guides</h3>
            <p>Insider tips to navigate local customs and enhance your travel experience.</p>
          <div className="feature4">
            <h3>Efficient Time Planning</h3>
            <p>Maximize your trip by organizing your time well. A travel planner helps you plan ahead and optimize your schedule.</p>
          </div>
        </div>

        <div class="feature">
            <h3>User Reviews & Testimonials</h3>
            <p>“Best travel site ever! Helped me plan the perfect trip!”</p>
        </div>
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
      <div className="feature">
        <h3>Proper Planning for travel</h3>
        <p>We can travel by selecting the Location with popular nearby places</p>
      </div>
      
      <div className="feature1">
      <h3>Chatbot Guide</h3>
      <p>It helps you to assist your trip to make more Impactful</p>
      </div>

      <div className="feature4">
      <h3><b>Efficient Time Planning</b></h3>
      <p>Maximize your trip by organizing your time well. A travel planner helps you plan ahead and optimize your schedule.</p>
      </div>

      <div className="feature5">
      <h3><b>Save Travel</b></h3>
      <p>Travel to your favorite places by knowing the crime percent in surroundings</p>
      </div>

    <div class="popular-categories">
      <div className="feature2">
      <h3><b>Live Weather Tracking</b></h3>
      <p>Get informed with latest weather update using Travel Guide</p>
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
        <button class="cta">Subscribe</button>
    </div>
      <div><Footer/></div>
    </div>  
        <button className="cta">Subscribe</button>
      </div>

      <div><Footer /></div>
    </div>
  );
}

const elements = document.querySelectorAll('.scroll-animate');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

elements.forEach((el) => observer.observe(el));