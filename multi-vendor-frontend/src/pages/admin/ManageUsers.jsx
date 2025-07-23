import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { useToast } from '../../components/ToastContext';
import { ShieldCheckIcon, Cog6ToothIcon, UserIcon, TrashIcon } from '@heroicons/react/24/outline';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roleUpdating, setRoleUpdating] = useState(null);
  const toast = useToast();

  useEffect(() => {
    api.get('/users/admin', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setUsers(res.data))
      .catch(() => setError('Failed to fetch users'))
      .finally(() => setLoading(false));
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    setRoleUpdating(userId);
    try {
      await api.put(`/users/admin/${userId}/role`, { role: newRole }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
      toast.showToast('User role updated successfully', 'success');
    } catch {
      setError('Failed to update user role');
      toast.showToast('Failed to update user role', 'error');
    } finally {
      setRoleUpdating(null);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This cannot be undone.')) return;
    try {
      await api.delete(`/users/admin/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(users.filter(u => u._id !== userId));
      toast.showToast('User deleted successfully', 'success');
    } catch {
      setError('Failed to delete user');
      toast.showToast('Failed to delete user', 'error');
    }
  };

  // Role icon helper
  const getRoleIcon = (role) => {
    if (role === 'admin') return <ShieldCheckIcon className="inline w-5 h-5 text-indigo-700 mr-1" title="Admin" aria-label="Admin" />;
    if (role === 'vendor') return <Cog6ToothIcon className="inline w-5 h-5 text-pink-700 mr-1" title="Vendor" aria-label="Vendor" />;
    return <UserIcon className="inline w-5 h-5 text-gray-500 mr-1" title="Customer" aria-label="Customer" />;
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-purple-100">
      <h2 className="text-2xl font-bold mb-6 text-pink-700">Manage Users</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {loading ? <div>Loading...</div> : (
        <table className="w-full border rounded-xl overflow-hidden bg-white shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">User ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="hover:bg-pink-50 transition">
                <td className="p-2 border">{user._id}</td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border flex items-center gap-1">{getRoleIcon(user.role)}{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
                <td className="p-2 border flex gap-2 items-center">
                  {user.role === 'customer' && (
                    <button onClick={() => handleRoleChange(user._id, 'vendor')} disabled={roleUpdating === user._id} className="text-blue-600 mr-2 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100">Make Vendor</button>
                  )}
                  {user.role === 'vendor' && (
                    <button onClick={() => handleRoleChange(user._id, 'customer')} disabled={roleUpdating === user._id} className="text-green-600 mr-2 bg-green-50 px-2 py-1 rounded hover:bg-green-100">Make Customer</button>
                  )}
                  {user.role !== 'admin' && (
                    <button onClick={() => handleDeleteUser(user._id)} className="text-red-600 bg-red-50 px-2 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Delete User" title="Delete User"><TrashIcon className="w-5 h-5" /> Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageUsers;
