import { useEffect, useState } from 'react';
import api from '../../lib/api';
import Footer from '../../components/Footer';

function ManageCategories() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editingCategoryName, setEditingCategoryName] = useState('');
    const [error, setError] = useState('');

    const fetchCategories = async () => {
        try {
            const res = await api.get('/products/categories', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setCategories(res.data);
        } catch (err) {
            setError('Failed to fetch categories');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;
        try {
            await api.post('/products/categories', { name: newCategory.trim() }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setNewCategory('');
            fetchCategories();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add category');
        }
    };

    const handleEditCategory = (id, name) => {
        setEditingCategoryId(id);
        setEditingCategoryName(name);
    };

    const handleUpdateCategory = async (id) => {
        if (!editingCategoryName.trim()) return;
        try {
            await api.put(`/products/categories/${id}`, { name: editingCategoryName.trim() }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setEditingCategoryId(null);
            setEditingCategoryName('');
            fetchCategories();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update category');
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm('Delete this category?')) return;
        try {
            await api.delete(`/products/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            fetchCategories();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete category');
        }
    };

    return (
        <>
            <div className="max-w-2xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>
                {error && <div className="text-red-600 mb-4">{error}</div>}
                <form onSubmit={handleAddCategory} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={newCategory}
                        onChange={e => setNewCategory(e.target.value)}
                        placeholder="Add new category"
                        className="border p-2 rounded flex-1"
                    />
                    <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded">Add</button>
                </form>
                <ul className="space-y-2">
                    {categories.map((cat) => (
                        <li key={cat._id} className="flex items-center gap-2">
                            {editingCategoryId === cat._id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editingCategoryName}
                                        onChange={e => setEditingCategoryName(e.target.value)}
                                        className="border p-1 rounded"
                                    />
                                    <button onClick={() => handleUpdateCategory(cat._id)} className="text-green-600">Save</button>
                                    <button onClick={() => { setEditingCategoryId(null); setEditingCategoryName(''); }} className="text-gray-600">Cancel</button>
                                </>
                            ) : (
                                <>
                                    <span>{cat.name}</span>
                                    <button onClick={() => handleEditCategory(cat._id, cat.name)} className="text-blue-600">Edit</button>
                                    <button onClick={() => handleDeleteCategory(cat._id)} className="text-red-600">Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <Footer admin={true} />
        </>
    );
}

export default ManageCategories; 