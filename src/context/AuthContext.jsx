import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

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
            const { data } = await axios.post('/api/users/login', { email, password });

            setUserInfo(data);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await axios.post('/api/users', { name, email, password });

            setUserInfo(data);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Registration failed' };
        }
    };

    const logout = async () => {
        try {
            await axios.post('/api/users/logout');
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
