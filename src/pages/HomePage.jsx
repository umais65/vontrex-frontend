import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import CurrencySelector from '../components/CurrencySelector';
import Testimonials from '../components/Testimonials';
import Meta from '../components/Meta';

const HomePage = () => {
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                // Fetch featured products
                const res = await fetch('/api/products/featured');
                if (!res.ok) throw new Error('Network error');
                const data = await res.json();
                setFeatured(data);
            } catch (err) {
                console.error("Failed to fetch featured products", err);
            }
        };
        fetchFeatured();

        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        const handleScroll = () => {
            if (navbar) {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main>
            <Meta />
            <HeroSection />

            {/* FEATURED PRODUCTS */}
            <section className="section">
                <div className="container">
                    <div className="section-header reveal visible">
                        <span className="section-header__label">Top Picks</span>
                        <h2 className="section-header__title">Featured <span>Products</span></h2>
                        <p className="section-header__subtitle">Our most popular gear, tested and approved by professional fighters</p>
                        <div style={{ marginTop: '1.5rem' }}>
                            <CurrencySelector />
                        </div>
                    </div>

                    <div className="grid grid-4" id="featuredProducts">
                        {featured.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="section" style={{ background: 'var(--secondary-bg)' }}>
                <div className="container">
                    <div className="section-header reveal visible">
                        <span className="section-header__label">Our Promise</span>
                        <h2 className="section-header__title">Why Choose <span>Vontrex</span></h2>
                        <p className="section-header__subtitle">Uncompromising quality meets professional performance</p>
                    </div>

                    <div className="grid grid-2">
                        <div className="feature-block reveal visible" style={{ padding: 0, overflow: 'hidden', border: 'none' }}>
                            <img src="/images/manufacturing_stitching.png" alt="Crafting Gloves" style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
                            <div style={{ padding: 'var(--space-lg)' }}>
                                <h3 className="feature-block__title">Superior Craftsmanship</h3>
                                <p className="feature-block__description">Every stitch is placed with precision. Our gear is hand-crafted in authentic workshops to ensure maximum durability and performance.</p>
                            </div>
                        </div>

                        <div className="feature-block reveal visible" style={{ padding: 0, overflow: 'hidden', border: 'none' }}>
                            <img src="/images/manufacturing_finished.png" alt="Finished Gloves lying on workshop table" style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
                            <div style={{ padding: 'var(--space-lg)' }}>
                                <h3 className="feature-block__title">Quality Tested</h3>
                                <p className="feature-block__description">Rigorously tested by professional fighters before it ever reaches your hands. Uncompromising quality meets professional performance.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SHOP BY CATEGORY */}
            <section className="section">
                <div className="container">
                    <div className="section-header reveal visible">
                        <span className="section-header__label">Browse</span>
                        <h2 className="section-header__title">Shop by <span>Category</span></h2>
                        <p className="section-header__subtitle">Find the perfect gear for your training needs</p>
                    </div>

                    <div className="grid grid-4">
                        <Link to="/shop?category=gloves" className="category-block reveal visible">
                            <img src="/images/products/gloves-training-1.jpg" alt="Boxing Gloves" className="category-block__image" />
                            <div className="category-block__overlay">
                                <h3 className="category-block__title">Boxing Gloves</h3>
                                <span className="category-block__cta">Shop Now &rarr;</span>
                            </div>
                        </Link>
                        <Link to="/shop?category=wraps" className="category-block reveal visible">
                            <img src="/images/category-hand-wraps.jpg" alt="Hand Wraps" className="category-block__image" />
                            <div className="category-block__overlay">
                                <h3 className="category-block__title">Hand Wraps</h3>
                                <span className="category-block__cta">Shop Now &rarr;</span>
                            </div>
                        </Link>
                        <Link to="/shop?category=headgear" className="category-block reveal visible">
                            <img src="/images/category-headgear.jpg" alt="Headgear" className="category-block__image" />
                            <div className="category-block__overlay">
                                <h3 className="category-block__title">Headgear</h3>
                                <span className="category-block__cta">Shop Now &rarr;</span>
                            </div>
                        </Link>
                        <Link to="/shop?category=shinguards" className="category-block reveal visible">
                            <img src="/images/category-shinguards.jpg" alt="Shinguards" className="category-block__image" />
                            <div className="category-block__overlay">
                                <h3 className="category-block__title">Shinguards</h3>
                                <span className="category-block__cta">Shop Now &rarr;</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <Testimonials />

            {/* INSTAGRAM FEED */}
            <section className="section" style={{ background: 'var(--secondary-bg)' }}>
                <div className="container">
                    <div className="section-header reveal visible">
                        <span className="section-header__label">Instagram</span>
                        <h2 className="section-header__title">@<span>VontrexGear</span></h2>
                        <p className="section-header__subtitle">Follow us for training tips, gear drops &amp; fighter inspiration</p>
                    </div>

                    <div className="instagram-grid">
                        <a href="#" className="instagram-grid__item">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%231a1a1a' width='400' height='400'/%3E%3Ctext fill='%23333' x='50%25' y='50%25' text-anchor='middle' font-size='24' dy='.3em'%3ETraining%3C/text%3E%3C/svg%3E" alt="Training" />
                        </a>
                        <a href="#" className="instagram-grid__item">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23141414' width='400' height='400'/%3E%3Ctext fill='%23333' x='50%25' y='50%25' text-anchor='middle' font-size='24' dy='.3em'%3EGloves%3C/text%3E%3C/svg%3E" alt="Gloves" />
                        </a>
                        <a href="#" className="instagram-grid__item">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%231a1a1a' width='400' height='400'/%3E%3Ctext fill='%23333' x='50%25' y='50%25' text-anchor='middle' font-size='24' dy='.3em'%3EWorkout%3C/text%3E%3C/svg%3E" alt="Workout" />
                        </a>
                        <a href="#" className="instagram-grid__item">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23141414' width='400' height='400'/%3E%3Ctext fill='%23333' x='50%25' y='50%25' text-anchor='middle' font-size='24' dy='.3em'%3EChampion%3C/text%3E%3C/svg%3E" alt="Champion" />
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomePage;
