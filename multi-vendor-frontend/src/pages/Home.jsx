import { Link } from 'react-router-dom';

function Home({ onRegisterClick, onLoginClick }) {
    const products = [
        {
            id: 1,
            name: 'Smartphone',
            description: 'Latest smartphone with amazing features.',
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 2,
            name: 'Laptop',
            description: 'High performance laptop for work and gaming.',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 3,
            name: 'Headphones',
            description: 'best audio best vibe and clear sound.',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
        }
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-20">
                <div className="container mx-auto text-center px-6">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Welcome to MyStore
                    </h1>
                    <p className="text-lg md:text-xl mb-6">
                        Discover amazing products from trusted vendors.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
                        <button
                            onClick={onRegisterClick}
                            className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                        >
                            Register
                        </button>
                        <button
                            onClick={onLoginClick}
                            className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                        >
                            Login
                        </button>
                        <Link
                            to="/Products"
                            className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                        Featured Electronics
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-48 w-full object-cover rounded mb-4"
                                />
                                <h3 className="text-lg font-semibold mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 mb-4">{product.description}</p>
                                <Link
                                    to="/products"
                                    className="text-indigo-500 font-medium hover:underline"
                                >
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
