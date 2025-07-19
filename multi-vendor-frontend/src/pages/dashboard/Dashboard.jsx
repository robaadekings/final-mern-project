import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products/vendor', {
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

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
                <Link to="/dashboard/add-product" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                    + Add Product
                </Link>
            </div>

            {products.length === 0 ? (
                <p className="text-gray-500">No products added yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="border rounded p-4 shadow-md">
                            <img
                                src={`http://localhost:5000/uploads/${product.image}`}
                                alt={product.name}
                                className="w-full h-48 object-cover mb-4 rounded"
                            />
                            <h2 className="text-lg font-bold">{product.name}</h2>
                            <p className="text-gray-600 mb-2">{product.description.slice(0, 50)}...</p>
                            <p className="font-semibold">${product.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dashboard;
