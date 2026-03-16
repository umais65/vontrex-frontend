import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';

const AdminOrdersPage = () => {
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const { formatPrice } = useCurrency();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
            return;
        }
        fetchOrders();
    }, [userInfo, navigate]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {},
            };
            const { data } = await axios.get('/api/orders', config);
            setOrders(data);
            setLoading(false);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            setLoading(false);
        }
    };

    const deliverHandler = async (orderId) => {
        if (window.confirm('Are you sure you want to mark this order as delivered?')) {
            try {
                setActionLoading(true);
                const config = {
                    headers: {},
                };
                await axios.put(`/api/orders/${orderId}/deliver`, {}, config);
                setActionLoading(false);
                fetchOrders(); // Refresh orders after update
            } catch (err) {
                alert(err.response && err.response.data.message ? err.response.data.message : err.message);
                setActionLoading(false);
            }
        }
    };

    return (
        <main className="admin-dashboard">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-sidebar__header">
                    <h2>VONTREX Admin</h2>
                </div>
                <nav className="admin-sidebar__nav">
                    <ul>
                        <li><Link to="/admin/dashboard" className="admin-nav-link">Dashboard</Link></li>
                        <li><Link to="/admin/productlist" className="admin-nav-link">Products</Link></li>
                        <li><Link to="/admin/orders" className="admin-nav-link admin-nav-link--active">Orders</Link></li>
                        <li><Link to="/admin/users" className="admin-nav-link">Users</Link></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <section className="admin-content" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1>Manage Orders</h1>
                </div>

                {loading ? (
                    <p>Loading orders...</p>
                ) : error ? (
                    <div style={{ color: 'var(--accent-red)' }}>{error}</div>
                ) : (
                    <div style={{ overflowX: 'auto', background: 'var(--secondary-bg)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ background: 'var(--tertiary-bg)', textAlign: 'left' }}>
                                <tr>
                                    <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>ID</th>
                                    <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>USER</th>
                                    <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>DATE</th>
                                    <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>TOTAL</th>
                                    <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>PAID</th>
                                    <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>DELIVERED</th>
                                    <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>{order._id.substring(18, 24).toUpperCase()}</td>
                                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>{order.user && order.user.name}</td>
                                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>{order.createdAt.substring(0, 10)}</td>
                                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>{formatPrice(order.totalPrice)}</td>
                                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                                            {order.isPaid ? (
                                                <span style={{ color: '#28a745' }}>{order.paidAt.substring(0, 10)}</span>
                                            ) : (
                                                <span style={{ color: 'var(--accent-red)' }}>No</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                                            {order.isDelivered ? (
                                                <span style={{ color: '#28a745' }}>{order.deliveredAt.substring(0, 10)}</span>
                                            ) : (
                                                <span style={{ color: 'var(--accent-red)' }}>No</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                                            <Link to={`/order/${order._id}`} className="action-btn action-edit">Details</Link>

                                            {!order.isDelivered && (
                                                <button
                                                    className="action-btn action-deliver"
                                                    onClick={() => deliverHandler(order._id)}
                                                    disabled={actionLoading}
                                                >
                                                    {actionLoading ? 'Saving...' : 'Mark Delivered'}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <style>{`
                    .action-btn { padding: 0.4rem 0.8rem; font-size: 0.875rem; font-weight: 600; border-radius: 6px; cursor: pointer; transition: all 0.3s ease; text-decoration: none; display: inline-block; text-align: center; }
                    .action-edit { background: rgba(255, 255, 255, 0.05); color: var(--text-primary); border: 1px solid var(--border-color); }
                    .action-edit:hover { background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.3); }
                    .action-deliver { background: rgba(40, 167, 69, 0.1); color: #28a745; border: 1px solid rgba(40, 167, 69, 0.3); }
                    .action-deliver:hover { background: #28a745; color: white; border-color: #28a745; }
                    .action-deliver:disabled { opacity: 0.5; cursor: not-allowed; hover: none; }
                `}</style>
            </section>
        </main>
    );
};

export default AdminOrdersPage;
