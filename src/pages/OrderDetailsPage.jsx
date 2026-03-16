import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';

const OrderDetailsPage = () => {
    const { id: orderId } = useParams();
    const { userInfo } = useAuth();
    const { formatPrice } = useCurrency();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const config = {
                    headers: {}
                };
                const { data } = await axios.get(`/api/orders/${orderId}`, config);
                setOrder(data);
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        if (userInfo) {
            fetchOrder();
        }
    }, [orderId, userInfo]);

    if (loading) return <main style={{ padding: '120px 5%' }}><h2>Loading Order...</h2></main>;
    if (error) return <main style={{ padding: '120px 5%' }}><h2 style={{ color: 'var(--accent-red)' }}>{error}</h2></main>;

    return (
        <main className="container section" style={{ padding: '120px 5% 80px', minHeight: '80vh' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1>Order #{order._id.substring(18, 24).toUpperCase()}</h1>
                    <Link to="/shop" className="btn btn-outline">Keep Shopping</Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>

                    {/* ORDER DETAILS LEFT */}
                    <div>
                        <div style={{ background: 'var(--secondary-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
                            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>🚚</span> Shipping Details
                            </h2>
                            <p><strong>Name:</strong> {order.user.name}</p>
                            <p><strong>Email:</strong> <a href={`mailto:${order.user.email}`} style={{ color: 'var(--text-primary)' }}>{order.user.email}</a></p>
                            <p style={{ marginTop: '0.5rem' }}>
                                <strong>Address:</strong><br />
                                {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>

                            <div style={{ marginTop: '1rem' }}>
                                {order.isDelivered ? (
                                    <div style={{ background: 'rgba(40, 167, 69, 0.1)', color: '#28a745', padding: '1rem', borderRadius: '4px', border: '1px solid #28a745' }}>Delivered on {order.deliveredAt.substring(0, 10)}</div>
                                ) : (
                                    <div style={{ background: 'rgba(255, 193, 7, 0.1)', color: '#ffc107', padding: '1rem', borderRadius: '4px', border: '1px solid #ffc107' }}>Not Delivered</div>
                                )}
                            </div>
                        </div>

                        <div style={{ background: 'var(--secondary-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
                            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>💳</span> Payment Method
                            </h2>
                            <p><strong>Method:</strong> {order.paymentMethod}</p>
                            <div style={{ marginTop: '1rem' }}>
                                {order.isPaid ? (
                                    <div style={{ background: 'rgba(40, 167, 69, 0.1)', color: '#28a745', padding: '1rem', borderRadius: '4px', border: '1px solid #28a745' }}>Paid on {order.paidAt.substring(0, 10)}</div>
                                ) : (
                                    <div style={{ background: 'rgba(235, 0, 27, 0.1)', color: 'var(--accent-red)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--accent-red)' }}>Not Paid (Demo Order)</div>
                                )}
                            </div>
                        </div>

                        <div style={{ background: 'var(--secondary-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                            <h2 style={{ marginBottom: '1.5rem' }}>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <p>Order is empty</p>
                            ) : (
                                <div>
                                    {order.orderItems.map((item, index) => (
                                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: index !== order.orderItems.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                                            <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                                            <Link to={`/product/${item.product}`} style={{ flex: 1, textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600 }}>
                                                {item.name}
                                            </Link>
                                            <div style={{ color: 'var(--text-secondary)' }}>
                                                {item.qty} x {formatPrice(item.price)} = <strong>{formatPrice(item.qty * item.price)}</strong>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ORDER SUMMARY RIGHT */}
                    <div style={{ height: 'fit-content', position: 'sticky', top: '100px' }}>
                        <div style={{ background: 'var(--secondary-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                            <h2 style={{ marginBottom: '1.5rem' }}>Order Summary</h2>

                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
                                    <span>Items</span>
                                    <span>{formatPrice(order.itemsPrice || order.totalPrice - order.shippingPrice - order.taxPrice)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
                                    <span>Shipping</span>
                                    <span>{formatPrice(order.shippingPrice)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
                                    <span>Tax</span>
                                    <span>{formatPrice(order.taxPrice)}</span>
                                </div>
                                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>Total</span>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-red)' }}>{formatPrice(order.totalPrice)}</span>
                                    </div>
                                </div>

                                {!order.isPaid && (
                                    <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', textAlign: 'center' }}>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                            Payment gateway integration pending.<br />This order is safely stored in database.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default OrderDetailsPage;
