import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(() => {
        try {
            const saved = localStorage.getItem('userInfo');
            return saved ? JSON.parse(saved) : null;
        } catch (error) {
            console.error('Failed to parse user info', error);
            localStorage.removeItem('userInfo');
            return null;
        }
    });

    useEffect(() => {
        if (userInfo) {
            // SECURITY FIX: Only store non-sensitive data in localStorage
            localStorage.setItem('userInfo', JSON.stringify({
                isAdmin: userInfo.isAdmin,
                name: userInfo.name || 'User'
            }));
        } else {
            localStorage.removeItem('userInfo');
        }
    }, [userInfo]);

    const login = async (email, password) => {
        try {
            const res = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            setUserInfo(data);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const register = async (name, email, password) => {
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            setUserInfo(data);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/users/logout', { method: 'POST', credentials: 'include' });
        } catch (error) {
            console.error(error);
        }
        setUserInfo(null);
    };

    return (
        <AuthContext.Provider value={{ userInfo, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
