import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

function HeroBanner({ banners = [] }) {
    const [currentBanner, setCurrentBanner] = useState(0);

    // Auto-advance banners
    useEffect(() => {
        if (banners.length <= 1) return;
        
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [banners.length]);

    const nextBanner = () => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
    };

    const prevBanner = () => {
        setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
    };

    if (banners.length === 0) {
        return null;
    }

    return (
        <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl shadow-2xl">
            {/* Banner Images */}
            {banners.map((banner, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentBanner ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <div 
                        className="w-full h-full bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${banner.image})` }}
                    >
                        {/* Overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
                        
                        {/* Content */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="px-6 md:px-12 text-white max-w-2xl">
                                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                                    {banner.title}
                                </h2>
                                <p className="text-lg md:text-xl mb-6 text-gray-200">
                                    {banner.description}
                                </p>
                                {banner.buttonText && banner.buttonLink && (
                                    <Link
                                        to={banner.buttonLink}
                                        className="inline-block bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                    >
                                        {banner.buttonText}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            {banners.length > 1 && (
                <>
                    <button
                        onClick={prevBanner}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
                        aria-label="Previous banner"
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextBanner}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
                        aria-label="Next banner"
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {banners.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentBanner(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentBanner 
                                    ? 'bg-white scale-125' 
                                    : 'bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Go to banner ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default HeroBanner;
