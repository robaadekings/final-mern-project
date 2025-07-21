import { useState } from 'react';
import { Link } from 'react-router-dom';

function Products({ onAddToCart }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const products = [
        { id: 1, name: 'iPhone 14 Pro', category: 'Smartphones', price: 1199, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8' },
        { id: 2, name: 'MacBook Pro M2', category: 'Laptops', price: 1999, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085' },
        { id: 3, name: 'Canon DSLR Camera', category: 'Cameras', price: 899, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475' },
        { id: 4, name: 'AirPods Pro', category: 'Audio', price: 249, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e' },
        { id: 5, name: 'PlayStation 5', category: 'Gaming', price: 499, image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80' },
        { id: 6, name: 'Samsung Galaxy Tab', category: 'Tablets', price: 799, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
        { id: 7, name: 'Canon Mirrorless Camera', category: 'Cameras', price: 1299, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80' },
        { id: 8, name: 'Apple Watch', category: 'Wearables', price: 399, image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4' },
        { id: 9, name: 'Sony WH-1000XM5', category: 'Audio', price: 349, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8' },
        { id: 10, name: 'Logitech MX Master 3', category: 'Accessories', price: 99, image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7' },
        { id: 11, name: 'JBL Bluetooth Speaker', category: 'Audio', price: 149, image: 'https://images.unsplash.com/photo-1504198458649-3128b932f49b' },
        { id: 12, name: 'GoPro Hero 9', category: 'Cameras', price: 499, image: 'https://images.unsplash.com/photo-1505740106531-4243f3831f50' },
        { id: 13, name: 'Mechanical Gaming Keyboard', category: 'Accessories', price: 149, image: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d' },
        { id: 14, name: 'Google Nest Hub', category: 'Home Tech', price: 199, image: 'https://images.unsplash.com/photo-1527430253228-e93688616381' },
        { id: 15, name: 'Dell UltraSharp Monitor', category: 'Monitors', price: 599, image: 'https://images.unsplash.com/photo-1539874754764-5a965591c4bc' },
        { id: 16, name: 'Xbox Series X', category: 'Gaming', price: 549, image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1b' },
        { id: 17, name: 'Amazon Kindle', category: 'Tablets', price: 129, image: 'https://images.unsplash.com/photo-1507667985342-cd3ab173f28f' },
        { id: 18, name: 'Samsung Galaxy Watch', category: 'Wearables', price: 299, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
        { id: 19, name: 'Bose Noise Cancelling 700', category: 'Audio', price: 379, image: 'https://images.unsplash.com/photo-1503602642458-232111445657' },
        { id: 20, name: 'Razer Gaming Mouse', category: 'Accessories', price: 79, image: 'https://images.unsplash.com/photo-1527430253228-e93688616381' },
    ];

    const categories = ['All', ...new Set(products.map((p) => p.category))];

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedCategory('All');
    };

    return (
        <div className="container mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Our Products</h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
                <input
                    type="text"
                    placeholder="🔍 Search name or category"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <button
                    onClick={resetFilters}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition w-full md:w-auto"
                >
                    Reset Filters
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                    <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-5 block"
                    >
                        <div className="h-48 bg-gray-100 rounded mb-4 overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
                        <p className="text-gray-600 mb-2">{product.category}</p>
                        <p className="text-indigo-600 font-bold mb-4">${product.price}</p>
                        <button
                            onClick={(e) => { e.preventDefault(); onAddToCart(product); }}
                            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition w-full"
                        >
                            Add to Cart
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Products;
