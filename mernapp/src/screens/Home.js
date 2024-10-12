import React from 'react'
import Navbar from '../components/Navbar'
import Fotter from '../components/Fotter'
import '../styles/Home.css'
export default function Home() {
  return (
    <div>
      <h2>Welcome to travel guide Home Page</h2>
      <div><Navbar/></div>
      <div><Fotter/></div>
    </div>
  )
}
