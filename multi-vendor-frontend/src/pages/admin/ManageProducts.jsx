import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { useToast } from '../../components/ToastContext';

function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({ name: '', price: '', description: '', category: '' });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const toast = useToast();

    // Fetch all products
    useEffect(() => {
        api.get('/products')
            .then(res => setProducts(res.data))
            .catch(() => setError('Failed to fetch products'))
            .finally(() => setLoading(false));
    }, []);

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

            if (editingId) {
                await api.put(`/products/${editingId}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                const res = await api.get('/products');
                setProducts(res.data);
                setEditingId(null);
                toast.showToast('Product updated successfully!', 'success');
            } else {
                const res = await api.post('/products', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setProducts([...products, res.data]);
                toast.showToast('Product added successfully!', 'success');
            }
            setForm({ name: '', price: '', description: '', category: '' });
            setImage(null);
            setImagePreview(null);
        } catch (err) {
            toast.showToast('Failed to save product', 'error');
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
        if (!window.confirm('Delete this product?')) return;
        try {
            await api.delete(`/products/${id}`);
            setProducts(products.filter(p => p._id !== id));
            toast.showToast('Product deleted!', 'success');
        } catch (err) {
            toast.showToast('Failed to delete product', 'error');
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Manage Products</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <form onSubmit={handleSubmit} className="mb-6 space-y-2" encType="multipart/form-data">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 mr-2" required />
                <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="border p-2 mr-2" required />
                <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 mr-2" required />
                <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border p-2 mr-2" />
                <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 mr-2" />
                {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded mb-2" />
                )}
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition-all duration-200">{editingId ? 'Update' : 'Add'} Product</button>
                {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', price: '', description: '', category: '' }); setImage(null); setImagePreview(null); }} className="ml-2 text-gray-600">Cancel</button>}
            </form>
            {loading ? <div>Loading...</div> : (
                products.length === 0 ? (
                    <div className="text-gray-500 text-center py-8">No products found. Add your first product above!</div>
                ) : (
                    <table className="w-full border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border">Name</th>
                                <th className="p-2 border">Price</th>
                                <th className="p-2 border">Description</th>
                                <th className="p-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td className="p-2 border">{product.name}</td>
                                    <td className="p-2 border">{product.price}</td>
                                    <td className="p-2 border">{product.description}</td>
                                    <td className="p-2 border">
                                        <button onClick={() => handleEdit(product)} className="text-blue-600 hover:underline mr-2">Edit</button>
                                        <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            )}
        </div>
    );
}

export default ManageProducts;
