import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const errorRef = useRef(null);

    useEffect(() => {
        if (error && errorRef.current) {
            errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [error]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await axios.post(`/api/auth/reset-password/${token}`, { password });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 3000);
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
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Reset Your Password</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        Choose a strong new password for your account.
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
                        <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Password Reset Successfully!</p>
                        <p style={{ fontSize: '0.875rem' }}>Redirecting you to login in 3 seconds...</p>
                        <Link to="/login" style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--accent-red)', fontWeight: 600 }}>Go to Login →</Link>
                    </div>
                ) : (
                    <form onSubmit={submitHandler}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>New Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-input"
                                    style={{ width: '100%', padding: '0.75rem', paddingRight: '2.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--tertiary-bg)', color: 'var(--text-primary)' }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Min 8 chars, 1 uppercase, 1 number, 1 symbol"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Confirm Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-input"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--tertiary-bg)', color: 'var(--text-primary)' }}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Repeat your new password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            style={{ width: '100%', marginBottom: '1.5rem' }}
                            disabled={loading}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                )}

                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                    <Link to="/forgot-password" style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textDecoration: 'underline' }}>
                        Request a new link
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default ResetPasswordPage;
