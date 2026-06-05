import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/ContactUs.css';

export default function ContactUs() {
    return (
        <div className="page-wrapper">
            <Navbar />
            
            <main className="container content-wrapper py-5" style={{ marginTop: '5rem' }}>
                {/* Hero Section */}
                <section className="contact-hero text-center mb-5">
                    <h1 className="contact-title">Contact Our Team</h1>
                    <p className="contact-subtitle">
                        We're here to help with any questions about your travel plans.
                    </p>
                </section>

                <section className="form-section mb-5 text-center">
                    <h2 className="story-title">Get In Touch</h2>
                    <p className="story-text mx-auto" style={{maxWidth: "800px"}}>
                        Have questions about destinations, need travel advice, or want to collaborate? 
                        Reach out to any of our team members through their preferred contact method.
                    </p>
                </section>

                {/* Team Contact Cards */}
                <div className="row g-4 mb-5">
                    {/* Contact Member 1: Parthiv (First) */}
                    <div className="col-md-4">
                        <div className="contact-card h-100">
                            <div className="contact-card-body text-center">
                                <h3 className="contact-name">Parthiv</h3>
                                <h6 className="contact-role mb-4">Backend Developer & Data Specialist</h6>
                                
                                <div className="contact-details-list">
                                    <div className="contact-method-item">
                                        <span className="contact-icon-label">📧</span>
                                        <a href="mailto:mantriparthiv08@gmail.com" className="contact-link">mantriparthiv08@gmail.com</a>
                                    </div>
                                    
                                    <div className="contact-method-item">
                                        <span className="contact-icon-label">📞</span>
                                        <span className="contact-info-text">+91 88866 60015</span>
                                    </div>
                                    
                                    <div className="contact-method-item">
                                        <span className="contact-icon-label">💻</span>
                                        <a href="https://github.com/ManthriParthiv" target="_blank" rel="noopener noreferrer" className="contact-link github-link">GitHub Profile</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Member 2: Manohar */}
                    <div className="col-md-4">
                        <div className="contact-card h-100">
                            <div className="contact-card-body text-center">
                                <h3 className="contact-name">Manohar</h3>
                                <h6 className="contact-role mb-4">Frontend Developer & UI/UX Designer</h6>
                                
                                <div className="contact-details-list">
                                    <div className="contact-method-item">
                                        <span className="contact-icon-label">📧</span>
                                        <a href="mailto:manohar1231k@gmail.com" className="contact-link">manohar1231k@gmail.com</a>
                                    </div>
                                    
                                    <div className="contact-method-item">
                                        <span className="contact-icon-label">📞</span>
                                        <span className="contact-info-text">+91 77807 64510</span>
                                    </div>
                                    
                                    <div className="contact-method-item">
                                        <span className="contact-icon-label">💻</span>
                                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="contact-link github-link">GitHub Profile</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Member 3: Sai Komaram (Last) */}
                    <div className="col-md-4">
                        <div className="contact-card h-100">
                            <div className="contact-card-body text-center">
                                <h3 className="contact-name">Sai Komaram</h3>
                                <h6 className="contact-role mb-4">Frontend Developer & Visuals</h6>
                                
                                <div className="contact-details-list">
                                    <div className="contact-method-item">
                                        <span className="contact-icon-label">📧</span>
                                        <a href="mailto:saikomaram7@gmail.com" className="contact-link">saikomaram7@gmail.com</a>
                                    </div>
                                    
                                    <div className="contact-method-item">
                                        <span className="contact-icon-label">📞</span>
                                        <span className="contact-info-text">+1 (834) 163-3522</span>
                                    </div>
                                    
                                    <div className="contact-method-item">
                                        <span className="contact-icon-label">💻</span>
                                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="contact-link github-link">GitHub Profile</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}