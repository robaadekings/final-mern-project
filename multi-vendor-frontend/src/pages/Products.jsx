import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ProductCard from '../components/ProductCard';

function Products({ onAddToCart }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestionsRef = useRef(null);
    const navigate = useNavigate();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                setProducts(res.data);
            } catch (err) {
                setProducts([]);
            }
        };
        fetchProducts();
    }, []);

    const categories = ['All', ...new Set(products.map((p) => p.category))];

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesCategory;
    });

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
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
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/products?search=${encodeURIComponent(search.trim())}`);
        }
    };

    // Helper to get correct backend base URL for images
    const getBackendBaseUrl = () => {
        const url = import.meta.env.VITE_API_URL || 'https://final-mern-project-g5mi.onrender.com/api';
        return url.replace(/\/api$/, '');
    };

    return (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8 min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-purple-100">
            {/* Responsive & Sticky Search Bar below sticky navbar */}
            <div className="w-full bg-white border-b border-pink-200 shadow-sm flex flex-col items-center py-2 px-2 sticky top-[64px] z-50" style={{ marginTop: '4px' }}>
                <form onSubmit={handleSearch} className="flex items-center w-full max-w-md relative gap-2">
                    <div className="flex items-center w-full bg-gray-100 border-2 border-pink-300 rounded-2xl px-2 py-1">
                        <MagnifyingGlassIcon className="w-5 h-5 text-pink-400 mr-1" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search products, brands and categories"
                            className="flex-1 px-2 py-1 rounded-2xl text-pink-900 focus:outline-none bg-gray-100 text-sm"
                            autoComplete="off"
                        />
                    </div>
                    <button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-3 py-1.5 rounded-full transition-all text-sm whitespace-nowrap">Search</button>
                </form>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 text-center" style={{ marginTop: '8px' }}>Our Products</h1>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <button
                    onClick={resetFilters}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition w-full sm:w-auto"
                >
                    Reset Filters
                </button>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6" style={{ marginBottom: '70px' }}>
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        user={user}
                        onAddToCart={onAddToCart}
                        onBuyNow={() => {/* Implement buy now logic here */}}
                        onDelete={user && user.role === 'admin' ? handleDelete : undefined}
                    />
                ))}
            </div>
        </div>
    );
}

export default Products;
