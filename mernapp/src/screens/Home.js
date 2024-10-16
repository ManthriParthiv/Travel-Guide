import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../App.css';
import WeatherReport from '../components/Weather';

export default function Home() {
  return (
    <div>
      <h2>Welcome to travel guide Home Page</h2>
      <div><WeatherReport/></div>
      <div><Navbar/></div>
      <div><Footer/></div>
      </div>  
  );
}
