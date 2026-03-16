import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';

const AdminDashboardPage = () => {
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const { formatPrice } = useCurrency();

    const [stats, setStats] = useState({
        totalSales: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
            return;
        }

        const fetchStats = async () => {
            try {
                const config = {
                    headers: {},
                };

                // Fetch all data points concurrently
                const [ordersRes, productsRes, usersRes] = await Promise.all([
                    axios.get('/api/orders', config),
                    axios.get('/api/products'),
                    axios.get('/api/users', config)
                ]);

                const orders = ordersRes.data;
                const products = productsRes.data;
                const users = usersRes.data;

                // Calculate metrics
                const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

                setStats({
                    totalSales,
                    totalOrders: orders.length,
                    totalProducts: products.length,
                    totalUsers: users.length
                });

                setLoading(false);
            } catch (err) {
                console.error("Failed to load dashboard stats", err);
                setLoading(false);
            }
        };

        fetchStats();
    }, [userInfo, navigate]);

    // Reusable Stat Card Component
    const StatCard = ({ title, value, icon, gradient }) => (
        <div style={{
            background: 'var(--secondary-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: gradient }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>{title}</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)' }}>{value}</div>
                </div>
                <div style={{ fontSize: '3rem', opacity: 0.2 }}>{icon}</div>
            </div>
        </div>
    );

    return (
        <main className="admin-dashboard">
            <aside className="admin-sidebar">
                <div className="admin-sidebar__header">
                    <h2>VONTREX Admin</h2>
                </div>
                <nav className="admin-sidebar__nav">
                    <ul>
                        <li><Link to="/admin/dashboard" className="admin-nav-link admin-nav-link--active">Dashboard</Link></li>
                        <li><Link to="/admin/productlist" className="admin-nav-link">Products</Link></li>
                        <li><Link to="/admin/orders" className="admin-nav-link">Orders</Link></li>
                        <li><Link to="/admin/users" className="admin-nav-link">Users</Link></li>
                    </ul>
                </nav>
            </aside>

            <section className="admin-content" style={{ padding: '2.5rem' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome back, {userInfo.name.split(' ')[0]}!</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Here is what's happening in your store today.</p>
                </div>

                {loading ? (
                    <h2>Loading metrics...</h2>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                        <StatCard title="Total Revenue" value={formatPrice(stats.totalSales)} icon="💰" gradient="linear-gradient(to bottom, #28a745, #20c997)" />
                        <StatCard title="Total Orders" value={stats.totalOrders} icon="📦" gradient="linear-gradient(to bottom, #007bff, #00c6ff)" />
                        <StatCard title="Total Products" value={stats.totalProducts} icon="🥊" gradient="linear-gradient(to bottom, var(--accent-red), #ff4a4a)" />
                        <StatCard title="Total Users" value={stats.totalUsers} icon="👥" gradient="linear-gradient(to bottom, #6f42c1, #a88be8)" />
                    </div>
                )}

            </section>
        </main>
    );
};

export default AdminDashboardPage;
