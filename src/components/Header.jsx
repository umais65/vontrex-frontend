import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { getCartCount } = useCart();
    const { userInfo, logout } = useAuth();
    const { getWishlistCount } = useWishlist();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const cartCount = getCartCount();
    const wishlistCount = getWishlistCount();

    const logoutHandler = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="header-wrapper" style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
            <div className="announcement-bar">
                <div className="announcement-bar__track">
                    <span>🥊 FREE SHIPPING ON ORDERS OVER $100</span>
                    <span>⚡ BUILT FOR CHAMPIONS — TRUSTED BY PROS</span>
                    <span>🛡️ 30-DAY RETURNS ON ALL GEAR</span>
                    <span>🔥 NEW ARRIVALS — SHOP THE LATEST DROP</span>
                    <span>🥊 FREE SHIPPING ON ORDERS OVER $100</span>
                    <span>⚡ BUILT FOR CHAMPIONS — TRUSTED BY PROS</span>
                    <span>🛡️ 30-DAY RETURNS ON ALL GEAR</span>
                    <span>🔥 NEW ARRIVALS — SHOP THE LATEST DROP</span>
                </div>
            </div>

            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
                <div className="navbar__container">
                    <Link to="/" className="navbar__logo">
                        VON<span style={{ color: 'var(--accent-red)' }}>TREX</span>
                    </Link>

                    <ul className={`navbar__menu ${isMenuOpen ? 'navbar__menu--active' : ''}`}>
                        <li><Link to="/" className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`} onClick={toggleMenu}>Home</Link></li>
                        <li><Link to="/shop" className={`navbar__link ${location.pathname === '/shop' ? 'navbar__link--active' : ''}`} onClick={toggleMenu}>Shop</Link></li>
                        <li><Link to="/blog" className={`navbar__link ${location.pathname.startsWith('/blog') ? 'navbar__link--active' : ''}`} onClick={toggleMenu}>Blog</Link></li>
                        <li><Link to="/about" className={`navbar__link ${location.pathname === '/about' ? 'navbar__link--active' : ''}`} onClick={toggleMenu}>About</Link></li>
                        <li><Link to="/contact" className={`navbar__link ${location.pathname === '/contact' ? 'navbar__link--active' : ''}`} onClick={toggleMenu}>Contact</Link></li>

                        {/* Mobile Actions - Only visible inside menu on mobile */}
                        <li className="mobile-actions">
                            {userInfo ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.2rem' }}>Hi, {userInfo.name ? userInfo.name.split(' ')[0] : 'User'}</span>
                                    <Link to="/profile" className="navbar__link" onClick={toggleMenu}>Profile</Link>
                                    {userInfo.isAdmin && <Link to="/admin/productlist" className="badge badge--danger" onClick={toggleMenu} style={{ textDecoration: 'none', fontSize: '1rem', padding: '0.5rem 1rem' }}>Admin</Link>}
                                    <button onClick={logoutHandler} className="btn-secondary btn-sm" style={{ padding: '0.6rem 2rem', marginTop: '1rem' }}>Logout</button>
                                </div>
                            ) : (
                                <Link to="/login" className="btn-primary" onClick={toggleMenu} style={{ textDecoration: 'none', width: '100%', textAlign: 'center' }}>Login</Link>
                            )}
                        </li>
                    </ul>

                    <div className="navbar__actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

                        {/* Desktop Actions - Hidden on mobile via CSS */}
                        <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

                            {userInfo ? (
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Hi, {userInfo.name ? userInfo.name.split(' ')[0] : 'User'}</span>
                                    <Link to="/profile" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'none', borderBottom: '1px solid var(--accent-red)' }}>
                                        Profile
                                    </Link>
                                    {userInfo.isAdmin && <Link to="/admin/productlist" className="badge badge--danger" style={{ textDecoration: 'none' }}>Admin</Link>}
                                    <button onClick={logoutHandler} className="btn-secondary btn-sm" style={{ padding: '0.4rem 0.8rem' }}>Logout</button>
                                </div>
                            ) : (
                                <Link to="/login" className="btn-secondary btn-sm" style={{ textDecoration: 'none' }}>Login</Link>
                            )}
                        </div>

                        <Link to="/wishlist" className="navbar__cart" style={{ marginRight: '0.5rem' }}>
                            <i className="far fa-heart" style={{ fontSize: '1.25rem' }}></i>
                            <span className="navbar__cart-badge" style={{ display: wishlistCount > 0 ? 'flex' : 'none' }}>{wishlistCount}</span>
                        </Link>

                        <Link to="/cart" className="navbar__cart">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 2L6 6H18L15 2M7 6v14a2 2 0 002 2h6a2 2 0 002-2V6"></path>
                            </svg>
                            <span className="navbar__cart-badge" style={{ display: cartCount > 0 ? 'flex' : 'none' }}>{cartCount}</span>
                        </Link>
                        <button className={`navbar__toggle ${isMenuOpen ? 'navbar__toggle--active' : ''}`} id="navToggle" onClick={toggleMenu}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
