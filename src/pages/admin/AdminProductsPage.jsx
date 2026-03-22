import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';

const AdminProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userInfo } = useAuth();
    const { formatPrice } = useCurrency();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/products');
            if (!res.ok) throw new Error('Error fetching products');
            const data = await res.json();
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const res = await fetch(`/api/products/${id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'Error deleting product');
                }
                fetchProducts();
            } catch (err) {
                alert(err.message);
            }
        }
    };

    const toggleFeaturedHandler = async (id) => {
        try {
            const res = await fetch(`/api/products/${id}/featured`, {
                method: 'PUT',
                credentials: 'include'
            });
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || 'Error toggling featured status');
            }
            fetchProducts();
        } catch (err) {
            alert(err.message);
        }
    };

    const createProductHandler = async () => {
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                credentials: 'include'
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Error creating product');
            navigate(`/admin/product/${data._id}/edit`);
        } catch (err) {
            alert(err.message);
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
                        <li><Link to="/admin/productlist" className="admin-nav-link admin-nav-link--active">Products</Link></li>
                        <li><Link to="/admin/orders" className="admin-nav-link">Orders</Link></li>
                        <li><Link to="/admin/users" className="admin-nav-link">Users</Link></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <section className="admin-content" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1>Products Analysis</h1>
                    <button className="btn btn-primary" onClick={createProductHandler}>
                        + Create Product
                    </button>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem 0' }}><h2>Loading inventory...</h2></div>
                ) : error ? (
                    <div style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)', border: '1px solid var(--accent-red)', color: 'var(--accent-red)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
                        {error}
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>STOCK</th>
                                    <th>FEATURED</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td style={{ color: 'var(--text-muted)' }}>{product._id.substring(18, 24)}</td>
                                        <td style={{ fontWeight: 600 }}>{product.name}</td>
                                        <td>{formatPrice(product.price)}</td>
                                        <td>{product.category}</td>
                                        <td>{product.countInStock}</td>
                                        <td>
                                            <button
                                                className={`action-btn ${product.isFeatured ? 'action-featured-active' : 'action-featured'}`}
                                                onClick={() => toggleFeaturedHandler(product._id)}
                                                title={product.isFeatured ? 'Remove from featured' : 'Add to featured'}
                                            >
                                                {product.isFeatured ? '⭐' : '☆'}
                                            </button>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.8rem' }}>
                                                <Link to={`/admin/product/${product._id}/edit`} className="action-btn action-edit">
                                                    Edit
                                                </Link>
                                                <button className="action-btn action-delete" onClick={() => deleteHandler(product._id)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <style>{`
                .admin-table {
                    width: 100%;
                    border-collapse: collapse;
                    background: var(--secondary-bg);
                    border-radius: 8px;
                    overflow: hidden;
                    border: 1px solid var(--border-color);
                }
                .admin-table th {
                    background: var(--tertiary-bg);
                    padding: 1.25rem 1rem;
                    text-align: left;
                    font-size: 0.875rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: var(--text-muted);
                    border-bottom: 1px solid var(--border-color);
                }
                .admin-table td {
                    padding: 1.25rem 1rem;
                    border-bottom: 1px solid var(--border-color);
                    color: var(--text-secondary);
                }
                .admin-table tr:last-child td { border-bottom: none; }
                .admin-table tr:hover { background: rgba(255, 255, 255, 0.02); }
                .action-btn { padding: 0.4rem 0.8rem; font-size: 0.875rem; font-weight: 600; border-radius: 6px; cursor: pointer; transition: all 0.3s ease; text-decoration: none; display: inline-block; text-align: center; }
                .action-edit { background: rgba(255, 255, 255, 0.05); color: var(--text-primary); border: 1px solid var(--border-color); }
                .action-edit:hover { background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.3); }
                .action-delete { background: rgba(220, 53, 69, 0.1); color: var(--accent-red); border: 1px solid rgba(220, 53, 69, 0.3); }
                .action-delete:hover { background: var(--accent-red); color: white; border-color: var(--accent-red); }
                .action-featured { background: rgba(255, 255, 255, 0.05); color: var(--text-muted); border: 1px solid var(--border-color); font-size: 1.2rem; line-height: 1; }
                .action-featured:hover { background: rgba(255, 193, 7, 0.1); border-color: rgba(255, 193, 7, 0.4); color: #ffc107; }
                .action-featured-active { background: rgba(255, 193, 7, 0.15); color: #ffc107; border: 1px solid rgba(255, 193, 7, 0.4); font-size: 1.2rem; line-height: 1; }
                .action-featured-active:hover { background: rgba(255, 193, 7, 0.25); border-color: rgba(255, 193, 7, 0.6); }
            `}</style>
            </section>
        </main>
    );
};

export default AdminProductsPage;
