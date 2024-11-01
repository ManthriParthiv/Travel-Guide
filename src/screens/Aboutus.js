import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Aboutus.css'
export default function Home() {
    return (
      <div className="About-us-background">
        <div><Navbar/></div>
        <div>.</div>
        <div>.</div>
        <div>.</div>
        <h1>Welcome to  Ultimate Travel Guide!</h1>
    <p>At [Travel-Guide], we are a dedicated trio brought together by our passion for travel and technology. With a focus on both stunning visuals and seamless functionality, we aim to provide you with a comprehensive travel guide that helps you discover the hidden gems of the world. Our mission is to inspire you to travel smarter and experience more, whether you're a seasoned adventurer or planning your first trip.</p>

    <h2>Meet Our Team:</h2>

    <div class="team-member">
        <h3>1.Manohar – Frontend Developer & UI/UX Designer</h3>
        <p>Manohar is the creative force behind our website’s look and feel. With a strong background in frontend development and design, he transforms ideas into visually appealing and user-friendly interfaces. His expertise in HTML, CSS, and JavaScript ensures that every page is not only aesthetically pleasing but also intuitive to navigate. Manohar conducts user research to understand our audience's needs, allowing him to create engaging experiences that make planning your next adventure enjoyable.</p>
    </div>

    <div class="team-member">
        <h3>2. Sai – Frontend Developer & Visual Content Specialist</h3>
        <p>Sai complements Manohar’s work by focusing on the visual content and overall user experience. With skills in graphic design and frontend development,Sai is responsible for creating and integrating eye-catching images and multimedia elements that enhance our travel stories. They work closely with Manohar to ensure a cohesive design across the site, while also optimizing visual content for fast loading times. Sai is passionate about storytelling through visuals, helping to transport our readers to the destinations we feature.</p>
    </div>

    <div class="team-member">
        <h3>3.Parthiv – Backend Developer & Data Specialist</h3>
        <p>Parthiv is the backbone of our website, handling everything behind the scenes. With a robust understanding of backend technologies,Parthiv develops and maintains the server, databases, and APIs that power our site. They ensure that our content is stored securely and delivered efficiently to our users. Parthiv is also responsible for implementing features such as user authentication, data management, and performance optimization. Their meticulous attention to detail ensures that our site runs smoothly, providing visitors with a seamless experience as they explore our travel guides and tips.</p>
    </div>

    <p>Together, we strive to make [Travel-Guide] a go-to resource for travel lovers everywhere. Join us on this journey as we explore the world, share our experiences, and help you create unforgettable memories. Happy travels!</p>

        <div><Footer/></div>
      </div>  
    );
  }