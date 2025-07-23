import { Link } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';

// Helper to get correct backend base URL for images
const getBackendBaseUrl = () => {
    const url = import.meta.env.VITE_API_URL || 'https://final-mern-project-g5mi.onrender.com/api';
    return url.replace(/\/api$/, '');
};

export default function ProductCard({
    product,
    user,
    onAddToCart,
    onBuyNow,
    onDelete
}) {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-2 md:p-4 flex flex-col items-center w-full max-w-[220px] min-w-[180px] md:max-w-[260px] md:min-w-[220px] mx-auto">
            <Link to={`/products/${product._id}`} className="w-full">
                <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center mb-2">
                    {product.image ? (
                        <img
                            src={`${getBackendBaseUrl()}/uploads/${product.image}`}
                            alt={product.name}
                            className="object-cover w-full h-full max-h-40 min-h-32"
                            style={{ aspectRatio: '4/3', maxWidth: '100%', borderRadius: '0.5rem' }}
                            loading="lazy"
                        />
                    ) : (
                        <span className="text-gray-400">No Image</span>
                    )}
                </div>
                <h2 className="text-lg font-bold mb-1 text-center truncate w-full">{product.name}</h2>
                <p className="text-indigo-600 font-bold mb-1">${product.price}</p>
                <p className="text-xs text-gray-500 mb-2">{product.category}</p>
            </Link>
            {/* Show Approved/Pending badge only for admin or vendor */}
            {user && (user.role === 'admin' || user.role === 'vendor') && product.approved !== undefined && (
                product.approved ? (
                    <span className="inline-block px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full mb-2">Approved</span>
                ) : (
                    <span className="inline-block px-2 py-0.5 text-xs bg-orange-100 text-orange-700 rounded-full mb-2">Pending</span>
                )
            )}
            <div className="flex gap-2 mt-auto w-full">
                <button
                    onClick={(e) => { e.preventDefault(); onAddToCart && onAddToCart(product); }}
                    className="flex-1 bg-indigo-600 text-white py-1 rounded hover:bg-indigo-700 text-xs"
                >
                    Add to Cart
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); onBuyNow && onBuyNow(product); }}
                    className="flex-1 bg-pink-600 text-white py-1 rounded hover:bg-pink-700 text-xs"
                >
                    Buy Now
                </button>
            </div>
            {/* Admin-only delete button below product */}
            {user && user.role === 'admin' && onDelete && (
                <button
                    onClick={() => onDelete(product._id)}
                    className="mt-3 flex items-center gap-1 text-red-600 hover:underline w-full justify-center text-xs"
                    aria-label="Delete"
                    title="Delete"
                >
                    <TrashIcon className="w-5 h-5" /> Delete
                </button>
            )}
        </div>
    );
} 