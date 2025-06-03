import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Aboutus.css';

export default function AboutUs() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            
            <main className="container-fluid p-0 flex-grow-1">
                {/* Hero Section */}
                <section className="about-hero bg-dark text-white text-center py-5">
                    <div className="container py-5">
                        <h1 className="display-4 fw-bold mb-4">Welcome to Travel Guide</h1>
                        <p className="lead mb-0">
                            We are a passionate team dedicated to creating the ultimate travel planning experience.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <div className="container my-5">
                    {/* Our Story */}
                    <section className="mb-5">
                        <h2 className="text-center mb-4">Our Story</h2>
                        <p className="text-center mx-auto" style={{maxWidth: "800px"}}>
                            Founded by three friends who shared a love for exploration, Ultimate Travel Guide 
                            began as a class project and grew into a comprehensive platform. We've combined our 
                            diverse skills to build a tool that helps travelers experience destinations more deeply.
                        </p>
                    </section>

                    {/* Team Section */}
                    <section className="mb-5">
                        <h2 className="text-center mb-5">Meet The Team</h2>
                        
                        <div className="row g-4">
                            {/* Team Member 1 */}
                            <div className="col-md-4">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h3 className="card-title text-primary">Manohar</h3>
                                        <h6 className="card-subtitle mb-3 text-muted">Frontend Developer & UI/UX Designer</h6>
                                        <p className="card-text">
                                            I build the visual identity and user experience of our platform. With expertise 
                                            in React and user-centered design,
                                             transformed complex travel data into interactive interfaces.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Team Member 2 */}
                            <div className="col-md-4">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h3 className="card-title text-primary">Kommaram Sai</h3>
                                        <h6 className="card-subtitle mb-3 text-muted">Frontend Developer </h6>
                                        <p className="card-text">
                                            I  Combined graphic design with frontend development, ensuring every
                                             visual element enhances the travel planning experience.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Team Member 3 */}
                            <div className="col-md-4">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h3 className="card-title text-primary">Parthiv</h3>
                                        <h6 className="card-subtitle mb-3 text-muted"> Full-Stack Developer </h6>
                                        <p className="card-text">
                                            I Build the robust systems that power our platform. Specializing in
                                             database optimization and API development,
                                             ensuring reliable access to comprehensive travel information.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Closing Section */}
                    <section className="bg-light p-5 rounded-3 text-center">
                        <p className="lead mb-0">
                            We're committed to providing accurate, up-to-date information in an engaging format. 
                            Whether you're a seasoned traveler or planning your first trip, we're here to make 
                            your journey unforgettable.
                        </p>
                    </section>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}