import React, { useState } from 'react';
import '../assets/css/pages.css';

const OrderTrackingPage = () => {
    const [formData, setFormData] = useState({ orderId: '', email: '' });
    const [trackingStatus, setTrackingStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTrackOrder = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate an API call latency
        setTimeout(() => {
            setLoading(false);
            // Mock response
            if (formData.orderId === '12345') {
                setTrackingStatus({
                    status: 'Shipped',
                    estimatedDelivery: 'October 25, 2023',
                    carrier: 'FedEx',
                    trackingNumber: 'FDX9876543210',
                    items: [
                        { name: 'Pro Sparring Gloves 16oz', qty: 1 }
                    ]
                });
            } else {
                setTrackingStatus({
                    error: 'Order not found. Please check your Order ID and Email address.'
                });
            }
        }, 1500);
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Track Your Order</h1>
                <p>Enter your Order ID and Email address below to check the status of your shipment.</p>
            </div>

            <div className="page-content contact-content" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="contact-form-container" style={{ width: '100%' }}>
                    <form className="contact-form" onSubmit={handleTrackOrder}>
                        <div className="form-group">
                            <label htmlFor="orderId">Order ID (e.g., 12345)</label>
                            <input
                                type="text"
                                id="orderId"
                                name="orderId"
                                required
                                value={formData.orderId}
                                onChange={handleChange}
                                placeholder="Found in your confirmation email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="billing@email.com"
                            />
                        </div>
                        <button type="submit" className="btn-primary w-100" disabled={loading}>
                            {loading ? 'Tracking...' : 'Track Order'}
                        </button>
                    </form>

                    {trackingStatus && (
                        <div className="tracking-result" style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--bg-light)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                            {trackingStatus.error ? (
                                <div style={{ color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <i className="fas fa-exclamation-circle"></i>
                                    <p>{trackingStatus.error}</p>
                                </div>
                            ) : (
                                <div>
                                    <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                                        Order Status: <span style={{ color: 'var(--success-color)' }}>{trackingStatus.status}</span>
                                    </h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                        <div>
                                            <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Estimated Delivery</p>
                                            <p style={{ fontWeight: '600' }}>{trackingStatus.estimatedDelivery}</p>
                                        </div>
                                        <div>
                                            <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Carrier</p>
                                            <p style={{ fontWeight: '600' }}>{trackingStatus.carrier}</p>
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Tracking Number</p>
                                        <p style={{ fontWeight: '600', fontFamily: 'monospace', fontSize: '1.1rem' }}>{trackingStatus.trackingNumber}</p>
                                    </div>

                                    <div>
                                        <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Items</h4>
                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                            {trackingStatus.items.map((item, idx) => (
                                                <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderTop: '1px solid var(--border-color)' }}>
                                                    <span>{item.name}</span>
                                                    <span className="text-secondary">x{item.qty}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderTrackingPage;
