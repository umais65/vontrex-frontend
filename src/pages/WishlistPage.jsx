import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import '../assets/css/pages.css';

const WishlistPage = () => {
    const { wishlistItems } = useWishlist();

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>My Wishlist</h1>
                <p>Items you've saved for later.</p>
            </div>

            <div className="page-content" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {wishlistItems.length === 0 ? (
                    <div className="empty-state" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                        <i className="far fa-heart" style={{ fontSize: '4rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}></i>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Your wishlist is empty</h2>
                        <p className="text-secondary" style={{ marginBottom: '2rem' }}>Explore our gear and save your favorites here.</p>
                        <Link to="/shop" className="btn-primary">Continue Shopping</Link>
                    </div>
                ) : (
                    <div className="product-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '2rem'
                    }}>
                        {wishlistItems.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
