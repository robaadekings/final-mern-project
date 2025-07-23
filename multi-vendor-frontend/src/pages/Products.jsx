import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

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

    return (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
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
                    <div key={product._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-3 sm:p-5 block">
                        <Link
                            to={`/products/${product._id}`}
                        >
                            <div className="h-40 sm:h-48 bg-gray-100 rounded mb-3 sm:mb-4 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <h2 className="text-base sm:text-lg font-semibold mb-1">{product.name}</h2>
                            <p className="text-gray-600 mb-1 sm:mb-2">{product.category}</p>
                            <p className="text-indigo-600 font-bold mb-2 sm:mb-4">${product.price}</p>
                        </Link>
                        <button
                            onClick={(e) => { e.preventDefault(); onAddToCart(product); }}
                            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition w-full"
                        >
                            Add to Cart
                        </button>
                        {/* Admin-only delete button below product */}
                        {user && user.role === 'admin' && (
                            <button
                                onClick={() => handleDelete(product._id)}
                                className="mt-3 flex items-center gap-1 text-red-600 hover:underline w-full justify-center"
                                aria-label="Delete"
                                title="Delete"
                            >
                                <TrashIcon className="w-5 h-5" /> Delete
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
