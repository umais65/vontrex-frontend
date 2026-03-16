import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const errorRef = useRef(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect') || '/';

    useEffect(() => {
        if (error && errorRef.current) {
            errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [error]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(null);

        const result = await login(email, password);
        if (result.success) {
            navigate(`/${redirect === '/' ? '' : redirect}`);
        } else {
            setError(result.error);
        }
    };

    return (
        <main className="container section" style={{ padding: '120px 5% 80px', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ background: 'var(--secondary-bg)', padding: '3rem', borderRadius: '12px', border: '1px solid var(--border-color)', width: '100%', maxWidth: '450px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Login to access your gear & orders.</p>
                </div>

                {error && <div ref={errorRef} style={{ background: 'rgba(230, 57, 70, 0.1)', color: 'var(--accent-red)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid var(--accent-red)' }}>{error}</div>}

                <form onSubmit={submitHandler}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--tertiary-bg)', color: 'var(--text-primary)' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-input"
                                style={{ width: '100%', padding: '0.75rem', paddingRight: '2.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--tertiary-bg)', color: 'var(--text-primary)' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '0.75rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    padding: '0'
                                }}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginBottom: '1.5rem' }}>
                        Sign In
                    </button>
                </form>

                <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--accent-red)', fontWeight: 600, textDecoration: 'none' }}>Register Here</Link>
                    <br />
                    <Link to="/forgot-password" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'underline', marginTop: '0.5rem', display: 'inline-block' }}>Forgot Password?</Link>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;
