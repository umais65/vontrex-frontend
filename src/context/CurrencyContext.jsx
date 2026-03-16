import React, { createContext, useState, useContext, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

const EXCHANGE_RATES = {
    USD: { rate: 1, symbol: '$', pre: true },
    EUR: { rate: 0.92, symbol: '€', pre: true },
    GBP: { rate: 0.79, symbol: '£', pre: true },
    PKR: { rate: 280, symbol: 'Rs ', pre: true },
    AED: { rate: 3.67, symbol: 'AED ', pre: false },
    CAD: { rate: 1.35, symbol: 'C$', pre: true },
    AUD: { rate: 1.50, symbol: 'A$', pre: true }
};

export const CurrencyProvider = ({ children }) => {
    // Load from localStorage or default to USD
    const [currency, setCurrency] = useState(() => {
        try {
            const savedCurrency = localStorage.getItem('vontrex_currency');
            return savedCurrency && EXCHANGE_RATES[savedCurrency] ? savedCurrency : 'USD';
        } catch (error) {
            console.error('Failed to access local storage for currency', error);
            return 'USD';
        }
    });

    useEffect(() => {
        localStorage.setItem('vontrex_currency', currency);
    }, [currency]);

    const formatPrice = (usdAmount) => {
        const currencyInfo = EXCHANGE_RATES[currency];
        const converted = usdAmount * currencyInfo.rate;

        // Format with thousands separator
        const formattedNumber = converted.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        if (currencyInfo.pre) {
            return `${currencyInfo.symbol}${formattedNumber}`;
        } else {
            return `${formattedNumber} ${currencyInfo.symbol}`;
        }
    };

    const getRawConverted = (usdAmount) => {
        return usdAmount * EXCHANGE_RATES[currency].rate;
    };

    const value = {
        currency,
        setCurrency,
        formatPrice,
        getRawConverted,
        availableCurrencies: Object.keys(EXCHANGE_RATES)
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
};
