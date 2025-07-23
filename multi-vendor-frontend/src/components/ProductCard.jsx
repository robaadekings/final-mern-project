import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';

// Helper to get correct backend base URL for images
const getBackendBaseUrl = () => {
    const url = import.meta.env.VITE_API_URL || 'https://final-mern-project-g5mi.onrender.com/api';
    return url.replace(/\/api$/, '');
};

// 30 demo electronics images from Unsplash
const demoImages = [
  // Electronics (1-10)
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  'https://images.unsplash.com/photo-1518770660439-4636190af475',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
  'https://images.unsplash.com/photo-1484704849700-f032a568e944',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
  'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
  'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7',
  'https://images.unsplash.com/photo-1504198458649-3128b932f49b',
  'https://images.unsplash.com/photo-1505740106531-4243f3831f50',
  // Fashion (11-25)
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9',
  'https://images.unsplash.com/photo-1469398715555-76331a6c7c9b',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9',
  'https://images.unsplash.com/photo-1469398715555-76331a6c7c9b',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9',
  'https://images.unsplash.com/photo-1469398715555-76331a6c7c9b',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
  // (rest remain electronics or repeat as needed)
  'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d',
  'https://images.unsplash.com/photo-1527430253228-e93688616381',
  'https://images.unsplash.com/photo-1539874754764-5a965591c4bc',
  'https://images.unsplash.com/photo-1517430816045-df4b7de11d1b',
  'https://images.unsplash.com/photo-1507667985342-cd3ab173f28f',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
];

export default function ProductCard({
    product,
    user,
    onAddToCart,
    onBuyNow,
    onDelete
}) {
    // Pick a demo image based on product._id hash or index for variety
    const demoImage = demoImages[
        product._id && typeof product._id === 'string'
            ? [...product._id].reduce((acc, c) => acc + c.charCodeAt(0), 0) % demoImages.length
            : 0
    ];
    const [imgError, setImgError] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-2 md:p-4 flex flex-col items-center w-full max-w-[220px] min-w-[180px] md:max-w-[260px] md:min-w-[220px] mx-auto">
            <Link to={`/products/${product._id}`} className="w-full">
                <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center mb-2">
                    <img
                        src={
                            !imgError && product.image
                                ? (product.image.startsWith('http') ? product.image : `${getBackendBaseUrl()}/uploads/${product.image}`)
                                : demoImage
                        }
                        alt={product.name}
                        className="object-cover w-full h-full max-h-40 min-h-32"
                        style={{ aspectRatio: '4/3', maxWidth: '100%', borderRadius: '0.5rem' }}
                        loading="lazy"
                        onError={() => setImgError(true)}
                    />
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