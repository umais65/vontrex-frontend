import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

import './assets/css/main.css'
import './assets/css/components.css'
import './assets/css/pages.css'
import './index.css'
import App from './App.jsx'

import { CurrencyProvider } from './context/CurrencyContext'
import { WishlistProvider } from './context/WishlistContext'

// SECURITY FIX (VULN-H1): Ensure cookies are sent with every axios request
axios.defaults.withCredentials = true;

// DEPLOYMENT: Production mein Heroku backend URL use karo
// import.meta.env.PROD — Vite automatically true karta hai production build mein
// Dev mein: empty string (Vite proxy /api → localhost:5000 handle karta hai)
axios.defaults.baseURL = import.meta.env.PROD
  ? (import.meta.env.VITE_API_URL || 'https://vontrex-backend-03a967e8726a.herokuapp.com')
  : '';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CurrencyProvider>
        <WishlistProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </WishlistProvider>
      </CurrencyProvider>
    </AuthProvider>
  </StrictMode>,
)
