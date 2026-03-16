import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CurrencySelector from '../components/CurrencySelector';

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filters state
    const [category, setCategory] = useState("all");
    const [size, setSize] = useState("all");
    const [priceRange, setPriceRange] = useState("all");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setProducts(data);
                setFilteredProducts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Effect for filtering
    useEffect(() => {
        let result = products;

        if (category !== 'all') {
            result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }

        if (priceRange !== 'all') {
            if (priceRange === 'under50') {
                result = result.filter(p => p.price < 50);
            } else if (priceRange === '50to100') {
                result = result.filter(p => p.price >= 50 && p.price <= 100);
            } else if (priceRange === 'over100') {
                result = result.filter(p => p.price > 100);
            }
        }

        // Note: Our DB doesn't have size right now, but we keep the UI filter working visually
        if (size !== 'all') {
            result = result.filter(p => p.size && p.size === size);
        }

        setFilteredProducts(result);
    }, [category, size, priceRange, products]);

    const clearFilters = () => {
        setCategory("all");
        setSize("all");
        setPriceRange("all");
    };

    if (loading) return <main style={{ padding: '120px 5%' }}><h2>Loading Products...</h2></main>;
    if (error) return <main style={{ padding: '120px 5%' }}><h2 style={{ color: 'var(--accent-red)' }}>{error}</h2></main>;

    return (
        <main style={{ padding: '120px 5% 80px' }}>
            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <div className="shop">

                    {/* FILTERS */}
                    <aside className="shop__filters">
                        <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                            <CurrencySelector />
                        </div>

                        <h3 style={{ marginBottom: '1.5rem' }}>Filters</h3>

                        <div className="filter-group">
                            <h4 className="filter-group__title">Category</h4>
                            <div className="filter-option">
                                <input type="radio" id="cat-all" name="category" value="all" checked={category === 'all'} onChange={(e) => setCategory(e.target.value)} />
                                <label htmlFor="cat-all">All Products</label>
                            </div>
                            <div className="filter-option">
                                <input type="radio" id="cat-gloves" name="category" value="gloves" checked={category === 'gloves'} onChange={(e) => setCategory(e.target.value)} />
                                <label htmlFor="cat-gloves">Boxing Gloves</label>
                            </div>
                            <div className="filter-option">
                                <input type="radio" id="cat-wraps" name="category" value="wraps" checked={category === 'wraps'} onChange={(e) => setCategory(e.target.value)} />
                                <label htmlFor="cat-wraps">Hand Wraps</label>
                            </div>
                            <div className="filter-option">
                                <input type="radio" id="cat-headgear" name="category" value="headgear" checked={category === 'headgear'} onChange={(e) => setCategory(e.target.value)} />
                                <label htmlFor="cat-headgear">Headgear</label>
                            </div>
                            <div className="filter-option">
                                <input type="radio" id="cat-bags" name="category" value="bags" checked={category === 'bags'} onChange={(e) => setCategory(e.target.value)} />
                                <label htmlFor="cat-bags">Training Bags</label>
                            </div>
                            <div className="filter-option">
                                <input type="radio" id="cat-shinguards" name="category" value="shinguards" checked={category === 'shinguards'} onChange={(e) => setCategory(e.target.value)} />
                                <label htmlFor="cat-shinguards">Shin Guards</label>
                            </div>
                        </div>

                        <div className="filter-group">
                            <h4 className="filter-group__title">Price Range</h4>
                            <div className="filter-option">
                                <input type="radio" id="price-all" name="price" value="all" checked={priceRange === 'all'} onChange={(e) => setPriceRange(e.target.value)} />
                                <label htmlFor="price-all">All Prices</label>
                            </div>
                            <div className="filter-option">
                                <input type="radio" id="price-under50" name="price" value="under50" checked={priceRange === 'under50'} onChange={(e) => setPriceRange(e.target.value)} />
                                <label htmlFor="price-under50">Under $50</label>
                            </div>
                            <div className="filter-option">
                                <input type="radio" id="price-50to100" name="price" value="50to100" checked={priceRange === '50to100'} onChange={(e) => setPriceRange(e.target.value)} />
                                <label htmlFor="price-50to100">$50 to $100</label>
                            </div>
                            <div className="filter-option">
                                <input type="radio" id="price-over100" name="price" value="over100" checked={priceRange === 'over100'} onChange={(e) => setPriceRange(e.target.value)} />
                                <label htmlFor="price-over100">Over $100</label>
                            </div>
                        </div>

                        <div className="filter-group">
                            <h4 className="filter-group__title">Glove Size</h4>
                            <div className="filter-option">
                                <input type="radio" id="size-all" name="size" value="all" checked={size === 'all'} onChange={(e) => setSize(e.target.value)} />
                                <label htmlFor="size-all">All Sizes</label>
                            </div>
                            <div className="filter-option">
                                <input type="radio" id="size-10" name="size" value="10oz" checked={size === '10oz'} onChange={(e) => setSize(e.target.value)} />
                                <label htmlFor="size-10">10 oz</label>
                            </div>
                            <div className="filter-option">
                                <input type="radio" id="size-12" name="size" value="12oz" checked={size === '12oz'} onChange={(e) => setSize(e.target.value)} />
                                <label htmlFor="size-12">12 oz</label>
                            </div>
                            <div className="filter-option">
                                <input type="radio" id="size-14" name="size" value="14oz" checked={size === '14oz'} onChange={(e) => setSize(e.target.value)} />
                                <label htmlFor="size-14">14 oz</label>
                            </div>
                            <div className="filter-option">
                                <input type="radio" id="size-16" name="size" value="16oz" checked={size === '16oz'} onChange={(e) => setSize(e.target.value)} />
                                <label htmlFor="size-16">16 oz</label>
                            </div>
                        </div>

                        <button onClick={clearFilters} className="btn btn-outline" style={{ width: '100%', marginTop: '1rem' }}>
                            Clear Filters
                        </button>
                    </aside>

                    {/* PRODUCTS GRID */}
                    <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <h1 style={{ marginBottom: '0.5rem', fontSize: '2.5rem' }}>Shop All Products</h1>
                            <p id="productCount" style={{ color: 'var(--text-secondary)' }}>
                                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                            </p>

                            <div className="active-filters" style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {category !== 'all' && (
                                    <div className="filter-chip" style={{ background: 'var(--secondary-bg)', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {category}
                                        <button onClick={() => setCategory('all')} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>×</button>
                                    </div>
                                )}
                                {priceRange !== 'all' && (
                                    <div className="filter-chip" style={{ background: 'var(--secondary-bg)', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {priceRange === 'under50' ? 'Under $50' : priceRange === '50to100' ? '$50 - $100' : 'Over $100'}
                                        <button onClick={() => setPriceRange('all')} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>×</button>
                                    </div>
                                )}
                                {size !== 'all' && (
                                    <div className="filter-chip" style={{ background: 'var(--secondary-bg)', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {size}
                                        <button onClick={() => setSize('all')} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>×</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-3" id="productGrid" style={{ display: filteredProducts.length > 0 ? 'grid' : 'none', gap: '2rem' }}>
                            {filteredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div id="noProducts" style={{ textAlign: 'center', padding: '4rem 0' }}>
                                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>No products found</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Try adjusting your filters to see more results.</p>
                                <button onClick={clearFilters} className="btn btn-primary">Clear All Filters</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ShopPage;
