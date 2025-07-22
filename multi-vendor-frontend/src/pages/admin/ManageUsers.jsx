import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { useToast } from '../../components/ToastContext';
import { ShieldCheckIcon, Cog6ToothIcon, UserIcon } from '@heroicons/react/24/outline';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roleUpdating, setRoleUpdating] = useState(null);
  const toast = useToast();

  useEffect(() => {
    api.get('/users/admin')
      .then(res => setUsers(res.data))
      .catch(() => setError('Failed to fetch users'))
      .finally(() => setLoading(false));
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    setRoleUpdating(userId);
    try {
      await api.put(`/users/admin/${userId}/role`, { role: newRole });
      setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
      toast.showToast('User role updated successfully', 'success');
    } catch {
      setError('Failed to update user role');
      toast.showToast('Failed to update user role', 'error');
    } finally {
      setRoleUpdating(null);
    }
  };

  // Role icon helper
  const getRoleIcon = (role) => {
    if (role === 'admin') return <ShieldCheckIcon className="inline w-5 h-5 text-indigo-700 mr-1" title="Admin" aria-label="Admin" />;
    if (role === 'vendor') return <Cog6ToothIcon className="inline w-5 h-5 text-pink-700 mr-1" title="Vendor" aria-label="Vendor" />;
    return <UserIcon className="inline w-5 h-5 text-gray-500 mr-1" title="Customer" aria-label="Customer" />;
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {loading ? <div>Loading...</div> : (
        <table className="w-full border">
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
              <tr key={user._id}>
                <td className="p-2 border">{user._id}</td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border flex items-center gap-1">{getRoleIcon(user.role)}{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
                <td className="p-2 border">
                  {user.role === 'customer' && (
                    <button onClick={() => handleRoleChange(user._id, 'vendor')} disabled={roleUpdating === user._id} className="text-blue-600 mr-2">Make Vendor</button>
                  )}
                  {user.role === 'vendor' && (
                    <button onClick={() => handleRoleChange(user._id, 'customer')} disabled={roleUpdating === user._id} className="text-green-600 mr-2">Make Customer</button>
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
