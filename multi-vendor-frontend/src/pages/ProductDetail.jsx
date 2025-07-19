import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(res.data);
                setLoading(false);
            } catch (err) {
                setError('Product not found.');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {product.image && (
                    <img
                        src={`http://localhost:5000/uploads/${product.image}`}
                        alt={product.name}
                        className="w-full h-96 object-cover rounded-lg shadow-md"
                    />
                )}
                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-xl font-semibold text-indigo-600 mb-4">${product.price}</p>
                    <p className="text-sm text-gray-500 mb-2">Category: {product.category?.name || 'N/A'}</p>
                    <p className="text-sm text-gray-500">Vendor: {product.vendor?.name || 'N/A'}</p>
                    <button className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
