import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { useToast } from '../../components/ToastContext';

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [roleUpdates, setRoleUpdates] = useState({});
    const toast = useToast();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await api.get('/users/admin', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(res.data);
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleRoleChange = (userId, newRole) => {
        setRoleUpdates({ ...roleUpdates, [userId]: newRole });
    };

    const handleUpdateRole = async (userId) => {
        const newRole = roleUpdates[userId];
        if (!newRole) return;
        try {
            const token = localStorage.getItem('token');
            await api.put(`/users/admin/${userId}/role`, { role: newRole }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
            toast.showToast('User role updated successfully', 'success');
        } catch (err) {
            toast.showToast('Failed to update user role', 'error');
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                users.length === 0 ? (
                    <div className="text-gray-500 text-center py-8">No users found.</div>
                ) : (
                    <table className="w-full border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border">Name</th>
                                <th className="p-2 border">Email</th>
                                <th className="p-2 border">Role</th>
                                <th className="p-2 border">Change Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td className="p-2 border">{user.name}</td>
                                    <td className="p-2 border">{user.email}</td>
                                    <td className="p-2 border">{user.role}</td>
                                    <td className="p-2 border">
                                        <select
                                            value={roleUpdates[user._id] || user.role}
                                            onChange={e => handleRoleChange(user._id, e.target.value)}
                                            className="border p-1 mr-2"
                                        >
                                            <option value="customer">Customer</option>
                                            <option value="vendor">Vendor</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        <button
                                            onClick={() => handleUpdateRole(user._id)}
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded transition-all duration-200"
                                            disabled={(roleUpdates[user._id] || user.role) === user.role}
                                        >
                                            Update
                                        </button>
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

export default ManageUsers;
