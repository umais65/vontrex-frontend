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

import { HelmetProvider } from 'react-helmet-async'

import { CurrencyProvider } from './context/CurrencyContext'
import { WishlistProvider } from './context/WishlistContext'

// SECURITY FIX (VULN-H1): Ensure cookies are sent with every axios request
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <CurrencyProvider>
          <WishlistProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </WishlistProvider>
        </CurrencyProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)
