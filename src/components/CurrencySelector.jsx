import React from 'react';
import { useCurrency } from '../context/CurrencyContext';

const CurrencySelector = () => {
    const { currency, setCurrency, availableCurrencies } = useCurrency();

    return (
        <div className="currency-selector" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Currency:</span>
            <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={{
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    outline: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)',
                    fontWeight: '700'
                }}
            >
                {availableCurrencies.map(c => (
                    <option key={c} value={c} style={{ background: 'var(--primary-bg)' }}>{c}</option>
                ))}
            </select>
        </div>
    );
};

export default CurrencySelector;
