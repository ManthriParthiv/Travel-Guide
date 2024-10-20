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

    <div class="main-features">
        <h2>Main Features</h2>

        <div class="feature">
            <h3>Destination Highlights</h3>
            <p>Explore the beaches of Bali, the streets of Paris, and the mountains of Colorado.</p>
        </div>

        <div class="feature">
            <h3>Travel Tips & Guides</h3>
            <p>Insider tips to navigate local customs and enhance your travel experience.</p>
        </div>

        <div class="feature">
            <h3>User Reviews & Testimonials</h3>
            <p>“Best travel site ever! Helped me plan the perfect trip!”</p>
        </div>

        <div class="feature">
            <h3>Interactive Map Feature</h3>
            <p>Click on a location to explore in-depth guides.</p>
        </div>

        <div class="feature">
            <h3>Blog & Articles</h3>
            <p>Read about the top 10 hidden gems to visit in Europe!</p>
        </div>
    </div>

    <div class="popular-categories">
        <h2>Popular Categories</h2>
        <ul>
            <li class="category">Adventure Travel</li>
            <li class="category">Family Vacations</li>
            <li class="category">Cultural Experiences</li>
            <li class="category">Budget Travel Tips</li>
        </ul>
    </div>

    <div class="newsletter">
        <h2>Join Our Travel Community!</h2>
        <p>Sign up for weekly insights and inspiration.</p>
        <input type="email" placeholder="Enter your email" />
        <button class="cta">Subscribe</button>
    </div>
      <div><Footer/></div>
    </div>  
  );
}
