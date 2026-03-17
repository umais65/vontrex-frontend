import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminRoute = () => {
    const { userInfo } = useAuth();
    const [verified, setVerified] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        // SECURITY FIX (VULN-H3): Server-side admin verification
        // localStorage se isAdmin read karna unsafe hai — attacker manually set kar sakta hai
        const verifyAdmin = async () => {
            try {
                const { data } = await axios.get('/api/users/profile');
                setVerified(data.isAdmin === true);
            } catch {
                setVerified(false);
            }
            setChecking(false);
        };

        if (userInfo && userInfo.isAdmin) {
            verifyAdmin();
        } else {
            setChecking(false);
            setVerified(false);
        }
    }, [userInfo]);

    if (checking) {
        return <div style={{ padding: '120px 5%', textAlign: 'center' }}>Verifying admin access...</div>;
    }

    return verified ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;
