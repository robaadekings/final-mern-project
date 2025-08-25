"import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import BannerForm from '../../components/BannerForm';
import api from '../../lib/api';

function ManageBanners() {
    const [banners, setBanners] = useState({
        hero: [],
        promotional: [],
        categories: [],
        featured: []
    });
    const [editingBanner, setEditingBanner] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('hero');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            setLoading(true);
            // In a real app, fetch from your API
            // For now, using static data
            setBanners({
                hero: [
                    {
                        id: 1,
                        title: "Summer Collection 2024",
                        description: "Discover the latest trends",
                        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
                        buttonText: "Shop Now",
                        buttonLink: "/products"
                    }
                ],
                promotional: [
                    {
                        id: 1,
                        title: "Free Shipping",
                        description: "Free shipping on orders over $50",
                        buttonText: "Shop Now",
                        buttonLink: "/products",
                        type: "sale",
                        dismissible: true
                    }
                ],
                categories: [
                    {
                        id: 1,
                        name: "Electronics",
                        description: "Latest gadgets and tech innovations",
                        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80",
                        icon: "📱",
                        link: "/products"
                    }
                ],
                featured: [
                    {
                        _id: "featured-1",
                        name: "Wireless Bluetooth Headphones",
                        price: 89.99,
                        originalPrice: 129.99,
                        discount: 31,
                        rating: 4.5,
                        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
                        category: "Electronics"
                    }
                ]
            });
        } catch (err) {
            console.error('Error fetching banners:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (banner, type) => {
        setFormType(type);
        setEditingBanner(banner);
        setShowForm(true);
    };

    const handleDelete = async (bannerId, type) => {
        if (!window.confirm('Are you sure you want to delete this banner?')) {
            return;
        }

        try {
            // Delete from API
            await api.delete(`/admin/banners/${type}/${bannerId}`);
            
            // Update local state
            setBanners(prev => ({
                ...prev,
                [type]: prev[type].filter(b => b.id !== bannerId && b._id !== bannerId)
            }));
        } catch (err) {
            console.error('Error deleting banner:', err);
        }
    };

    const handleCreateNew = (type) => {
        setFormType(type);
        setEditingBanner(null);
        setShowForm(true);
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (editingBanner) {
                // Update existing banner
                const response = await api.put(`/admin/banners/${formType}/${editingBanner.id || editingBanner._id}`, formData);
                
                setBanners(prev => ({
                    ...prev,
                    [formType]: prev[formType].map(b => 
                        (b.id === editingBanner.id || b._id === editingBanner._id) ? response.data : b
                    )
                }));
            } else {
                // Create new banner
                const response = await api.post(`/admin/banners/${formType}`, formData);
                
                setBanners(prev => ({
                    ...prev,
                    [formType]: [...prev[formType], response.data]
                }));
            }
            
            setShowForm(false);
            setEditingBanner(null);
        } catch (err) {
            console.error('Error saving banner:', err);
        }
    };

    const renderBannerCard = (banner, type) => {
        const getBannerTitle = () => {
            if (type === 'hero') return banner.title;
            if (type === 'promotional') return banner.title;
            if (type === 'category') return banner.name;
            if (type === 'featured') return banner.name;
            return 'Untitled';
        };

        return (
            <div key={banner.id || banner._id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">
                            {getBannerTitle()}
                        </h3>
                        <p className="text-sm text-gray-600">
                            {banner.description || banner.name}
                        </p>
                    </div>
                    <div className="flex space-x-2 ml-3">
                        <button
                            onClick={() => handleEdit(banner, type)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                        >
                            <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleDelete(banner.id || banner._id, type)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                        >
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                
                {banner.image && (
                    <div className="mb-3">
                        <img
                            src={banner.image}
                            alt={getBannerTitle()}
                            className="w-full h-32 object-cover rounded-lg"
                        />
                    </div>
                )}

                <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                        {type.toUpperCase()}
                    </span>
                    {banner.type && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                            {banner.type}
                        </span>
                    )}
                    {banner.dismissible !== undefined && (
                        <span className={`px-2 py-1 rounded ${
                            banner.dismissible 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                        }`}>
                            {banner.dismissible ? 'Dismissible' : 'Non-dismissible'}
                        </span>
                    )}
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Manage Banners</h1>
                    <p className="mt-2 text-gray-600">
                        Create, edit, and manage all banner content for your e-commerce platform
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Hero Banners */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Hero Banners</h2>
                            <button
                                onClick={() => handleCreateNew('hero')}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Add Hero Banner
                            </button>
                        </div>
                        <div className="space-y-4">
                            {banners.hero.map(banner => renderBannerCard(banner, 'hero'))}
                            {banners.hero.length === 0 && (
                                <p className="text-gray-500 text-center py-8">No hero banners yet</p>
                            )}
                        </div>
                    </div>

                    {/* Promotional Banners */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Promotional Banners</h2>
                            <button
                                onClick={() => handleCreateNew('promotional')}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Add Promotional
                            </button>
                        </div>
                        <div className="space-y-4">
                            {banners.promotional.map(banner => renderBannerCard(banner, 'promotional'))}
                            {banners.promotional.length === 0 && (
                                <p className="text-gray-500 text-center py-8">No promotional banners yet</p>
                            )}
                        </div>
                    </div>

                    {/* Category Banners */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Category Banners</h2>
                            <button
                                onClick={() => handleCreateNew('category')}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Add Category
                            </button>
                        </div>
                        <div className="space-y-4">
                            {banners.categories.map(banner => renderBannerCard(banner, 'category'))}
                            {banners.categories.length === 0 && (
                                <p className="text-gray-500 text-center py-8">No category banners yet</p>
                            )}
                        </div>
                    </div>

                    {/* Featured Products */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Featured Products</h2>
                            <button
                                onClick={() => handleCreateNew('featured')}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Add Featured
                            </button>
                        </div>
                        <div className="space-y-4">
                            {banners.featured.map(banner => renderBannerCard(banner, 'featured'))}
                            {banners.featured.length === 0 && (
                                <p className="text-gray-500 text-center py-8">No featured products yet</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Banner Form Modal */}
                <BannerForm
                    isOpen={showForm}
                    onClose={() => {
                        setShowForm(false);
                        setEditingBanner(null);
                    }}
                    banner={editingBanner}
                    type={formType}
                    onSubmit={handleFormSubmit}
                />
            </div>
        </div>
    );
}

export default ManageBanners;
