import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

function FeaturedProductsBanner({ products = [], title = "Featured Products", subtitle = "Handpicked for you" }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const carouselRef = useRef(null);

    const productsPerView = 4; // Number of products visible at once
    const totalSlides = Math.ceil(products.length / productsPerView);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying || totalSlides <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalSlides);
        }, 4000);

        return () => clearInterval(timer);
    }, [isAutoPlaying, totalSlides]);

    // Pause auto-play on hover
    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    if (products.length === 0) return null;

    const getVisibleProducts = () => {
        const startIndex = currentIndex * productsPerView;
        return products.slice(startIndex, startIndex + productsPerView);
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<StarIconSolid key={i} className="w-4 h-4 text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<StarIcon key={fullStars} className="w-4 h-4 text-yellow-400" />);
        }

        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<StarIcon key={fullStars + hasHalfStar + i} className="w-4 h-4 text-gray-300" />);
        }

        return stars;
    };

    return (
        <div className="w-full" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    {title}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            </div>

            {/* Carousel Container */}
            <div className="relative group">
                {/* Navigation Arrows */}
                {totalSlides > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                            aria-label="Previous slide"
                        >
                            <ChevronLeftIcon className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                            aria-label="Next slide"
                        >
                            <ChevronRightIcon className="w-6 h-6" />
                        </button>
                    </>
                )}

                {/* Products Grid */}
                <div 
                    ref={carouselRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
                >
                    {getVisibleProducts().map((product, index) => (
                        <div
                            key={product._id || index}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                        >
                            {/* Product Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={product.image || product.images?.[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                />
                                {product.discount && (
                                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        -{product.discount}%
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                                    {product.name}
                                </h3>
                                
                                {/* Rating */}
                                {product.rating && (
                                    <div className="flex items-center mb-2">
                                        <div className="flex items-center mr-2">
                                            {renderStars(product.rating)}
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            ({product.rating})
                                        </span>
                                    </div>
                                )}

                                {/* Price */}
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg font-bold text-gray-900">
                                            ${product.price}
                                        </span>
                                        {product.originalPrice && product.originalPrice > product.price && (
                                            <span className="text-sm text-gray-500 line-through">
                                                ${product.originalPrice}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Action Button - Redirect to products page instead of individual product */}
                                <Link
                                    to="/products"
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dots Indicator */}
                {totalSlides > 1 && (
                    <div className="flex justify-center mt-6 space-x-2">
                        {Array.from({ length: totalSlides }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentIndex 
                                        ? 'bg-purple-600 scale-125' 
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* View All Products Button */}
            <div className="text-center mt-8">
                <Link
                    to="/products"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                    View All Products
                    <ChevronRightIcon className="w-5 h-5 ml-2" />
                </Link>
            </div>
        </div>
    );
}

export default FeaturedProductsBanner;
