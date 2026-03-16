import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    // Load cart from localStorage or default to empty array
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('boxingCart');
        return saved ? JSON.parse(saved) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('boxingCart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, size, color, quantity = 1) => {
        setCartItems(prevItems => {
            const existingIndex = prevItems.findIndex(
                item => item.id === product._id && item.size === size && item.color?.name === color?.name
            );

            if (existingIndex !== -1) {
                // Item exists, update quantity
                const newItems = [...prevItems];
                newItems[existingIndex].quantity += quantity;
                return newItems;
            } else {
                // New item
                return [...prevItems, {
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    size,
                    color,
                    quantity
                }];
            }
        });

        // Custom simple DOM notification like the original vanilla JS
        showNotification(`${product.name} added to cart!`);
    };

    const removeFromCart = (indexToRemove) => {
        setCartItems(prevItems => prevItems.filter((_, index) => index !== indexToRemove));
    };

    const updateQuantity = (indexToUpdate, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(indexToUpdate);
            return;
        }

        setCartItems(prevItems => {
            const newItems = [...prevItems];
            newItems[indexToUpdate].quantity = newQuantity;
            return newItems;
        });
    };

    const clearCart = () => setCartItems([]);

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    // Helper to show slide-in notification like original site
    const showNotification = (message) => {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--accent-red);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
