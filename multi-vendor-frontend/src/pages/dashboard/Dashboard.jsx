import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { Link } from 'react-router-dom';

function VendorProductCard({ product, onDelete }) {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-2 md:p-4 flex flex-col items-center w-full max-w-[220px] min-w-[180px] md:max-w-[260px] md:min-w-[220px] mx-auto">
            <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center mb-2">
                {product.image ? (
                    <img
                        src={product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_API_URL || 'https://final-mern-project-g5mi.onrender.com'}/uploads/${product.image}`}
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
            {product.approved !== undefined && (
                product.approved ? (
                    <span className="inline-block px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full mb-2">Approved</span>
                ) : (
                    <span className="inline-block px-2 py-0.5 text-xs bg-orange-100 text-orange-700 rounded-full mb-2">Pending</span>
                )
            )}
            <button
                onClick={() => onDelete(product._id)}
                className="mt-3 flex items-center gap-1 text-red-600 hover:underline w-full justify-center text-xs bg-red-50 px-2 py-1 rounded hover:bg-red-100"
                aria-label="Delete"
                title="Delete"
            >
                Delete
            </button>
        </div>
    );
}

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products/vendor', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setProducts(res.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await api.delete(`/products/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setProducts(products.filter(p => p._id !== id));
        } catch (err) {
            alert('Failed to delete product');
        }
    };

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

    return (
        <div className="max-w-6xl mx-auto p-2 md:p-8 min-h-screen relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, #f3e8ff 0%, #ffe4e6 50%, #e0e7ff 100%)',
        }}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-20" style={{background: 'url(\"https://www.toptal.com/designers/subtlepatterns/patterns/memphis-mini.png\") repeat'}} />
            {/* Modern Vendor Navbar */}
            <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-900 text-white shadow-md rounded-xl mb-8 flex flex-col md:flex-row items-center justify-between px-6 py-4 relative z-10">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-widest drop-shadow">Vendor Dashboard</h1>
                <Link to="/dashboard/add-product" className="mt-3 md:mt-0 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full font-semibold shadow transition-all text-lg">+ Add Product</Link>
            </nav>
            {products.length === 0 ? (
                <p className="text-gray-500 text-center">No products added yet.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {products.map((product) => (
                        <VendorProductCard
                            key={product._id}
                            product={product}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dashboard;
