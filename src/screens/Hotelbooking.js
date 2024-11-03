import React, { useEffect } from 'react';
import '../styles/Homepage.css';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';

export default function Hotelbooking() {
  
  useEffect(() => {
    const handleKeydown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <div className="carousel-container">
      <Dashboard />
      <div className="carousel-wrapper">
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-keyboard="false">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://t3.ftcdn.net/jpg/03/97/74/64/360_F_397746410_YP1kxMSzQUhzDrlXCGu9wpKeDakisHjH.jpg" className="d-block w-100" alt="Hotel view" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Welcome to Luxury</h5>
                <p>Relax in style with our exclusive hotel rooms.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://images.pexels.com/photos/2491830/pexels-photo-2491830.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="Luxurious suite" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Luxurious Suites</h5>
                <p>Experience the comfort of our premium suites.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://images.pexels.com/photos/1722318/pexels-photo-1722318.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="Poolside view" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Poolside Relaxation</h5>
                <p>Unwind by our scenic poolside with your favorite drink.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
