import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { useToast } from '../../components/ToastContext';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/solid';
import { PencilIcon, TrashIcon, CheckIcon, EyeIcon } from '@heroicons/react/24/outline';
import ProductCard from '../../components/ProductCard';
import Footer from '../../components/Footer';

function ProductModal({ product, open, onClose, onSave }) {
    const [form, setForm] = useState(product || {});
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(product?.imageUrl || '');
    useEffect(() => {
        setForm(product || {});
        setImagePreview(product?.imageUrl || '');
    }, [product]);
    if (!open || !product) return null;
    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    const handleImageChange = e => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(product.imageUrl || '');
        }
    };
    const handleSubmit = e => {
        e.preventDefault();
        onSave(form, image);
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-2xl">&times;</button>
                <h2 className="text-xl font-bold mb-4">Product Details</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input name="name" value={form.name || ''} onChange={handleChange} placeholder="Name" className="border p-2 w-full" required />
                    <input name="price" value={form.price || ''} onChange={handleChange} placeholder="Price" type="number" className="border p-2 w-full" required />
                    <input name="category" value={form.category || ''} onChange={handleChange} placeholder="Category" className="border p-2 w-full" />
                    <textarea name="description" value={form.description || ''} onChange={handleChange} placeholder="Description" className="border p-2 w-full" rows={3} />
                    <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 w-full" />
                    {imagePreview && <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded mb-2" />}
                    <div className="flex gap-2 mt-2">
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">Save</button>
                        <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({ name: '', price: '', description: '', category: '' });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('date-desc');
    const toast = useToast();
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [modalProduct, setModalProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    // Filter, search, and sort products
    let filteredProducts = products.filter(product => {
        if (filter === 'approved') return product.approved;
        if (filter === 'pending') return !product.approved;
        return true;
    });
    if (search) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            (product.category && product.category.toLowerCase().includes(search.toLowerCase()))
        );
    }
    if (sort === 'name-asc') filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'name-desc') filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === 'price-asc') filteredProducts.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') filteredProducts.sort((a, b) => b.price - a.price);
    if (sort === 'status') filteredProducts.sort((a, b) => (b.approved ? 1 : 0) - (a.approved ? 1 : 0));
    if (sort === 'date-desc') filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sort === 'date-asc') filteredProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    const totalPages = Math.ceil(filteredProducts.length / pageSize);
    const paginatedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

    // Fetch all products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await api.get('/products?all=true', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProducts(res.data);
            } catch (err) {
                setError(`Failed to fetch products: ${err.message}`);
                console.error('Failed to fetch products:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Enhanced status badge
    const getStatusBadge = (approved) =>
        approved ? (
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                <CheckCircleIcon className="w-4 h-4 inline" /> Customer-visible
            </span>
        ) : (
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-full">
                <ClockIcon className="w-4 h-4 inline" /> Pending
            </span>
        );

    // Handle form input
    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleImageChange = e => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    // Main product categories (will be fetched from backend)
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/products/categories');
                setCategories(res.data.map(c => c.name));
            } catch (err) {
                // fallback to default
                setCategories([
                    'Electronics', 'Fashion', 'Home & Kitchen', 'Beauty & Personal Care', 'Sports & Outdoors',
                    'Toys & Games', 'Automotive', 'Books', 'Health', 'Grocery', 'Office Supplies', 'Jewelry', 'Shoes', 'Garden', 'Pet Supplies'
                ]);
            }
        };
        fetchCategories();
    }, []);

    // Add or update product
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('name', form.name);
            data.append('price', form.price);
            data.append('description', form.description);
            data.append('category', form.category);
            if (image) data.append('image', image);

            const token = localStorage.getItem('token');
            if (editingId) {
                await api.put(`/products/${editingId}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
                });
                const res = await api.get('/products?all=true', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProducts(res.data);
                setEditingId(null);
                toast.showToast('Product updated successfully!', 'success');
            } else {
                const res = await api.post('/products', data, {
                    headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
                });
                setProducts([res.data, ...products]); // Add new product to the top
                toast.showToast('Product added successfully!', 'success');
            }
            setForm({ name: '', price: '', description: '', category: '' });
            setImage(null);
            setImagePreview(null);
        } catch (err) {
            toast.showToast('Failed to save product', 'error');
            console.error('Failed to save product:', err.response ? err.response.data : err);
        }
    };

    // Edit product
    const handleEdit = product => {
        setForm({ name: product.name, price: product.price, description: product.description, category: product.category || '' });
        setEditingId(product._id);
        setImagePreview(product.imageUrl ? product.imageUrl : null);
    };

    // Delete product
    const handleDelete = async id => {
        if (!window.confirm('Are you sure you want to delete this product? This cannot be undone.')) return;
        try {
            const token = localStorage.getItem('token');
            await api.delete(`/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(products.filter(p => p._id !== id));
            toast.showToast('Product deleted!', 'success');
        } catch (err) {
            toast.showToast('Failed to delete product', 'error');
            console.error('Failed to delete product:', err);
        }
    };
    // Approve product
    const handleApprove = async (id) => {
        if (!window.confirm('Approve this product?')) return;
        try {
            const token = localStorage.getItem('token');
            await api.put(`/products/${id}/approve`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(products.map(p => p._id === id ? { ...p, approved: true } : p));
            toast.showToast('Product approved!', 'success');
        } catch (err) {
            toast.showToast('Failed to approve product', 'error');
            console.error('Failed to approve product:', err);
        }
    };

    // Bulk Approve
    const handleBulkApprove = async () => {
        if (!window.confirm('Approve all selected products?')) return;
        try {
            const token = localStorage.getItem('token');
            await Promise.all(selected.map(id => api.put(`/products/${id}/approve`, {}, { headers: { Authorization: `Bearer ${token}` } })));
            setProducts(products.map(p => selected.includes(p._id) ? { ...p, approved: true } : p));
            setSelected([]);
            setSelectAll(false);
            toast.showToast('Selected products approved!', 'success');
        } catch (err) {
            toast.showToast('Failed to approve selected products', 'error');
            console.error('Failed to approve selected products:', err);
        }
    };
    // Bulk Delete
    const handleBulkDelete = async () => {
        if (!window.confirm('Delete all selected products? This cannot be undone.')) return;
        try {
            const token = localStorage.getItem('token');
            await Promise.all(selected.map(id => api.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } })));
            setProducts(products.filter(p => !selected.includes(p._id)));
            setSelected([]);
            setSelectAll(false);
            toast.showToast('Selected products deleted!', 'success');
        } catch (err) {
            toast.showToast('Failed to delete selected products', 'error');
            console.error('Failed to delete selected products:', err);
        }
    };
    // Handle row checkbox
    const handleSelect = (id) => {
        setSelected(selected.includes(id) ? selected.filter(sid => sid !== id) : [...selected, id]);
    };
    // Handle select all
    const handleSelectAll = () => {
        if (selectAll) {
            setSelected([]);
            setSelectAll(false);
        } else {
            setSelected(filteredProducts.map(p => p._id));
            setSelectAll(true);
        }
    };

    // Save from modal
    const handleModalSave = async (form, image) => {
        try {
            const data = new FormData();
            data.append('name', form.name);
            data.append('price', form.price);
            data.append('description', form.description);
            data.append('category', form.category);
            if (image) data.append('image', image);
            const token = localStorage.getItem('token');
            await api.put(`/products/${form._id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
            });
            const res = await api.get('/products?all=true', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(res.data);
            setModalOpen(false);
            setModalProduct(null);
            toast.showToast('Product updated successfully!', 'success');
        } catch (err) {
            toast.showToast('Failed to update product', 'error');
            console.error('Failed to update product:', err);
        }
    };

    // Split products into approved, pending, and vendor-pending
    const pendingVendorProducts = products.filter(p => !p.approved && p.vendor);
    const otherProducts = products.filter(p => p.approved || !p.vendor);

    return (
        <>
            <div className="p-2 md:p-8 min-h-screen relative overflow-hidden" style={{
                background: 'linear-gradient(135deg, #f3e8ff 0%, #ffe4e6 50%, #e0e7ff 100%)',
            }}>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-20" style={{background: 'url(\"https://www.toptal.com/designers/subtlepatterns/patterns/memphis-mini.png\") repeat'}} />
                <ProductModal product={modalProduct} open={modalOpen} onClose={() => { setModalOpen(false); setModalProduct(null); }} onSave={handleModalSave} />
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-pink-700">Manage Products</h2>
                    <a href="/products" target="_blank" rel="noopener noreferrer" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow font-semibold transition-all">View All Products</a>
                </div>
                <div className="mb-4 flex flex-wrap gap-2 items-center bg-white bg-opacity-80 rounded-lg shadow p-4 sticky top-[72px] z-40" style={{zIndex: 40}}>
                    <label className="font-medium">Show:</label>
                    <select value={filter} onChange={e => setFilter(e.target.value)} className="border p-1 rounded">
                        <option value="all">All</option>
                        <option value="approved">Customer-visible</option>
                        <option value="pending">Pending Approval</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Search name or category..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="border p-1 rounded ml-4"
                    />
                    <label className="font-medium ml-4">Sort by:</label>
                    <select value={sort} onChange={e => setSort(e.target.value)} className="border p-1 rounded">
                        <option value="date-desc">Newest</option>
                        <option value="date-asc">Oldest</option>
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="price-asc">Price (Low-High)</option>
                        <option value="price-desc">Price (High-Low)</option>
                        <option value="status">Status</option>
                    </select>
                </div>
                {error && <div className="text-red-600 mb-2 flex flex-col items-center">{error}</div>}
                <form onSubmit={handleSubmit} className="mb-6 space-y-2" encType="multipart/form-data">
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 mr-2" required />
                    <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="border p-2 mr-2" required />
                    <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 mr-2" required />
                    <div className="flex flex-col md:flex-row gap-2 md:items-center">
                        <select
                            value={categories.includes(form.category) ? form.category : ''}
                            onChange={e => setForm({ ...form, category: e.target.value })}
                            className="border p-2 mr-2 min-w-[180px]"
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <input
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            placeholder="Or type a category"
                            className="border p-2 mr-2"
                        />
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 mr-2" />
                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded mb-2" />
                    )}
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition-all duration-200">{editingId ? 'Update' : 'Add'} Product</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', price: '', description: '', category: '' }); setImage(null); setImagePreview(null); }} className="ml-2 text-gray-600">Cancel</button>}
                </form>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main product table (left) */}
                    <div className="flex-1 bg-white bg-opacity-90 rounded-xl shadow-lg p-4 overflow-x-auto">
                        {loading ? <div>Loading...</div> : (
                            filteredProducts.length === 0 ? (
                                <div className="text-gray-500 text-center py-8">No products found for this filter.</div>
                            ) : (
                                <table className="w-full border min-w-[900px] rounded-xl overflow-hidden">
                                    <thead className="sticky top-0 z-10 bg-gray-100">
                                        <tr>
                                            <th className="p-2 border font-bold"><input type="checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
                                            <th className="p-2 border font-bold">Name</th>
                                            <th className="p-2 border font-bold">Price</th>
                                            <th className="p-2 border font-bold">Description</th>
                                            <th className="p-2 border font-bold">Category</th>
                                            <th className="p-2 border font-bold">Vendor</th>
                                            <th className="p-2 border font-bold">Status</th>
                                            <th className="p-2 border font-bold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedProducts.map(product => (
                                            <tr key={product._id} className={selected.includes(product._id) ? 'bg-indigo-50' : 'hover:bg-pink-50 transition'} onClick={e => { if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') { setModalProduct(product); setModalOpen(true); }}} style={{ cursor: 'pointer' }}>
                                                <td className="p-2 border text-center">
                                                    <input type="checkbox" checked={selected.includes(product._id)} onChange={() => handleSelect(product._id)} onClick={e => e.stopPropagation()} />
                                                </td>
                                                <td className="p-2 border font-semibold text-pink-700">{product.name}</td>
                                                <td className="p-2 border">{product.price}</td>
                                                <td className="p-2 border text-gray-600">{product.description}</td>
                                                <td className="p-2 border text-indigo-700 font-medium">{product.category}</td>
                                                <td className="p-2 border">{product.vendor ? `${product.vendor.name || ''} (${product.vendor.email || ''})` : <span className="text-gray-400">Admin</span>}</td>
                                                <td className="p-2 border">{getStatusBadge(product.approved)}</td>
                                                <td className="p-2 border">
                                                    <button onClick={e => { e.stopPropagation(); handleEdit(product); }} className="text-blue-600 hover:underline mr-2 flex items-center gap-1" aria-label="Edit" title="Edit"><PencilIcon className="w-5 h-5" /> Edit</button>
                                                    <button onClick={e => { e.stopPropagation(); handleDelete(product._id); }} className="text-red-600 hover:underline flex items-center gap-1" aria-label="Delete" title="Delete"><TrashIcon className="w-5 h-5" /> Delete</button>
                                                    {!product.approved && (
                                                        <button onClick={e => { e.stopPropagation(); handleApprove(product._id); }} className="ml-2 bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded transition-all duration-200 flex items-center gap-1" aria-label="Approve" title="Approve"><CheckIcon className="w-5 h-5" /> Approve</button>
                                                    )}
                                                    <button onClick={e => { e.stopPropagation(); setModalProduct(product); setModalOpen(true); }} className="ml-2 text-gray-600 hover:text-indigo-600 flex items-center gap-1" aria-label="View" title="View"><EyeIcon className="w-5 h-5" /> View</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )
                        )}
                    </div>
                    {/* Pending vendor products (right) */}
                    <div className="w-full lg:w-[350px] flex-shrink-0 bg-white bg-opacity-90 rounded-xl shadow-lg p-4 h-fit mt-8 lg:mt-0">
                        <h3 className="text-lg font-bold mb-4 text-orange-700 flex items-center gap-2"><ClockIcon className="w-6 h-6" /> Pending Vendor Products</h3>
                        {pendingVendorProducts.length === 0 ? (
                            <div className="text-gray-400 text-center">No pending vendor products.</div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {pendingVendorProducts.map(product => (
                                    <div key={product._id} className="bg-orange-50 rounded-lg shadow p-3 flex flex-col gap-2">
                                        <div className="flex items-center gap-3">
                                            {product.image && (
                                                <img src={`https://final-mern-project-g5mi.onrender.com/uploads/${product.image}`} alt={product.name} className="w-16 h-16 object-cover rounded" />
                                            )}
                                            <div className="flex-1">
                                                <div className="font-bold text-orange-800 truncate">{product.name}</div>
                                                <div className="text-xs text-gray-500 truncate">{product.category}</div>
                                                <div className="text-xs text-gray-500">Vendor: {product.vendor?.name || 'N/A'}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            <button onClick={() => handleApprove(product._id)} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1 rounded text-xs">Approve</button>
                                            <button onClick={() => handleDelete(product._id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded text-xs">Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button onClick={() => setPage(page - 1)} disabled={page === 1} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">Prev</button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button key={i+1} onClick={() => setPage(i+1)} className={`px-3 py-1 rounded ${page === i+1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>{i+1}</button>
                    ))}
                    <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">Next</button>
                </div>
            </div>
            <Footer admin={true} />
        </>
    );
}

export default ManageProducts;
