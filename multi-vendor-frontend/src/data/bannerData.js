// Banner data configuration for the multi-vendor e-commerce platform

export const heroBanners = [
    {
        id: 1,
        title: "Summer Collection",
        description: "Discover the latest trends in fashion, electronics, and home decor. Up to 50% off on selected items!",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
        buttonText: "Shop Now",
        buttonLink: "/products"
    },
    {
        id: 2,
        title: "New Arrivals",
        description: "Fresh products added daily from trusted vendors. Be the first to discover amazing deals!",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
        buttonText: "Explore",
        buttonLink: "/products"
    },
    {
        id: 3,
        title: "Flash Sale",
        description: "Limited time offers on premium products. Don't miss out on these incredible deals!",
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
        buttonText: "Shop Sale",
        buttonLink: "/products"
    }
];

export const promotionalBanners = [
    {
        id: 1,
        title: "Free Shipping",
        description: "Free shipping on orders over $50. Limited time offer!",
        buttonText: "Shop Now",
        buttonLink: "/products",
        type: "sale",
        dismissible: true
    },
    {
        id: 2,
        title: "New User Discount",
        description: "Get 20% off your first order. Use code: NEWUSER20",
        buttonText: "Get Started",
        buttonLink: "/register",
        type: "new",
        dismissible: true,
        showOnlyForNonLoggedIn: true // This banner will only show for non-logged-in users
    },
    {
        id: 3,
        title: "Hot Deals",
        description: "Electronics up to 70% off. Don't wait, these deals won't last!",
        buttonText: "View Deals",
        buttonLink: "/products",
        type: "hot",
        dismissible: false
    }
];

export const categoryBanners = [
    {
        id: 1,
        name: "Electronics",
        description: "Latest gadgets and tech innovations",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80",
        icon: "📱",
        link: "/products"
    },
    {
        id: 2,
        name: "Fashion",
        description: "Trendy clothing and accessories",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80",
        icon: "👗",
        link: "/products"
    },
    {
        id: 3,
        name: "Home & Garden",
        description: "Beautiful home decor and garden essentials",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
        icon: "🏠",
        link: "/products"
    },
    {
        id: 4,
        name: "Sports & Outdoors",
        description: "Equipment for active lifestyle",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
        icon: "⚽",
        link: "/products"
    },
    {
        id: 5,
        name: "Books & Media",
        description: "Knowledge and entertainment",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80",
        icon: "📚",
        link: "/products"
    },
    {
        id: 6,
        name: "Beauty & Health",
        description: "Personal care and wellness products",
        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80",
        icon: "💄",
        link: "/products"
    },
    {
        id: 7,
        name: "Toys & Games",
        description: "Fun for all ages",
        image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80",
        icon: "🎮",
        link: "/products"
    },
    {
        id: 8,
        name: "Automotive",
        description: "Car accessories and maintenance",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80",
        icon: "🚗",
        link: "/products"
    }
];

// Sample featured products data (you can replace this with actual API data)
// Note: These are placeholder products for demonstration purposes.
// In production, you should fetch real featured products from your database
// or integrate with your existing products API.
export const featuredProducts = [
    {
        _id: "featured-1",
        name: "Wireless Bluetooth Headphones",
        price: 89.99,
        originalPrice: 129.99,
        discount: 31,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
        category: "Electronics"
    },
    {
        _id: "featured-2",
        name: "Smart Fitness Watch",
        price: 199.99,
        originalPrice: 249.99,
        discount: 20,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
        category: "Electronics"
    },
    {
        _id: "featured-3",
        name: "Organic Cotton T-Shirt",
        price: 24.99,
        originalPrice: 34.99,
        discount: 29,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
        category: "Fashion"
    },
    {
        _id: "featured-4",
        name: "Portable Bluetooth Speaker",
        price: 59.99,
        originalPrice: 79.99,
        discount: 25,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&q=80",
        category: "Electronics"
    },
    {
        _id: "featured-5",
        name: "Stainless Steel Water Bottle",
        price: 19.99,
        originalPrice: 29.99,
        discount: 33,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80",
        category: "Home & Garden"
    },
    {
        _id: "featured-6",
        name: "Yoga Mat Premium",
        price: 34.99,
        originalPrice: 49.99,
        discount: 30,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80",
        category: "Sports & Outdoors"
    },
    {
        _id: "featured-7",
        name: "Wireless Charging Pad",
        price: 29.99,
        originalPrice: 39.99,
        discount: 25,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=400&q=80",
        category: "Sports & Outdoors"
    },
    {
        _id: "featured-8",
        name: "Designer Sunglasses",
        price: 149.99,
        originalPrice: 199.99,
        discount: 25,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80",
        category: "Fashion"
    }
];

// Alternative: Function to get real featured products from your API
// Uncomment and modify this function to use real product data instead of placeholders
/*
export const getRealFeaturedProducts = async () => {
    try {
        // Fetch featured products from your existing products API
        const response = await fetch('/api/products?featured=true');
        const products = await response.json();
        
        // Transform the data to match the expected format
        return products.map(product => ({
            _id: product._id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice || product.price,
            discount: product.discount || 0,
            rating: product.rating || 4.0,
            image: product.image || product.images?.[0],
            category: product.category
        }));
    } catch (error) {
        console.error('Error fetching featured products:', error);
        // Fallback to placeholder data
        return featuredProducts;
    }
};
*/

// Function to get filtered promotional banners based on user authentication status
export const getPromotionalBanners = (user) => {
    console.log('Getting promotional banners for user:', user ? 'Logged in' : 'Not logged in');
    
    if (user) {
        // If user is logged in, filter out banners that should only show for non-logged-in users
        const filteredBanners = promotionalBanners.filter(banner => !banner.showOnlyForNonLoggedIn);
        console.log('Filtered banners for logged-in user:', filteredBanners.map(b => b.title));
        return filteredBanners;
    } else {
        // If user is not logged in, show all promotional banners
        console.log('Showing all banners for non-logged-in user:', promotionalBanners.map(b => b.title));
        return promotionalBanners;
    }
};

// Banner configuration for different pages
export const getPageBanners = (user) => {
    console.log('Getting page banners for user:', user ? 'Logged in' : 'Not logged in');
    
    const config = {
        home: {
            hero: heroBanners,
            promotional: getPromotionalBanners(user).slice(0, 2), // Show first 2 promotional banners
            categories: categoryBanners,
            featured: featuredProducts
        },
        products: {
            promotional: getPromotionalBanners(user).slice(1, 3), // Show last 2 promotional banners
            categories: categoryBanners.slice(0, 4), // Show first 4 categories
            featured: featuredProducts.slice(0, 4) // Show first 4 featured products
        }
    };
    
    console.log('Page banner configuration:', config);
    return config;
};

export default {
    heroBanners,
    promotionalBanners,
    categoryBanners,
    featuredProducts,
    getPromotionalBanners,
    getPageBanners
};
