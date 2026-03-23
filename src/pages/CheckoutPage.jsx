import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { userInfo } = useAuth();
    const { formatPrice, getRawConverted } = useCurrency();

    const [address, setAddress] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Manual Bank Transfer');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const errorRef = useRef(null);

    // Order Totals Calculation
    const itemsPrice = getCartTotal();
    const shippingPrice = itemsPrice > 100 ? 0 : 9.99;
    const taxPrice = parseFloat((0.08 * itemsPrice).toFixed(2));
    const totalPrice = parseFloat((itemsPrice + shippingPrice + taxPrice).toFixed(2));

    useEffect(() => {
        if (!userInfo) {
            navigate('/login?redirect=checkout');
        } else if (cartItems.length === 0 && !orderPlaced) {
            navigate('/cart');
        }
    }, [userInfo, navigate, cartItems, orderPlaced]);

    useEffect(() => {
        if (error && errorRef.current) {
            errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [error]);

    const placeOrderHandler = async (e) => {
        e.preventDefault();

        // Validate WhatsApp BEFORE loading starts
        if (!whatsapp || whatsapp.length < 10) {
            setError('Please provide a valid WhatsApp number with country code');
            return;
        }

        try {
            setLoading(true);
            setOrderPlaced(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const orderData = {
                orderItems: cartItems.map(item => ({
                    product: item.id,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    qty: item.quantity,
                    size: item.size,
                    color: item.color
                })),
                shippingAddress: { address, city, postalCode, country, whatsapp },
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice
            };

            const { data } = await axios.post('/api/orders', orderData, config);

            // Clean Cart
            clearCart();

            // Redirect to Order Detail
            navigate(`/order/${data._id}`);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            setLoading(false);
        }
    };

    return (
        <main className="container section" style={{ padding: '120px 5% 80px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Secure Checkout</h1>

                {error && (
                    <div ref={errorRef} style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)', border: '1px solid var(--accent-red)', color: 'var(--accent-red)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
                        {error}
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>

                    {/* CHECKOUT FORM */}
                    <div>
                        <form onSubmit={placeOrderHandler}>

                            {/* SHIPPING INFO */}
                            <div style={{ background: 'var(--secondary-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
                                <h2 style={{ marginBottom: '1.5rem' }}>Shipping Information</h2>

                                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                    <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Full Name *</label>
                                    <input type="text" className="form-input" style={{ width: '100%' }} value={userInfo ? userInfo.name : ''} readOnly />
                                </div>

                                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                    <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Address *</label>
                                    <input type="text" className="form-input" style={{ width: '100%' }} required value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div className="form-group">
                                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>City *</label>
                                        <input type="text" className="form-input" style={{ width: '100%' }} required value={city} onChange={(e) => setCity(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Postal Code *</label>
                                        <input type="text" className="form-input" style={{ width: '100%' }} required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                    <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Country *</label>
                                    <input type="text" className="form-input" style={{ width: '100%' }} required value={country} onChange={(e) => setCountry(e.target.value)} />
                                </div>

                                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                    <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>WhatsApp Number *</label>
                                    <PhoneInput
                                        country={'us'}
                                        value={whatsapp}
                                        onChange={phone => setWhatsapp(phone)}
                                        inputStyle={{ 
                                            width: '100%', 
                                            height: '45px', 
                                            fontSize: '1rem', 
                                            borderRadius: '8px', 
                                            border: '1px solid var(--border-color)', 
                                            background: 'var(--input-bg)', 
                                            color: 'var(--text-primary)' 
                                        }}
                                        buttonStyle={{ 
                                            borderRadius: '8px 0 0 8px', 
                                            border: '1px solid var(--border-color)', 
                                            background: 'var(--secondary-bg)' 
                                        }}
                                        dropdownStyle={{ 
                                            background: 'var(--secondary-bg)', 
                                            color: 'var(--text-primary)' 
                                        }}
                                        containerStyle={{
                                            width: '100%'
                                        }}
                                        enableSearch={true}
                                        disableSearchIcon={true}
                                        searchPlaceholder="Search country..."
                                    />
                                </div>
                            </div>

                            {/* PAYMENT METHOD */}
                            <div style={{ background: 'var(--secondary-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
                                <h2 style={{ marginBottom: '1.5rem' }}>Payment Method</h2>

                                <div className="form-group" style={{ marginBottom: '1rem' }}>
                                    <input type="radio" id="manual" name="paymentMethod" value="Manual Bank Transfer" checked={paymentMethod === 'Manual Bank Transfer'} onChange={(e) => setPaymentMethod(e.target.value)} />
                                    <label htmlFor="manual" style={{ marginLeft: '0.5rem', fontWeight: 600 }}>Manual Bank Transfer (Payoneer / Wise)</label>
                                </div>
                                <div className="form-group">
                                    <input type="radio" id="whatsapp" name="paymentMethod" value="WhatsApp Payment" checked={paymentMethod === 'WhatsApp Payment'} onChange={(e) => setPaymentMethod(e.target.value)} />
                                    <label htmlFor="whatsapp" style={{ marginLeft: '0.5rem', fontWeight: 600 }}>Contact via WhatsApp to Pay</label>
                                </div>

                                {paymentMethod === 'Manual Bank Transfer' && (
                                    <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', borderLeft: '4px solid var(--accent-red)' }}>
                                        <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>📋 Payment Instructions:</p>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                            Please place your order first. After clicking "Complete Order", our team will contact you on your WhatsApp Number with the bank/transfer details. You can then share the payment screenshot to confirm your shipment.
                                        </p>
                                    </div>
                                )}

                                {paymentMethod === 'WhatsApp Payment' && (
                                    <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(37, 211, 102, 0.1)', borderRadius: '8px', borderLeft: '4px solid #25D366' }}>
                                        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#25D366' }}>💬 WhatsApp Checkout:</p>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                            Select this if you want to finalize the payment and shipping costs directly with us over a call or chat. We will provide an invoice directly on your phone.
                                        </p>
                                    </div>
                                )}

                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '1.5rem' }}>
                                    ✅ Your order will be saved as "Pending" until the payment is confirmed.
                                </p>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                                {loading ? 'Processing...' : 'Complete Order'}
                            </button>
                        </form>
                    </div>

                    {/* ORDER SUMMARY */}
                    <div style={{ height: 'fit-content', position: 'sticky', top: '100px' }}>
                        <div style={{ background: 'var(--secondary-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>

                            <div style={{ marginBottom: '1.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                                {cartItems.map((item, index) => (
                                    <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                                        <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>{item.name}</h4>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.size && `${item.size} `} {item.color && `| ${item.color.name}`}</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qty: {item.quantity}</p>
                                        </div>
                                        <div style={{ fontWeight: 700, color: 'var(--accent-red)' }}>
                                            {formatPrice(item.price * item.quantity)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
                                    <span>Subtotal</span>
                                    <span>{formatPrice(itemsPrice)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
                                    <span>Shipping</span>
                                    <span>{shippingPrice === 0 ? 'FREE' : formatPrice(shippingPrice)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
                                    <span>Tax (Est.)</span>
                                    <span>{formatPrice(taxPrice)}</span>
                                </div>
                                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>Total</span>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-red)' }}>{formatPrice(totalPrice)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <style>{`
                @media (max-width: 1024px) {
                    div[style*="grid-template-columns: 1.5fr 1fr"] {
                        grid-template-columns: 1fr !important;
                    }
                    div[style*="position: sticky"] {
                        position: static !important;
                    }
                }
            `}</style>
        </main>
    );
};

export default CheckoutPage;
