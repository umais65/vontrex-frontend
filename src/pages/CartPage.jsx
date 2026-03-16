import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const { formatPrice } = useCurrency();
    const [discountCode, setDiscountCode] = useState('');
    const [discountMsg, setDiscountMsg] = useState({ text: '', type: '' });
    const [appliedDiscount, setAppliedDiscount] = useState(0); // Add percent discount

    const total = getCartTotal();
    const subtotal = total;

    // Calculate discount and shipping
    const discountAmount = subtotal * (appliedDiscount / 100);
    const discountedTotal = subtotal - discountAmount;
    const shipping = discountedTotal > 100 || discountedTotal === 0 ? 0 : 9.99;
    const finalTotal = discountedTotal + shipping;

    const discountCodes = {
        'FIGHTER10': { type: 'percent', value: 10, message: '10% discount applied!' },
        'WELCOME20': { type: 'percent', value: 20, message: '20% discount applied!' }
    };

    const applyDiscount = () => {
        const code = discountCode.toUpperCase().trim();
        if (discountCodes[code]) {
            setAppliedDiscount(discountCodes[code].value);
            setDiscountMsg({ text: discountCodes[code].message, type: 'success' });
        } else if (code) {
            setAppliedDiscount(0);
            setDiscountMsg({ text: 'Invalid discount code', type: 'error' });
        }
    };

    if (cartItems.length === 0) {
        return (
            <main className="container section" style={{ padding: '120px 5% 80px', minHeight: '60vh' }}>
                <h1 style={{ marginBottom: '2rem' }}>Shopping Cart</h1>
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1" style={{ margin: '0 auto 2rem' }}>
                        <path d="M9 2L6 6H18L15 2M7 6v14a2 2 0 002 2h6a2 2 0 002-2V6"></path>
                    </svg>
                    <h2 style={{ marginBottom: '1rem' }}>Your cart is empty</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Add some items to get started!</p>
                    <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="container section" style={{ padding: '120px 5% 80px', minHeight: '60vh' }}>
            <h1 style={{ marginBottom: '2rem' }}>Shopping Cart</h1>

            <div id="cartContent" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '3rem' }}>
                <div>
                    {cartItems.map((item, index) => (
                        <div key={`${item.id}-${item.size}-${item.color?.name}`} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item__image" />
                            <div className="cart-item__details">
                                <h3 className="cart-item__name">{item.name}</h3>
                                <p className="cart-item__meta">
                                    {item.size && `Size: ${item.size} `}
                                    {item.color && `| Color: ${item.color.name}`}
                                </p>
                                <p className="cart-item__price">{formatPrice(item.price)}</p>
                            </div>
                            <div className="cart-item__quantity">
                                <button onClick={() => updateQuantity(index, item.quantity - 1)} className="btn-sm">-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(index, item.quantity + 1)} className="btn-sm">+</button>
                            </div>
                            <div className="cart-item__subtotal">
                                {formatPrice(item.price * item.quantity)}
                            </div>
                            <button onClick={() => removeFromCart(index)} className="cart-item__remove">×</button>
                        </div>
                    ))}
                </div>

                <div style={{ height: 'fit-content', position: 'sticky', top: '100px' }}>
                    <div style={{ background: 'var(--secondary-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                            <span>Subtotal</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>

                        {appliedDiscount > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#28a745' }}>
                                <span>Discount ({appliedDiscount}%)</span>
                                <span>-{formatPrice(discountAmount)}</span>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                        </div>

                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>Total</span>
                                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-red)' }}>{formatPrice(finalTotal)}</span>
                            </div>

                            <Link to="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%', marginBottom: '1rem', display: 'block', textAlign: 'center' }}>
                                Proceed to Checkout
                            </Link>
                            <Link to="/shop" className="btn btn-secondary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>Continue Shopping</Link>
                        </div>

                        {/* DISCOUNT CODE */}
                        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Discount Code</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    placeholder="Enter code"
                                    className="form-input"
                                    style={{ flex: 1 }}
                                    value={discountCode}
                                    onChange={(e) => setDiscountCode(e.target.value)}
                                />
                                <button onClick={applyDiscount} className="btn btn-outline">Apply</button>
                            </div>
                            {discountMsg.text && (
                                <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: discountMsg.type === 'success' ? '#28a745' : 'var(--accent-red)' }}>
                                    {discountMsg.text}
                                </p>
                            )}
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        <p style={{ marginBottom: '1rem' }}>🔒 Secure Checkout</p>
                        <p>✓ Free Returns ✓ Fast Shipping</p>
                    </div>
                </div>
            </div>

            <style>{`
                .cart-item {
                    display: grid;
                    grid-template-columns: 100px 1fr auto auto auto;
                    gap: 1.5rem;
                    align-items: center;
                    padding: 1.5rem;
                    background: var(--secondary-bg);
                    border-radius: 8px;
                    border: 1px solid var(--border-color);
                    margin-bottom: 1rem;
                }
                .cart-item__image { width: 100px; height: 100px; object-fit: cover; border-radius: 8px; }
                .cart-item__name { font-size: 1.125rem; margin-bottom: 0.25rem; }
                .cart-item__meta { font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.25rem; }
                .cart-item__price { color: var(--accent-red); font-weight: 700; }
                .cart-item__quantity { display: flex; align-items: center; gap: 1rem; }
                .cart-item__quantity button { width: 32px; height: 32px; background: var(--tertiary-bg); border: 1px solid var(--border-color); color: var(--text-primary); border-radius: 4px; cursor: pointer; transition: all 0.2s; }
                .cart-item__quantity button:hover { background: var(--accent-red); border-color: var(--accent-red); }
                .cart-item__subtotal { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); }
                .cart-item__remove { width: 32px; height: 32px; background: none; border: none; color: var(--text-muted); font-size: 2rem; cursor: pointer; transition: color 0.2s; }
                .cart-item__remove:hover { color: var(--accent-red); }
                
                @media (max-width: 768px) {
                    .cart-item { grid-template-columns: 80px 1fr; gap: 1rem; }
                    .cart-item__quantity, .cart-item__subtotal { grid-column: 2; }
                    .cart-item__remove { position: absolute; top: 10px; right: 10px; }
                    #cartContent { grid-template-columns: 1fr !important; }
                    #cartContent > div:last-child { position: static !important; }
                }
            `}</style>
        </main>
    );
};

export default CartPage;
