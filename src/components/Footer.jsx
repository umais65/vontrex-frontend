import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__grid">
                    <div className="footer__brand">
                        <h2 className="footer__logo">VON<span>TREX</span></h2>
                        <p className="footer__desc">Premium boxing gear designed for champions. Quality and performance without compromise.</p>
                        <div className="footer__socials">
                            <a href="#" className="footer__social-link" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="footer__social-link" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="footer__social-link" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="footer__social-link" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>

                    <div className="footer__links">
                        <h3 className="footer__title">Shop</h3>
                        <ul>
                            <li><Link to="/shop">Boxing Gloves</Link></li>
                            <li><Link to="/shop">Punching Bags</Link></li>
                            <li><Link to="/shop">Protective Gear</Link></li>
                            <li><Link to="/shop">Apparel</Link></li>
                            <li><Link to="/shop">Accessories</Link></li>
                        </ul>
                    </div>

                    <div className="footer__links">
                        <h3 className="footer__title">Support</h3>
                        <ul>
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/faq">FAQs</Link></li>
                            <li><Link to="/shipping">Shipping Policy</Link></li>
                            <li><Link to="/returns">Returns & Exchanges</Link></li>
                            <li><Link to="/size-guide">Size Guide</Link></li>
                            <li><Link to="/track-order">Track Order</Link></li>
                        </ul>
                    </div>

                    <div className="footer__newsletter">
                        <h3 className="footer__title">Stay Updated</h3>
                        <p>Subscribe to our newsletter for exclusive offers, training tips, and new product announcements.</p>
                        <form className="footer__form" id="newsletterForm">
                            <input type="email" placeholder="Enter your email" required />
                            <button type="submit" className="btn btn--primary">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>&copy; {new Date().getFullYear()} Vontrex Boxing Gear. All rights reserved.</p>
                    <div className="footer__payments">
                        <i className="fab fa-cc-visa"></i>
                        <i className="fab fa-cc-mastercard"></i>
                        <i className="fab fa-cc-paypal"></i>
                        <i className="fab fa-cc-amex"></i>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
