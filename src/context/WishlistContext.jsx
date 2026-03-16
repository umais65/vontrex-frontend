import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        try {
            const savedWishlist = localStorage.getItem('wishlistItems');
            if (savedWishlist) {
                setWishlistItems(JSON.parse(savedWishlist));
            }
        } catch (error) {
            console.error('Failed to parse wishlist from local storage', error);
            localStorage.removeItem('wishlistItems'); // Clean up corrupted data
        }
    }, []);

    const addToWishlist = (product) => {
        setWishlistItems((prevItems) => {
            const itemExists = prevItems.find((item) => item._id === product._id);
            if (itemExists) return prevItems; // Already in wishlist

            const newItems = [...prevItems, product];
            localStorage.setItem('wishlistItems', JSON.stringify(newItems));
            return newItems;
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlistItems((prevItems) => {
            const newItems = prevItems.filter((item) => item._id !== productId);
            localStorage.setItem('wishlistItems', JSON.stringify(newItems));
            return newItems;
        });
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some((item) => item._id === productId);
    };

    const getWishlistCount = () => wishlistItems.length;

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, getWishlistCount }}>
            {children}
        </WishlistContext.Provider>
    );
};
