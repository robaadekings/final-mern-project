import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

function CategoryBanner({ categories = [] }) {
    if (categories.length === 0) return null;

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Shop by Category
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover amazing products across all categories
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {categories.map((category, index) => (
                    <Link
                        key={category.id || index}
                        to={category.link || "/products"}
                        className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                    >
                        {/* Background Image */}
                        <div 
                            className="w-full h-48 md:h-56 bg-cover bg-center bg-no-repeat relative"
                            style={{ backgroundImage: `url(${category.image})` }}
                        >
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 group-hover:via-black/40 transition-all duration-500"></div>
                            
                            {/* Category Icon */}
                            {category.icon && (
                                <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                                    <span className="text-2xl">{category.icon}</span>
                                </div>
                            )}
                            
                            {/* Category Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                                <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                                    {category.name}
                                </h3>
                                {category.description && (
                                    <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                                        {category.description}
                                    </p>
                                )}
                                
                                {/* Arrow Icon */}
                                <div className="flex items-center text-white/80 group-hover:text-yellow-300 transition-all duration-300">
                                    <span className="text-sm font-medium mr-2">Explore</span>
                                    <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                            </div>
                        </div>

                        {/* Hover Effect Border */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400/50 rounded-2xl transition-all duration-500"></div>
                    </Link>
                ))}
            </div>

            {/* View All Categories Button */}
            <div className="text-center mt-8">
                <Link
                    to="/products"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                    View All Categories
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
            </div>
        </div>
    );
}

export default CategoryBanner;
