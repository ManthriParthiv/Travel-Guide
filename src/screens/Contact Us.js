import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/ContactUs.css';

export default function ContactUs() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            
            <main className="container-fluid p-0 flex-grow-1">
                {/* Hero Section */}
                <section className="contact-hero bg-dark text-white text-center py-5">
                    <div className="container py-5">
                        <h1 className="display-4 fw-bold mb-4">Contact Our Team</h1>
                        <p className="lead mb-0">
                            We're here to help with any questions about your travel plans
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <div className="container my-5">
                    <section className="mb-5 text-center">
                        <h2 className="mb-4">Get In Touch</h2>
                        <p className="mx-auto" style={{maxWidth: "800px"}}>
                            Have questions about destinations, need travel advice, or want to collaborate? 
                            Reach out to any of our team members through their preferred contact method.
                        </p>
                    </section>

                    {/* Team Contact Cards */}
                    <div className="row g-4">
                        {/* Sai's Contact */}
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body text-center">
                                    <h3 className="card-title text-primary">Sai Komaram</h3>
                                    <h6 className="card-subtitle mb-3 text-muted">Frontend Developer & Visual Specialist</h6>
                                    
                                    <div className="contact-method">
                                        <i className="fas fa-envelope me-2"></i>
                                        <a href="mailto:saikomaram7@gmail.com">saikomaram7@gmail.com</a>
                                    </div>
                                    
                                    <div className="contact-method">
                                        <i className="fas fa-phone-alt me-2"></i>
                                        <span>+1 (834) 163-3522</span>
                                    </div>
                                    
                                    <div className="contact-method">
                                        <img src="https://clipground.com/images/whatsapp-messenger-logo-png-2.png" alt="WhatsApp" className="me-2" style={{width: '20px'}} />
                                        <span>+1 (834) 163-3522</span>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        {/* Manohar's Contact */}
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body text-center">
                                    <h3 className="card-title text-primary">Manohar</h3>
                                    <h6 className="card-subtitle mb-3 text-muted">Frontend Developer & UI/UX Designer</h6>
                                    
                                    <div className="contact-method">
                                        <i className="fas fa-envelope me-2"></i>
                                        <a href="mailto:manohar1231k@gmail.com">manohar1231k@gmail.com</a>
                                    </div>
                                    
                                    <div className="contact-method">
                                        <i className="fas fa-phone-alt me-2"></i>
                                        <span>+91-7780764510</span>
                                    </div>
                                    
                                    <div className="contact-method">
                                        <img src="https://clipground.com/images/whatsapp-messenger-logo-png-2.png" alt="WhatsApp" className="me-2" style={{width: '20px'}} />
                                        <span>+91-7780764510</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Parthiv's Contact */}
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body text-center">
                                    <h3 className="card-title text-primary">Parthiv</h3>
                                    <h6 className="card-subtitle mb-3 text-muted">Backend Developer & Data Specialist</h6>
                                    
                                    <div className="contact-method">
                                        <i className="fas fa-envelope me-2"></i>
                                        <a href="mailto:mantriparthiv08@gmail.com">mantriparthiv08@gmail.com</a>
                                    </div>
                                    
                                    <div className="contact-method">
                                        <i className="fas fa-phone-alt me-2"></i>
                                        <span>+91-8886660015</span>
                                    </div>
                                    
                                    <div className="contact-method">
                                        <img src="https://clipground.com/images/whatsapp-messenger-logo-png-2.png" alt="WhatsApp" className="me-2" style={{width: '20px'}} />
                                        <span>+91-8886660015</span>
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