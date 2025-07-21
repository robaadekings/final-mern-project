import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { Link } from 'react-router-dom';
import { HeartIcon, ShoppingCartIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Skeleton from '../../components/Skeleton';

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wishlist, setWishlist] = useState([]);
    const [cartAnim, setCartAnim] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                setProducts(res.data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);

    // Wishlist toggle (local only for demo)
    const toggleWishlist = (id) => {
        setWishlist((prev) => prev.includes(id) ? prev.filter(wid => wid !== id) : [...prev, id]);
    };
    // Add to cart animation (demo only)
    const handleAddToCart = (id) => {
        setCartAnim((prev) => ({ ...prev, [id]: true }));
        setTimeout(() => setCartAnim((prev) => ({ ...prev, [id]: false })), 700);
        // Animate cart icon (if present)
        const cartIcon = document.getElementById('cart-icon');
        if (cartIcon) {
            cartIcon.classList.add('animate-bounce');
            setTimeout(() => cartIcon.classList.remove('animate-bounce'), 700);
        }
    };

    // Stock badge (demo: random for now)
    const getStockBadge = (idx) => {
        const stock = ["In Stock", "Low Stock", "Out of Stock"][idx % 3];
        if (stock === "In Stock") return <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs"><CheckCircleIcon className="w-4 h-4" /> In Stock</span>;
        if (stock === "Low Stock") return <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs"><ExclamationCircleIcon className="w-4 h-4" /> Low Stock</span>;
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs"><ExclamationCircleIcon className="w-4 h-4" /> Out of Stock</span>;
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {loading
                    ? Array.from({ length: 8 }).map((_, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-md p-4">
                            <Skeleton width="w-full" height="h-60" className="mb-4" />
                            <Skeleton width="w-2/3" height="h-6" className="mb-2" />
                            <Skeleton width="w-1/3" height="h-4" className="mb-2" />
                            <Skeleton width="w-1/2" height="h-6" />
                        </div>
                    ))
                    : products.map((product, idx) => (
                        <div 
                            key={product._id} 
                            className={`relative bg-white rounded-lg shadow-md hover:shadow-2xl transition group overflow-hidden ${cartAnim[product._id] ? 'ring-2 ring-pink-400' : ''} hover:-translate-y-1 hover:scale-[1.03] duration-200`}
                            tabIndex={0}
                            role="button"
                            aria-label={`View details for ${product.name}`}
                            onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    window.location.href = `/products/${product._id}`;
                                }
                            }}
                        >
                            {/* Wishlist icon */}
                            <button 
                                onClick={() => toggleWishlist(product._id)} 
                                className={`absolute top-3 right-3 z-10 text-xl ${wishlist.includes(product._id) ? 'text-pink-500' : 'text-gray-300'} hover:text-pink-400 transition`}
                                aria-label={wishlist.includes(product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                title={wishlist.includes(product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                            >
                                <HeartIcon className="w-6 h-6" />
                            </button>
                            <Link to={`/products/${product._id}`}> 
                                {product.image && (
                                    <img
                                        src={`${import.meta.env.VITE_API_URL || 'https://final-mern-project-g5mi.onrender.com'}/uploads/${product.image}`}
                                        alt={product.name}
                                        className="w-full h-60 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                                    />
                                )}
                            </Link>
                            <div className="p-4 flex flex-col gap-2">
                                <div className="flex justify-between items-center mb-1">
                                    <h2 className="text-lg font-semibold truncate">{product.name}</h2>
                                    {getStockBadge(idx)}
                                </div>
                                <p className="text-gray-500 text-sm">{product.category?.name || product.category}</p>
                                <p className="text-xl font-bold text-blue-600">${product.price}</p>
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={() => handleAddToCart(product._id)}
                                        className={`flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition-all duration-200 shadow ${cartAnim[product._id] ? 'scale-110' : ''} active:scale-95`}
                                        aria-label="Add to Cart"
                                        title="Add to Cart"
                                    >
                                        <ShoppingCartIcon className="w-5 h-5" /> Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Products;
