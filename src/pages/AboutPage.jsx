import React from 'react';
import '../assets/css/pages.css';

const AboutPage = () => {
    return (
        <div className="page-container">
            <div className="about-hero">
                <h1>Built for Precision & Power</h1>
                <p>The VONTREX Story</p>
            </div>

            <div className="page-content about-content">
                <section className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        At VONTREX, our mission is simple: to provide combat athletes with the highest quality gear that enhances performance, ensures safety, and looks incredible. We bridge the gap between premium professional equipment and accessible pricing.
                    </p>
                </section>

                <section className="about-section">
                    <h2>The VONTREX Standard</h2>
                    <p>
                        Every pair of gloves, every punching bag, and every piece of protective equipment we produce undergoes rigorous testing. We work with professional fighters to iterate on our designs until they meet our uncompromising standards for durability and impact distribution.
                    </p>
                    <div className="features-grid">
                        <div className="feature">
                            <h3>Premium Materials</h3>
                            <p>We source only top-tier authentic leather and advanced synthetic variants for maximum longevity.</p>
                        </div>
                        <div className="feature">
                            <h3>Ergonomic Design</h3>
                            <p>Our gear is designed to conform to the natural strike mechanics of the human body.</p>
                        </div>
                        <div className="feature">
                            <h3>Rigorous Testing</h3>
                            <p>Tested in real gyms by real fighters. Built to withstand thousands of rounds.</p>
                        </div>
                    </div>
                </section>

                <section className="about-section">
                    <h2>Join the VONTREX Family</h2>
                    <p>
                        Whether you are stepping into the ring for the first time or defending a world title, VONTREX represents a commitment to excellence. We are more than a brand; we are a community of fighters dedicated to the sweet science.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AboutPage;
