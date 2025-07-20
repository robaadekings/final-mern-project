import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { Link } from 'react-router-dom';

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                setProducts(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <Link 
                        key={product._id} 
                        to={`/products/${product._id}`} 
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition"
                    >
                        {product.image && (
                            <img
                                src={`${import.meta.env.VITE_API_URL || 'https://final-mern-project-g5mi.onrender.com'}/uploads/${product.image}`}
                                alt={product.name}
                                className="w-full h-60 object-cover rounded-t-lg"
                            />
                        )}
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <p className="text-gray-500">{product.category?.name}</p>
                            <p className="text-xl font-bold text-blue-600">${product.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Products;
