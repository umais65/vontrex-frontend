import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="hero" style={{ position: 'relative', overflow: 'hidden', background: '#050505' }}>
            <video
                autoPlay
                loop
                muted
                playsInline
                className="hero__video"
            >
                <source src="/videos/Hero_Video.mp4" type="video/mp4" />
            </video>
            <div className="hero__overlay" style={{ zIndex: 1, position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3))' }}></div>
            <div className="container" style={{ position: 'relative', width: '100%', zIndex: 2 }}>
                <div className="hero__content" style={{ textAlign: 'left', maxWidth: '650px' }}>
                    <span className="hero__eyebrow">Premium Combat Gear</span>
                    <h1 className="hero__title">Built for<br /><span>Precision</span><br />& Power</h1>
                    <p className="hero__subtitle">Premium gloves built for power, speed, and unmatched protection. Trusted by champions worldwide.</p>
                    <Link to="/shop" className="hero-cta">SHOP NOW</Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
