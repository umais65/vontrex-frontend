import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { userInfo, logout } = useAuth();
    const { formatPrice } = useCurrency();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const errorRef = useRef(null);

    useEffect(() => {
        if (error && errorRef.current) {
            errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [error]);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login?redirect=profile');
            return;
        }

        const fetchMyOrders = async () => {
            try {
                const config = {
                    headers: {},
                };
                const { data } = await axios.get('/api/orders/myorders', config);
                setOrders(data);
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        fetchMyOrders();
    }, [userInfo, navigate]);

    const logoutHandler = () => {
        logout();
        navigate('/');
    };

    return (
        <main className="container section" style={{ padding: '120px 5% 80px', minHeight: '80vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '2rem' }}>My Profile</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: '3rem' }}>

                    {/* PROFILE DETAILS (LEFT COL) */}
                    <div>
                        <div style={{ background: 'var(--secondary-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
                            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Account Info</h2>
                            {userInfo && (
                                <>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Name</p>
                                        <p style={{ fontWeight: 600, fontSize: '1.125rem' }}>{userInfo.name}</p>
                                    </div>
                                    <div style={{ marginBottom: '2rem' }}>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Email</p>
                                        <p style={{ fontWeight: 600 }}>{userInfo.email}</p>
                                    </div>
                                </>
                            )}
                            <button onClick={logoutHandler} className="btn btn-outline" style={{ width: '100%' }}>Logout</button>
                        </div>
                    </div>

                    {/* ORDER HISTORY (RIGHT COL) */}
                    <div>
                        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Order History</h2>

                        {loading ? (
                            <p>Loading orders...</p>
                        ) : error ? (
                            <div ref={errorRef} style={{ color: 'var(--accent-red)' }}>{error}</div>
                        ) : orders.length === 0 ? (
                            <div style={{ background: 'var(--secondary-bg)', padding: '3rem', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                                <h3 style={{ marginBottom: '1rem' }}>No orders found</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>You haven't placed any orders yet.</p>
                                <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table className="table" style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--secondary-bg)', borderRadius: '12px', overflow: 'hidden' }}>
                                    <thead style={{ background: 'var(--tertiary-bg)', textAlign: 'left' }}>
                                        <tr>
                                            <th style={{ padding: '1rem' }}>ID</th>
                                            <th style={{ padding: '1rem' }}>Date</th>
                                            <th style={{ padding: '1rem' }}>Total</th>
                                            <th style={{ padding: '1rem' }}>Paid</th>
                                            <th style={{ padding: '1rem' }}>Delivered</th>
                                            <th style={{ padding: '1rem' }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{order._id.substring(18, 24).toUpperCase()}</td>
                                                <td style={{ padding: '1rem' }}>{order.createdAt.substring(0, 10)}</td>
                                                <td style={{ padding: '1rem', fontWeight: 600 }}>{formatPrice(order.totalPrice)}</td>
                                                <td style={{ padding: '1rem' }}>
                                                    {order.isPaid ? (
                                                        <span style={{ color: '#28a745' }}>{order.paidAt.substring(0, 10)}</span>
                                                    ) : (
                                                        <span style={{ color: 'var(--accent-red)' }}>No</span>
                                                    )}
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    {order.isDelivered ? (
                                                        <span style={{ color: '#28a745' }}>{order.deliveredAt.substring(0, 10)}</span>
                                                    ) : (
                                                        <span style={{ color: 'var(--accent-red)' }}>No</span>
                                                    )}
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <Link to={`/order/${order._id}`} className="btn-sm btn-outline" style={{ display: 'inline-block', textDecoration: 'none' }}>Details</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    div[style*="grid-template-columns: minmax(250px, 1fr) 3fr"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </main>
    );
};

export default ProfilePage;
