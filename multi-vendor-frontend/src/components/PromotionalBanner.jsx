import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon, SparklesIcon, TagIcon, FireIcon } from '@heroicons/react/24/outline';

function PromotionalBanner({ 
    title, 
    description, 
    buttonText, 
    buttonLink, 
    type = 'default',
    dismissible = true,
    onDismiss 
}) {
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
        setIsVisible(false);
        if (onDismiss) onDismiss();
    };

    if (!isVisible) return null;

    const getBannerStyles = () => {
        switch (type) {
            case 'sale':
                return {
                    bg: 'bg-gradient-to-r from-red-500 to-pink-600',
                    icon: <TagIcon className="w-6 h-6" />,
                    iconColor: 'text-red-100'
                };
            case 'new':
                return {
                    bg: 'bg-gradient-to-r from-blue-500 to-indigo-600',
                    icon: <SparklesIcon className="w-6 h-6" />,
                    iconColor: 'text-blue-100'
                };
            case 'hot':
                return {
                    bg: 'bg-gradient-to-r from-orange-500 to-red-600',
                    icon: <FireIcon className="w-6 h-6" />,
                    iconColor: 'text-orange-100'
                };
            default:
                return {
                    bg: 'bg-gradient-to-r from-purple-500 to-pink-600',
                    icon: <SparklesIcon className="w-6 h-6" />,
                    iconColor: 'text-purple-100'
                };
        }
    };

    const styles = getBannerStyles();

    return (
        <div className={`${styles.bg} text-white p-4 md:p-6 rounded-xl shadow-lg relative overflow-hidden`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '20px 20px'
                }} />
            </div>

            <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className={`${styles.iconColor} flex-shrink-0`}>
                        {styles.icon}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold mb-1">
                            {title}
                        </h3>
                        <p className="text-sm md:text-base text-white/90">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    {buttonText && buttonLink && (
                        <Link
                            to={buttonLink}
                            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-md whitespace-nowrap"
                        >
                            {buttonText}
                        </Link>
                    )}
                    
                    {dismissible && (
                        <button
                            onClick={handleDismiss}
                            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-all duration-200"
                            aria-label="Dismiss banner"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Animated border */}
            <div className="absolute bottom-0 left-0 h-1 bg-white/30 animate-pulse"></div>
        </div>
    );
}

export default PromotionalBanner;
