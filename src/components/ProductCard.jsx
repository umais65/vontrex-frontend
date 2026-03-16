import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { formatPrice } = useCurrency();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const handleWishlistToggle = (e) => {
        e.stopPropagation(); // Prevent the card's onClick from firing
        if (isInWishlist(product._id)) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <div className="product-card reveal visible" style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${product._id}`)}>
            <div className="product-card__image">
                <img src={product.image} alt={product.name} />
                {product.countInStock <= 0 && <span className="product-card__badge">Out of Stock</span>}
                <button
                    className="wishlist-toggle-btn"
                    onClick={handleWishlistToggle}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.2rem',
                        fontSize: '1.2rem',
                        transition: 'all 0.2s ease',
                        color: isInWishlist(product._id) ? 'var(--accent-red)' : '#ccc'
                    }}
                    aria-label="Toggle Wishlist"
                    title={isInWishlist(product._id) ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                    <i className={isInWishlist(product._id) ? "fas fa-heart" : "far fa-heart"}></i>
                </button>
            </div>
            <div className="product-card__content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p className="product-card__category" style={{ margin: 0 }}>{product.category}</p>
                </div>
                <h3 className="product-card__title">{product.name}</h3>
                <p className="product-card__price">{formatPrice(product.price)}</p>
                <Link to={`/product/${product._id}`} className="btn btn-outline btn-sm" onClick={(e) => e.stopPropagation()}>View Details</Link>
            </div>
        </div>
    );
};

export default ProductCard;
