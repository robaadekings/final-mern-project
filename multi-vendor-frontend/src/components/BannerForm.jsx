import { useState, useEffect } from 'react';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';

function BannerForm({ 
    isOpen, 
    onClose, 
    banner = null, 
    type = 'hero', 
    onSubmit 
}) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        buttonText: '',
        buttonLink: '',
        type: 'default',
        dismissible: true,
        showOnlyForNonLoggedIn: false,
        name: '',
        icon: '',
        price: '',
        originalPrice: '',
        discount: '',
        rating: '',
        category: ''
    });

    useEffect(() => {
        if (banner) {
            // Populate form with existing banner data
            if (type === 'hero') {
                setFormData({
                    title: banner.title || '',
                    description: banner.description || '',
                    image: banner.image || '',
                    buttonText: banner.buttonText || '',
                    buttonLink: banner.buttonLink || '',
                    type: 'default',
                    dismissible: true,
                    showOnlyForNonLoggedIn: false,
                    name: '',
                    icon: '',
                    price: '',
                    originalPrice: '',
                    discount: '',
                    rating: '',
                    category: ''
                });
            } else if (type === 'promotional') {
                setFormData({
                    title: banner.title || '',
                    description: banner.description || '',
                    image: '',
                    buttonText: banner.buttonText || '',
                    buttonLink: banner.buttonLink || '',
                    type: banner.type || 'default',
                    dismissible: banner.dismissible !== undefined ? banner.dismissible : true,
                    showOnlyForNonLoggedIn: banner.showOnlyForNonLoggedIn || false,
                    name: '',
                    icon: '',
                    price: '',
                    originalPrice: '',
                    discount: '',
                    rating: '',
                    category: ''
                });
            } else if (type === 'category') {
                setFormData({
                    title: '',
                    description: banner.description || '',
                    image: banner.image || '',
                    buttonText: '',
                    buttonLink: banner.link || '',
                    type: 'default',
                    dismissible: true,
                    showOnlyForNonLoggedIn: false,
                    name: banner.name || '',
                    icon: banner.icon || '',
                    price: '',
                    originalPrice: '',
                    discount: '',
                    rating: '',
                    category: ''
                });
            } else if (type === 'featured') {
                setFormData({
                    title: '',
                    description: '',
                    image: banner.image || '',
                    buttonText: '',
                    buttonLink: '',
                    type: 'default',
                    dismissible: true,
                    showOnlyForNonLoggedIn: false,
                    name: banner.name || '',
                    icon: '',
                    price: banner.price || '',
                    originalPrice: banner.originalPrice || '',
                    discount: banner.discount || '',
                    rating: banner.rating || '',
                    category: banner.category || ''
                });
            }
        } else {
            // Reset form for new banner
            resetForm();
        }
    }, [banner, type]);

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            image: '',
            buttonText: '',
            buttonLink: '',
            type: 'default',
            dismissible: true,
            showOnlyForNonLoggedIn: false,
            name: '',
            icon: '',
            price: '',
            originalPrice: '',
            discount: '',
            rating: '',
            category: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                        {banner ? 'Edit' : 'Create'} {type} Banner
                    </h3>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Common Fields */}
                    {(type === 'hero' || type === 'promotional') && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    rows={3}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                        </>
                    )}

                    {/* Category-specific fields */}
                    {type === 'category' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Icon (emoji)</label>
                                <input
                                    type="text"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({...formData, icon: e.target.value})}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="📱"
                                />
                            </div>
                        </>
                    )}

                    {/* Featured product fields */}
                    {type === 'featured' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Original Price</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.originalPrice}
                                        onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
                                    <input
                                        type="number"
                                        value={formData.discount}
                                        onChange={(e) => setFormData({...formData, discount: e.target.value})}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        value={formData.rating}
                                        onChange={(e) => setFormData({...formData, rating: e.target.value})}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </>
                    )}

                    {/* Image field for all types */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                            type="url"
                            value={formData.image}
                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Button fields for hero and promotional */}
                    {(type === 'hero' || type === 'promotional') && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Button Text</label>
                                <input
                                    type="text"
                                    value={formData.buttonText}
                                    onChange={(e) => setFormData({...formData, buttonText: e.target.value})}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Button Link</label>
                                <input
                                    type="text"
                                    value={formData.buttonLink}
                                    onChange={(e) => setFormData({...formData, buttonLink: e.target.value})}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </>
                    )}

                    {/* Promotional-specific fields */}
                    {type === 'promotional' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Banner Type</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="default">Default</option>
                                    <option value="sale">Sale</option>
                                    <option value="new">New</option>
                                    <option value="hot">Hot</option>
                                </select>
                            </div>
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.dismissible}
                                        onChange={(e) => setFormData({...formData, dismissible: e.target.checked})}
                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Dismissible</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.showOnlyForNonLoggedIn}
                                        onChange={(e) => setFormData({...formData, showOnlyForNonLoggedIn: e.target.checked})}
                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Show only for non-logged-in users</span>
                                </label>
                            </div>
                        </>
                    )}

                    {/* Link field for categories */}
                    {type === 'category' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Link</label>
                            <input
                                type="text"
                                value={formData.buttonLink}
                                onChange={(e) => setFormData({...formData, buttonLink: e.target.value})}
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="/products"
                            />
                        </div>
                    )}

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <CheckIcon className="w-4 h-4 mr-2" />
                            {banner ? 'Update' : 'Create'} Banner
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BannerForm;
