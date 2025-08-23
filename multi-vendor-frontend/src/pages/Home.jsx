import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import PromotionalBanner from '../components/PromotionalBanner';
import CategoryBanner from '../components/CategoryBanner';
import FeaturedProductsBanner from '../components/FeaturedProductsBanner';
import { pageBanners } from '../data/bannerData';

function Home({ user }) {
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

    // If user is authenticated, show dashboard-style home
    if (user) {
        return (
            <div className="min-h-screen bg-gray-50">
                {/* Hero Banner Section */}
                <section className="py-8">
                    <div className="container mx-auto px-6">
                        <HeroBanner banners={pageBanners.home.hero} />
                    </div>
                </section>

                {/* Promotional Banners */}
                <section className="py-6">
                    <div className="container mx-auto px-6 space-y-4">
                        {pageBanners.home.promotional.map((banner) => (
                            <PromotionalBanner
                                key={banner.id}
                                title={banner.title}
                                description={banner.description}
                                buttonText={banner.buttonText}
                                buttonLink={banner.buttonLink}
                                type={banner.type}
                                dismissible={banner.dismissible}
                            />
                        ))}
                    </div>
                </section>

                {/* Welcome Section */}
                <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-16">
                    <div className="container mx-auto text-center px-6">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Welcome back, {user.name}!
                        </h1>
                        <p className="text-lg md:text-xl mb-6">
                            Ready to explore amazing products?
                        </p>
                        <Link
                            to="/products"
                            className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                        >
                            Browse Products
                        </Link>
                    </div>
                </section>

                {/* Category Banners */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <CategoryBanner categories={pageBanners.home.categories} />
                    </div>
                </section>

                {/* Featured Products Banner */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <FeaturedProductsBanner 
                            products={pageBanners.home.featured}
                            title="Featured Products"
                            subtitle="Handpicked for you"
                        />
                    </div>
                </section>

                {/* Quick Actions Section */}
                <section className="py-12">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Link to="/products" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition text-center">
                                <div className="text-4xl mb-4">🛍️</div>
                                <h3 className="text-lg font-semibold mb-2">Browse Products</h3>
                                <p className="text-gray-600">Discover amazing products from trusted vendors</p>
                            </Link>
                            <Link to="/cart" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition text-center">
                                <div className="text-4xl mb-4">🛒</div>
                                <h3 className="text-lg font-semibold mb-2">View Cart</h3>
                                <p className="text-gray-600">Check your shopping cart and proceed to checkout</p>
                            </Link>
                            <Link to="/orders" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition text-center">
                                <div className="text-4xl mb-4">📦</div>
                                <h3 className="text-lg font-semibold mb-2">My Orders</h3>
                                <p className="text-gray-600">Track your orders and view order history</p>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    // If user is not authenticated, show landing page
    return (
        <div>
            {/* Hero Banner Section */}
            <section className="py-8">
                <div className="container mx-auto px-6">
                    <HeroBanner banners={pageBanners.home.hero} />
                </div>
            </section>

            {/* Promotional Banners */}
            <section className="py-6">
                <div className="container mx-auto px-6 space-y-4">
                    {pageBanners.home.promotional.map((banner) => (
                        <PromotionalBanner
                            key={banner.id}
                            title={banner.title}
                            description={banner.description}
                            buttonText={banner.buttonText}
                            buttonLink={banner.buttonLink}
                            type={banner.type}
                            dismissible={banner.dismissible}
                        />
                    ))}
                </div>
            </section>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-20">
                <div className="container mx-auto text-center px-6">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Welcome to RobinkStore
                    </h1>
                    <p className="text-lg md:text-xl mb-6">
                        Discover amazing products from trusted vendors.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
                        <Link
                            to="/products"
                            className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Category Banners */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <CategoryBanner categories={pageBanners.home.categories} />
                </div>
            </section>

            {/* Featured Products Banner */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <FeaturedProductsBanner 
                        products={pageBanners.home.featured}
                        title="Featured Electronics"
                        subtitle="Handpicked for you"
                    />
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
