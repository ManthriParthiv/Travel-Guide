import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Aboutus.css';

export default function AboutUs() {
    return (
        <div className="page-wrapper">
            <Navbar />
            
            <main className="container content-wrapper py-5" style={{ marginTop: '5rem' }}>
                {/* Hero Section */}
                <section className="about-hero text-center mb-5">
                    <h1 className="about-title">Welcome to Travel Guide</h1>
                    <p className="about-subtitle">
                        We are a passionate team dedicated to creating the ultimate travel planning experience.
                    </p>
                </section>

                {/* Our Story */}
                <section className="form-section mb-5 text-center">
                    <h2 className="story-title">Our Story</h2>
                    <p className="story-text mx-auto" style={{maxWidth: "800px"}}>
                        Founded by three friends who shared a love for exploration, Ultimate Travel Guide 
                        began as a class project and grew into a comprehensive platform. We've combined our 
                        diverse skills to build a tool that helps travelers experience destinations more deeply.
                    </p>
                </section>

                {/* Team Section */}
                <section className="mb-5">
                    <h2 className="team-section-title text-center mb-5">Meet The Team</h2>
                    
                    <div className="row g-4">
                        {/* Team Member 1: Parthiv (First) */}
                        <div className="col-md-4">
                            <div className="team-card h-100">
                                <div className="team-card-body">
                                    <h3 className="member-name">Parthiv</h3>
                                    <h6 className="member-role mb-3">Full-Stack Developer</h6>
                                    <p className="member-desc">
                                        I build the robust systems that power our platform. Specializing in
                                        database optimization and API development, ensuring reliable access to comprehensive travel information.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 2: Manohar */}
                        <div className="col-md-4">
                            <div className="team-card h-100">
                                <div className="team-card-body">
                                    <h3 className="member-name">Manohar</h3>
                                    <h6 className="member-role mb-3">Frontend Developer & UI/UX Designer</h6>
                                    <p className="member-desc">
                                        I build the visual identity and user experience of our platform. With expertise 
                                        in React and user-centered design, transforming complex travel data into interactive interfaces.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Team Member 3: Kommaram Sai (Last) */}
                        <div className="col-md-4">
                            <div className="team-card h-100">
                                <div className="team-card-body">
                                    <h3 className="member-name">Kommaram Sai</h3>
                                    <h6 className="member-role mb-3">Frontend Developer</h6>
                                    <p className="member-desc">
                                        I combined graphic design with frontend development, ensuring every
                                        visual element enhances the travel planning experience.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Closing Section */}
                <section className="form-section text-center p-5">
                    <p className="closing-text lead mb-0">
                        We're committed to providing accurate, up-to-date information in an engaging format. 
                        Whether you're a seasoned traveler or planning your first trip, we're here to make 
                        your journey unforgettable.
                    </p>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}