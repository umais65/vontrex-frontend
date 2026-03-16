import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [devPreview, setDevPreview] = useState(null);
    const errorRef = useRef(null);

    useEffect(() => {
        if (error && errorRef.current) {
            errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [error]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            const { data } = await axios.post('/api/auth/forgot-password', { email });
            setSuccess(data.message);
            if (data.emailPreviewUrl) setDevPreview(data.emailPreviewUrl);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="container section" style={{ padding: '120px 5% 80px', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ background: 'var(--secondary-bg)', padding: '3rem', borderRadius: '12px', border: '1px solid var(--border-color)', width: '100%', maxWidth: '450px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔑</div>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Forgot Password?</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                {error && (
                    <div ref={errorRef} style={{ background: 'rgba(230, 57, 70, 0.1)', color: 'var(--accent-red)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid var(--accent-red)' }}>
                        {error}
                    </div>
                )}

                {success ? (
                    <div style={{ background: 'rgba(40, 167, 69, 0.1)', color: '#28a745', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #28a745' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
                        <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Check your email!</p>
                        <p style={{ fontSize: '0.875rem' }}>{success}</p>
                        {devPreview && (
                            <a href={devPreview} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'underline' }}>
                                [Dev] Preview Email →
                            </a>
                        )}
                    </div>
                ) : (
                    <form onSubmit={submitHandler}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email Address</label>
                            <input
                                type="email"
                                className="form-input"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--tertiary-bg)', color: 'var(--text-primary)' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            style={{ width: '100%', marginBottom: '1.5rem' }}
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                )}

                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                    <Link to="/login" style={{ color: 'var(--accent-red)', fontWeight: 600, textDecoration: 'none' }}>
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default ForgotPasswordPage;
