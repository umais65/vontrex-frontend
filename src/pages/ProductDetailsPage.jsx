import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlist } from '../context/WishlistContext';
import CurrencySelector from '../components/CurrencySelector';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { formatPrice } = useCurrency();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Product UI State
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState("");
    const [accordionOpen, setAccordionOpen] = useState("Size Guide");

    // Zoom state
    const imageContainerRef = useRef(null);
    const [isZooming, setIsZooming] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

    const handleMouseMove = useCallback((e) => {
        const container = imageContainerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    }, []);

    const handleMouseEnter = useCallback(() => setIsZooming(true), []);
    const handleMouseLeave = useCallback(() => setIsZooming(false), []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);

                // Initialize default selections
                if (data.sizes && data.sizes.length > 0) setSelectedSize(data.sizes[0]);
                if (data.colors && data.colors.length > 0) setSelectedColor(data.colors[0]);
                setActiveImage(data.image);

                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };
        fetchProduct();

        // Scroll to top when page loaded
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <main style={{ padding: '120px 5%' }}><h2>Loading Details...</h2></main>;
    if (error) return <main style={{ padding: '120px 5%' }}><h2 style={{ color: 'var(--accent-red)' }}>{error}</h2></main>;
    if (!product) return null;

    // Helper functions
    const increaseQuantity = () => {
        if (quantity < product.countInStock) setQuantity(prev => prev + 1);
    };
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };
    const toggleAccordion = (name) => {
        setAccordionOpen(accordionOpen === name ? "" : name);
    };

    const renderSizeGuideContent = () => {
        const category = product.category?.toLowerCase() || '';

        if (category.includes('headgear')) {
            return (
                <div className="flex-guide">
                    <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>To find your headgear size, measure the circumference of your head one inch above your eyebrows.</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', margin: 0, color: 'var(--text-secondary)' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Small:</strong> 19" - 21" (48 - 53 cm)</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Medium:</strong> 21" - 22.5" (53 - 57 cm)</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Large:</strong> 22.5" - 24" (57 - 61 cm)</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>X-Large:</strong> 24" & Over (61+ cm)</li>
                    </ul>
                </div>
            );
        } else if (category.includes('shinguard') || category.includes('shin-guard') || category.includes('shin')) {
            return (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ textAlign: 'left', padding: '0.75rem' }}>Size</th>
                            <th style={{ textAlign: 'left', padding: '0.75rem' }}>Your Height</th>
                            <th style={{ textAlign: 'left', padding: '0.75rem' }}>Shin Length</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '0.75rem' }}><strong>Small</strong></td>
                            <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>&lt; 5'3" (160cm)</td>
                            <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>&lt; 13" (33cm)</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '0.75rem' }}><strong>Medium</strong></td>
                            <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>5'3" - 5'9" (160-175cm)</td>
                            <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>13" - 14.5" (33-37cm)</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '0.75rem' }}><strong>Large</strong></td>
                            <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>5'10" - 6'1" (178-185cm)</td>
                            <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>14.5" - 16" (37-41cm)</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.75rem' }}><strong>X-Large</strong></td>
                            <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>&gt; 6'1" (185cm)</td>
                            <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>&gt; 16" (41cm)</td>
                        </tr>
                    </tbody>
                </table>
            );
        } else if (category.includes('wrap')) {
            return (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ textAlign: 'left', padding: '0.75rem' }}>Wrap Length</th>
                            <th style={{ textAlign: 'left', padding: '0.75rem' }}>Best For</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '0.75rem' }}><strong>120" (3m)</strong></td>
                            <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>Smaller hands, youth, women, or prioritizing speed.</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.75rem' }}><strong>180" (4.5m)</strong></td>
                            <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>Average to larger hands, or wanting maximum protection.</td>
                        </tr>
                    </tbody>
                </table>
            );
        } else {
            return (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ textAlign: 'left', padding: '0.75rem' }}>Size</th>
                            <th style={{ textAlign: 'left', padding: '0.75rem' }}>Weight Range</th>
                            <th style={{ textAlign: 'left', padding: '0.75rem' }}>Best For</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '0.75rem' }}>10 oz</td>
                            <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>&lt; 120 lbs</td>
                            <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>Youth, Speed Training</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '0.75rem' }}>12 oz</td>
                            <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>120-150 lbs</td>
                            <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>Competition, Bag Work</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '0.75rem' }}>14 oz</td>
                            <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>150-175 lbs</td>
                            <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>Training, Sparring</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.75rem' }}>16 oz</td>
                            <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>&gt; 175 lbs</td>
                            <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>Heavy Sparring</td>
                        </tr>
                    </tbody>
                </table>
            );
        }
    };

    // Calculate stars
    const rating = product.rating || 5.0;
    const fullStars = Math.floor(rating);
    const stars = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);

    // Get images array to display
    const imagesToDisplay = [product.image, ...(product.images || []).filter(img => img !== product.image)];

    return (
        <main style={{ padding: '120px 0 80px' }}>
            <div className="container">
                <div className="product-detail">
                    {/* PRODUCT GALLERY */}
                    <div className="product-gallery">
                        <div
                            className={`product-gallery__main ${isZooming ? 'product-gallery__main--zooming' : ''}`}
                            ref={imageContainerRef}
                            onMouseMove={handleMouseMove}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img
                                src={activeImage}
                                alt={product.name}
                                style={{
                                    cursor: 'crosshair',
                                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                                    transform: isZooming ? 'scale(2.5)' : 'scale(1)',
                                    transition: isZooming ? 'none' : 'transform 0.3s ease',
                                }}
                            />
                        </div>
                        <div className="product-gallery__thumbnails">
                            {imagesToDisplay.map((img, index) => (
                                <div
                                    key={index}
                                    className={`product-gallery__thumb ${activeImage === img ? 'product-gallery__thumb--active' : ''}`}
                                    onClick={() => setActiveImage(img)}
                                >
                                    <img src={img} alt={`${product.name} view ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PRODUCT INFO */}
                    <div className="product-info">
                        <Link to="/shop" style={{ color: 'var(--text-secondary)', display: 'inline-block', marginBottom: '1rem' }}>&larr; Back to Shop</Link>

                        <h1 className="product-info__title">{product.name}</h1>

                        <div className="product-info__rating">
                            <span style={{ color: '#ffc107', fontSize: '1.25rem' }}>{stars}</span>
                            <span style={{ color: 'var(--text-secondary)' }}>{rating} ({product.reviews || 0} reviews)</span>

                            {product.countInStock === 0 ? (
                                <span className="badge badge--danger">Out of Stock</span>
                            ) : product.countInStock < 10 ? (
                                <span className="badge badge--warning">Low Stock</span>
                            ) : (
                                <span className="badge badge--success">In Stock</span>
                            )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                            <p className="product-info__price" style={{ marginBottom: 0 }}>{formatPrice(product.price)}</p>
                            <CurrencySelector />
                        </div>

                        <div className="product-description-markdown" style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2rem' }}>
                            <ReactMarkdown>{product.description}</ReactMarkdown>
                        </div>

                        {/* OPTIONS */}
                        <div className="product-options">
                            {/* SIZE SELECTOR */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div className="product-options__group">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
                                        <label className="product-options__label" style={{ marginBottom: 0 }}>Select Size</label>
                                        <a href="#size-guide" onClick={(e) => { e.preventDefault(); setAccordionOpen('Size Guide'); document.getElementById('accordion-section').scrollIntoView({ behavior: 'smooth' }) }} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'underline' }}>View Size Guide</a>
                                    </div>
                                    <div className="size-selector">
                                        {product.sizes.map(size => (
                                            <div
                                                key={size}
                                                className={`size-option ${selectedSize === size ? 'size-option--selected' : ''}`}
                                                onClick={() => setSelectedSize(size)}
                                            >
                                                {size}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* COLOR SELECTOR */}
                            {product.colors && product.colors.length > 0 && (
                                <div className="product-options__group">
                                    <label className="product-options__label">
                                        Select Color: <span style={{ color: 'var(--text-primary)' }}>{selectedColor?.name}</span>
                                    </label>
                                    <div className="color-selector">
                                        {product.colors.map(color => (
                                            <div
                                                key={color.name}
                                                className={`color-option ${selectedColor?.name === color.name ? 'color-option--selected' : ''}`}
                                                style={{ background: color.hex, border: color.hex === '#ffffff' ? '2px solid var(--border-color)' : '' }}
                                                onClick={() => setSelectedColor(color)}
                                                title={color.name}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* QUANTITY SELECTOR */}
                        {product.countInStock > 0 && (
                            <div className="quantity-selector">
                                <label className="product-options__label">Quantity</label>
                                <div className="quantity-selector__controls">
                                    <button onClick={decreaseQuantity} disabled={quantity <= 1}>-</button>
                                    <input type="number" value={quantity} readOnly />
                                    <button onClick={increaseQuantity} disabled={quantity >= product.countInStock}>+</button>
                                </div>
                            </div>
                        )}

                        {/* ACTIONS (ADD TO CART + WISHLIST) */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: '1rem', marginBottom: '2rem' }}>
                            <button
                                className="btn btn-primary btn-lg"
                                style={{ width: '100%', opacity: product.countInStock === 0 ? 0.5 : 1 }}
                                disabled={product.countInStock === 0 || (product.sizes?.length > 0 && !selectedSize)}
                                onClick={() => addToCart(product, selectedSize, selectedColor, quantity)}
                            >
                                {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>

                            <button
                                className="btn btn-outline btn-lg"
                                style={{ width: '60px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (isInWishlist(product._id)) {
                                        removeFromWishlist(product._id);
                                    } else {
                                        addToWishlist(product);
                                    }
                                }}
                                title={isInWishlist(product._id) ? "Remove from Wishlist" : "Add to Wishlist"}
                            >
                                <i className={`${isInWishlist(product._id) ? "fas" : "far"} fa-heart`} style={{ fontSize: '1.5rem', color: isInWishlist(product._id) ? 'var(--accent-red)' : 'inherit' }}></i>
                            </button>
                        </div>

                        {/* FEATURES */}
                        {product.features && product.features.length > 0 && (
                            <div className="product-features">
                                <h3 style={{ marginBottom: '1rem' }}>Key Features</h3>
                                <ul className="product-features__list">
                                    {product.features.map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* ACCORDIONS */}
                        <div id="accordion-section" className="accordion" style={{ marginTop: '2rem' }}>
                            {/* SIZE GUIDE ACCORDION */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div className={`accordion__item ${accordionOpen === 'Size Guide' ? 'accordion__item--active' : ''}`}>
                                    <button className="accordion__header" onClick={() => toggleAccordion('Size Guide')}>
                                        Size Guide
                                        <span className="accordion__icon">▼</span>
                                    </button>
                                    <div className="accordion__content">
                                        <div className="accordion__body">
                                            {renderSizeGuideContent()}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SHIPPING ACCORDION */}
                            <div className={`accordion__item ${accordionOpen === 'Shipping' ? 'accordion__item--active' : ''}`}>
                                <button className="accordion__header" onClick={() => toggleAccordion('Shipping')}>
                                    Shipping & Returns
                                    <span className="accordion__icon">▼</span>
                                </button>
                                <div className="accordion__content">
                                    <div className="accordion__body">
                                        <h4 style={{ marginBottom: '0.5rem' }}>Shipping</h4>
                                        <p style={{ marginBottom: '1rem' }}>Free shipping on all orders over $100. Standard delivery takes 3-5 business days. Express shipping available at checkout.</p>
                                        <h4 style={{ marginBottom: '0.5rem' }}>Returns</h4>
                                        <p>30-day return policy. Items must be unused and in original packaging. Free returns on defective products.</p>
                                    </div>
                                </div>
                            </div>

                            {/* REVIEWS ACCORDION */}
                            <div className={`accordion__item ${accordionOpen === 'Reviews' ? 'accordion__item--active' : ''}`}>
                                <button className="accordion__header" onClick={() => toggleAccordion('Reviews')}>
                                    Reviews
                                    <span className="accordion__icon">▼</span>
                                </button>
                                <div className="accordion__content">
                                    <div className="accordion__body">
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <span style={{ fontSize: '3rem', fontWeight: 900 }}>{rating}</span>
                                                    <div>
                                                        <div style={{ color: '#ffc107', fontSize: '1.25rem' }}>{stars}</div>
                                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Based on {product.reviews || 0} reviews</p>
                                                    </div>
                                                </div>
                                                <button className="btn-secondary btn-sm">Write a Review</button>
                                            </div>
                                        </div>
                                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                    <strong>Best gloves I've owned</strong>
                                                    <span style={{ color: '#ffc107' }}>★★★★★</span>
                                                </div>
                                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Amazing quality and protection. Perfect for heavy bag work.</p>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>- Mike T., Verified Buyer</p>
                                            </div>
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                    <strong>Professional grade</strong>
                                                    <span style={{ color: '#ffc107' }}>★★★★★</span>
                                                </div>
                                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Used these for 6 months of intense training. Still look brand new.</p>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>- Sarah L., Verified Buyer</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* FAQ ACCORDION */}
                            <div className={`accordion__item ${accordionOpen === 'FAQ' ? 'accordion__item--active' : ''}`}>
                                <button className="accordion__header" onClick={() => toggleAccordion('FAQ')}>
                                    FAQ
                                    <span className="accordion__icon">▼</span>
                                </button>
                                <div className="accordion__content">
                                    <div className="accordion__body">
                                        <h4 style={{ marginBottom: '0.5rem' }}>How do I break in new gloves?</h4>
                                        <p style={{ marginBottom: '1.5rem' }}>Use them regularly for light bag work initially. Avoid heavy sparring for the first week to allow the leather to mold.</p>
                                        <h4 style={{ marginBottom: '0.5rem' }}>Can I use these for competition?</h4>
                                        <p style={{ marginBottom: '1.5rem' }}>Our gloves meet most amateur boxing standards. Always check with your organization for specific requirements.</p>
                                        <h4 style={{ marginBottom: '0.5rem' }}>How do I care for my gloves?</h4>
                                        <p>Air them out after each use. Use glove deodorizers. Never machine wash. Wipe exterior with damp cloth when needed.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetailsPage;
