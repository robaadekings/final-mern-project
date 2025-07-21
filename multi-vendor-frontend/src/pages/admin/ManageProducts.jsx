import { useEffect, useState } from 'react';
import api from '../../lib/api';

function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({ name: '', price: '', description: '' });
    const [editingId, setEditingId] = useState(null);

    // Fetch all products
    useEffect(() => {
        api.get('/products')
            .then(res => setProducts(res.data))
            .catch(err => setError('Failed to fetch products'))
            .finally(() => setLoading(false));
    }, []);

    // Handle form input
    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Add or update product
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/products/${editingId}`, form);
                setProducts(products.map(p => p._id === editingId ? { ...p, ...form } : p));
                setEditingId(null);
            } else {
                const res = await api.post('/products', form);
                setProducts([...products, res.data]);
            }
            setForm({ name: '', price: '', description: '' });
        } catch (err) {
            setError('Failed to save product');
        }
    };

    // Edit product
    const handleEdit = product => {
        setForm({ name: product.name, price: product.price, description: product.description });
        setEditingId(product._id);
    };

    // Delete product
    const handleDelete = async id => {
        if (!window.confirm('Delete this product?')) return;
        try {
            await api.delete(`/products/${id}`);
            setProducts(products.filter(p => p._id !== id));
        } catch (err) {
            setError('Failed to delete product');
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Manage Products</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <form onSubmit={handleSubmit} className="mb-6 space-y-2">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 mr-2" required />
                <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="border p-2 mr-2" required />
                <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 mr-2" required />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Add'} Product</button>
                {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', price: '', description: '' }); }} className="ml-2 text-gray-600">Cancel</button>}
            </form>
            {loading ? <div>Loading...</div> : (
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
                                    <button onClick={() => handleEdit(product)} className="text-blue-600 mr-2">Edit</button>
                                    <button onClick={() => handleDelete(product._id)} className="text-red-600">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ManageProducts;
