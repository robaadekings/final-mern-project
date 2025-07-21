import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { useToast } from '../../components/ToastContext';
import { ShieldCheckIcon, Cog6ToothIcon, UserIcon } from '@heroicons/react/24/outline';

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

    // Role icon helper
    const getRoleIcon = (role) => {
        if (role === 'admin') return <ShieldCheckIcon className="inline w-5 h-5 text-indigo-700 mr-1" title="Admin" aria-label="Admin" />;
        if (role === 'vendor') return <Cog6ToothIcon className="inline w-5 h-5 text-pink-700 mr-1" title="Vendor" aria-label="Vendor" />;
        return <UserIcon className="inline w-5 h-5 text-gray-500 mr-1" title="Customer" aria-label="Customer" />;
    };

    return (
        <div className="p-2 md:p-8">
            <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
            {error && (
              <div className="text-red-600 mb-2 flex flex-col items-center">
                {error}
                <button onClick={() => window.location.reload()} className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded">Retry</button>
              </div>
            )}
            {loading ? (
                <div>Loading...</div>
            ) : (
                users.length === 0 ? (
                    <div className="text-gray-500 text-center py-8">No users found.</div>
                ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full border min-w-[600px]">
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
                                      <td className="p-2 border flex items-center gap-1">{getRoleIcon(user.role)}{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
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
                    </div>
                )
            )}
        </div>
    );
}

export default ManageUsers;
