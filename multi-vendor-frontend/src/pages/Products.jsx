import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { TrashIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ProductCard from '../components/ProductCard';
import PromotionalBanner from '../components/PromotionalBanner';
import CategoryBanner from '../components/CategoryBanner';
import { getPageBanners } from '../data/bannerData';

function Products({ onAddToCart }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestionsRef = useRef(null);
    const navigate = useNavigate();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const [activeSuggestion, setActiveSuggestion] = useState(-1);
    const [categories, setCategories] = useState(['All']);

    // Get banner data based on user authentication status
    const pageBanners = getPageBanners(user);

    // Fetch products and categories from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                setProducts(res.data);
            } catch (err) {
                setProducts([]);
            }
        };
        const fetchCategories = async () => {
            try {
                const res = await api.get('/products/categories');
                const catList = res.data.map(c => c.name);
                setCategories(['All', ...catList]);
            } catch (err) {
                setCategories(['All']);
            }
        };
        fetchProducts();
        fetchCategories();
    }, []);

    // Update suggestions as user types
    useEffect(() => {
        if (!search.trim()) {
            setSuggestions([]);
            return;
        }
        const lower = search.toLowerCase();
        const matches = products.filter(p =>
            p.name.toLowerCase().includes(lower) ||
            (p.category && p.category.toLowerCase().includes(lower))
        );
        setSuggestions(matches.slice(0, 6));
    }, [search, products]);

    // Hide suggestions on click outside
    useEffect(() => {
        const handleClick = (e) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    // Keyboard navigation for suggestions
    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveSuggestion((prev) => (prev + 1) % suggestions.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveSuggestion((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        } else if (e.key === 'Enter') {
            if (activeSuggestion >= 0 && suggestions[activeSuggestion]) {
                navigate(`/products/${suggestions[activeSuggestion]._id}`);
                setShowSuggestions(false);
                setSearch('');
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    // Reset active suggestion when search or suggestions change
    useEffect(() => {
        setActiveSuggestion(-1);
    }, [search, suggestions]);

    // Filter products by category and search
    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch = !search.trim() || product.name.toLowerCase().includes(search.toLowerCase()) || (product.category && product.category.toLowerCase().includes(search.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }
        try {
            await api.delete(`/products/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            // Refetch products after delete
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (err) {
            alert('Failed to delete product');
        }
    };

    const resetFilters = () => {
        setSelectedCategory('All');
        setSearch('');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setShowSuggestions(false);
        // No need to navigate, just filter in place
    };

    // Helper to get correct backend base URL for images
    const getBackendBaseUrl = () => {
        const url = import.meta.env.VITE_API_URL || 'https://final-mern-project-g5mi.onrender.com/api';
        return url.replace(/\/api$/, '');
    };

    return (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 pt-28 sm:pt-32 pb-4 sm:pb-8 min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-100 via-fuchsia-100 to-indigo-100">
            
            
            {/* Sticky Search Bar: fixed at top, overlays above product grid */}
            {(!user || user.role !== 'admin') && (
                <div className="w-full bg-white border-b border-pink-200 shadow-lg flex flex-col items-center py-2 px-2 fixed top-[80px] sm:top-[84px] left-0 right-0 z-50" style={{ marginTop: '0', maxWidth: '100vw' }}>
                    <form onSubmit={handleSearch} className="flex items-center w-full max-w-md relative gap-2">
                        <div className={`flex items-center w-full bg-gray-100 border-2 border-pink-300 rounded-2xl px-2 py-1 transition-shadow ${showSuggestions && suggestions.length > 0 ? 'ring-2 ring-pink-300 shadow-lg' : ''}`}> 
                            <MagnifyingGlassIcon className="w-5 h-5 text-pink-400 mr-1" />
                            <input
                                type="text"
                                value={search}
                                onChange={e => { setSearch(e.target.value); setShowSuggestions(true); }}
                                onFocus={() => setShowSuggestions(true)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search products, brands and categories"
                                className="flex-1 px-2 py-1 rounded-2xl text-pink-900 focus:outline-none bg-gray-100 text-sm"
                                autoComplete="off"
                                aria-label="Search products"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => { setSearch(''); setShowSuggestions(false); }}
                                    className="ml-1 text-gray-400 hover:text-pink-500 focus:outline-none"
                                    aria-label="Clear search"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                        <button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-3 py-1.5 rounded-full transition-all text-sm whitespace-nowrap shadow-md">Search</button>
                        {/* Suggestions dropdown */}
                        {showSuggestions && search.trim() && suggestions.length > 0 && (
                            <div ref={suggestionsRef} className="absolute top-10 left-0 w-full bg-white border border-pink-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto animate-fade-in">
                                {suggestions.map((s, idx) => (
                                    <div
                                        key={s._id}
                                        className={`px-4 py-2 flex items-center gap-2 cursor-pointer transition-colors ${activeSuggestion === idx ? 'bg-pink-100 text-pink-700 font-semibold' : 'hover:bg-pink-50 text-pink-700'}`}
                                        onClick={() => { setShowSuggestions(false); setSearch(''); navigate(`/products/${s._id}`); }}
                                        onMouseEnter={() => setActiveSuggestion(idx)}
                                        onMouseLeave={() => setActiveSuggestion(-1)}
                                        tabIndex={-1}
                                    >
                                        <span className="font-semibold truncate max-w-[120px]">{s.name}</span>
                                        <span className="ml-2 text-xs text-gray-500 truncate max-w-[80px]">{s.category}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </form>
                </div>
            )}

            {/* Spacer for fixed search bar so content doesn't hide behind it */}
            {(!user || user.role !== 'admin') && (
                <div className="h-16" />
            )}

            {/* Promotional Banners */}
            <section className="py-6">
                <div className="space-y-4">
                    {pageBanners.products.promotional.map((banner) => (
                        <PromotionalBanner
                            key={banner.id}
                            title={banner.title}
                            description={banner.description}
                            buttonText={banner.buttonText}
                            buttonLink={banner.buttonLink}
                            type={banner.type}
                            dismissible={banner.dismissible}
                        />
                    ))}
                </div>
            </section>

            <div className="text-center mb-6 sm:mb-8" style={{ marginTop: '8px' }}>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Our Products</h1>
                <p className="mt-2 text-sm sm:text-base text-gray-600">Browse curated items from trusted vendors</p>
            </div>

            {/* Category Banners */}
            <section className="py-8">
                <CategoryBanner categories={pageBanners.products.categories} />
            </section>

            {/* Removed category dropdown and reset filters per request */}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6" style={{ marginBottom: '70px' }}>
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        user={user}
                        onAddToCart={onAddToCart}
                        onBuyNow={() => navigate(`/products/${product._id}`)}
                        onDelete={user && user.role === 'admin' ? handleDelete : undefined}
                    />
                ))}
            </div>
        </div>
    );
}

export default Products;
