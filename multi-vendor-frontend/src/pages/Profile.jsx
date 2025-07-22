import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Link } from 'react-router-dom';
import {
  MapPinIcon,
  PlusIcon,
  TrashIcon,
  CheckIcon,
  UserCircleIcon,
  PencilIcon,
  XMarkIcon,
  EyeIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  XCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import Skeleton from '../components/Skeleton';

function EditProfileModal({ open, onClose, user, onSave }) {
    const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        setForm({ name: user?.name || '', email: user?.email || '' });
        setError('');
    }, [user, open]);
    if (!open) return null;
    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = async e => {
        e.preventDefault();
        setSaving(true);
        setError('');
        try {
            // For demo, just update localStorage and call onSave
            const updated = { ...user, ...form };
            localStorage.setItem('user', JSON.stringify(updated));
            onSave(updated);
            onClose();
        } catch {
            setError('Failed to update profile.');
        }
        setSaving(false);
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-pink-500" aria-label="Close" title="Close"><XMarkIcon className="w-6 h-6" /></button>
                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full rounded" required />
                    <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 w-full rounded" required type="email" />
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <div className="flex gap-2 mt-2">
                        <button type="submit" disabled={saving} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded w-full">{saving ? 'Saving...' : 'Save'}</button>
                        <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded w-full">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function AddressModal({ open, onClose, onSave, address }) {
    const [form, setForm] = useState(address || { address: '', city: '', postalCode: '', country: '' });
    useEffect(() => {
        setForm(address || { address: '', city: '', postalCode: '', country: '' });
    }, [address, open]);
    if (!open) return null;
    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = e => {
        e.preventDefault();
        onSave(form);
        onClose();
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-pink-500"><XMarkIcon className="w-6 h-6" /></button>
                <h2 className="text-xl font-bold mb-4">{address ? 'Edit Address' : 'Add Address'}</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border p-2 w-full rounded" required />
                    <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="border p-2 w-full rounded" required />
                    <input name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Postal Code" className="border p-2 w-full rounded" required />
                    <input name="country" value={form.country} onChange={handleChange} placeholder="Country" className="border p-2 w-full rounded" required />
                    <div className="flex gap-2 mt-2">
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded w-full">Save</button>
                        <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded w-full">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function Profile() {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editOpen, setEditOpen] = useState(false);
    const [addresses, setAddresses] = useState(() => {
        const stored = localStorage.getItem('addresses');
        return stored ? JSON.parse(stored) : [];
    });
    const [addressModalOpen, setAddressModalOpen] = useState(false);
    const [editAddressIdx, setEditAddressIdx] = useState(null);
    const [defaultIdx, setDefaultIdx] = useState(() => {
        const stored = localStorage.getItem('defaultAddressIdx');
        return stored ? Number(stored) : 0;
    });
    useEffect(() => {
        // Fetch user from localStorage
        const stored = localStorage.getItem('user');
        if (stored) setUser(JSON.parse(stored));
        // Fetch orders
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await api.get('/orders/my-orders', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(res.data);
            } catch {}
            setLoading(false);
        };
        fetchOrders();
    }, []);

    const getStatusIcon = (status) => {
        if (status === 'Delivered') return <CheckCircleIcon className="text-green-500 inline mr-1 w-5 h-5" />;
        if (status === 'Shipped') return <TruckIcon className="text-blue-700 inline mr-1 w-5 h-5" />;
        if (status === 'Pending') return <ClockIcon className="text-orange-500 inline mr-1 w-5 h-5" />;
        if (status === 'Cancelled') return <XCircleIcon className="text-red-500 inline mr-1 w-5 h-5" />;
        return <ClockIcon className="text-gray-400 inline mr-1 w-5 h-5" />;
    };

    // Address book handlers
    const handleAddAddress = (addr) => {
        const newAddresses = [...addresses, addr];
        setAddresses(newAddresses);
        localStorage.setItem('addresses', JSON.stringify(newAddresses));
    };
    const handleEditAddress = (addr) => {
        const newAddresses = addresses.map((a, i) => i === editAddressIdx ? addr : a);
        setAddresses(newAddresses);
        localStorage.setItem('addresses', JSON.stringify(newAddresses));
        setEditAddressIdx(null);
    };
    const handleDeleteAddress = (idx) => {
        const newAddresses = addresses.filter((_, i) => i !== idx);
        setAddresses(newAddresses);
        localStorage.setItem('addresses', JSON.stringify(newAddresses));
        if (defaultIdx === idx) setDefaultIdx(0);
    };
    const handleSetDefault = (idx) => {
        setDefaultIdx(idx);
        localStorage.setItem('defaultAddressIdx', idx);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    if (!user) return <div className="text-center py-10">Loading...</div>;

    // Admin or Vendor Profile
    if (user.role === 'admin' || user.role === 'vendor') {
        return (
            <div className="max-w-2xl mx-auto py-10 px-4">
                <div className="flex flex-col items-center mb-8">
                    <UserCircleIcon className="w-24 h-24 text-pink-200" />
                    <h2 className="text-3xl font-extrabold mt-4 text-pink-700">
                        {user.role === 'admin' ? 'Admin Profile' : 'Vendor Profile'}
                    </h2>
                    <span className={`mt-2 px-3 py-1 rounded-full font-semibold ${user.role === 'admin' ? 'bg-pink-100 text-pink-700' : 'bg-indigo-100 text-indigo-700'}`}>Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                    <p className="text-gray-700 text-lg mt-2">{user.name}</p>
                    <p className="text-gray-500">{user.email}</p>
                    <button onClick={() => setEditOpen(true)} className="mt-4 flex items-center gap-1 text-indigo-600 hover:underline" aria-label="Edit Profile" title="Edit Profile"><PencilIcon className="w-5 h-5" /> Edit Profile</button>
                    <button onClick={handleLogout} className="mt-4 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full shadow transition-all duration-200 text-lg active:scale-95" aria-label="Logout" title="Logout">
                        <ArrowRightOnRectangleIcon className="w-6 h-6" /> Logout
                    </button>
                </div>
                {user.role === 'admin' && (
                    <div className="bg-white rounded-lg shadow p-6 mb-8">
                        <h3 className="text-lg font-semibold mb-2 text-pink-700">Admin Capabilities</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-1">
                            <li>Manage all products (add, edit, delete)</li>
                            <li>View and manage all users (change roles)</li>
                            <li>View and manage all orders (approve, update status)</li>
                            <li>Access advanced analytics (if implemented)</li>
                        </ul>
                    </div>
                )}
                {user.role === 'vendor' && (
                    <div className="bg-white rounded-lg shadow p-6 mb-8">
                        <h3 className="text-lg font-semibold mb-2 text-indigo-700">Vendor Capabilities</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-1">
                            <li>Manage your own products (add, edit, delete)</li>
                            <li>View and manage your orders</li>
                            <li>Access vendor dashboard</li>
                        </ul>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} user={user} onSave={setUser} />
            <AddressModal
                open={addressModalOpen !== false}
                onClose={() => { setAddressModalOpen(false); setEditAddressIdx(null); }}
                address={typeof addressModalOpen === 'number' ? addresses[addressModalOpen] : null}
                onSave={editAddressIdx !== null ? handleEditAddress : handleAddAddress}
            />
            <div className="flex flex-col items-center mb-8">
                {user?.profilePic ? (
                    <img src={user.profilePic} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-pink-400" />
                ) : (
                    <UserCircleIcon className="w-24 h-24 text-pink-200" />
                )}
                <h2 className="text-2xl font-bold mt-4">{user?.name || 'Customer'}</h2>
                <p className="text-gray-500">{user?.email}</p>
                <button onClick={() => setEditOpen(true)} className="mt-2 flex items-center gap-1 text-indigo-600 hover:underline" aria-label="Edit Profile" title="Edit Profile"><PencilIcon className="w-5 h-5" /> Edit Profile</button>
                {/* Logout button below profile info */}
                <button onClick={handleLogout} className="mt-4 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full shadow transition-all duration-200 text-lg active:scale-95" aria-label="Logout" title="Logout">
                    <ArrowRightOnRectangleIcon className="w-6 h-6" /> Logout
                </button>
            </div>
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2"><MapPinIcon className="w-5 h-5" /> Address Book</h3>
                    <button onClick={() => { setAddressModalOpen(true); setEditAddressIdx(null); }} className="flex items-center gap-1 text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded" aria-label="Add Address" title="Add Address"><PlusIcon className="w-5 h-5" /> Add Address</button>
                </div>
                {addresses.length === 0 ? (
                    <div className="text-gray-500">No addresses saved.</div>
                ) : (
                    <div className="space-y-3">
                        {addresses.map((addr, idx) => (
                            <div key={idx} className={`flex flex-col md:flex-row md:items-center justify-between gap-2 p-3 border rounded ${defaultIdx === idx ? 'bg-indigo-50 border-indigo-400' : ''}`}>
                                <div>
                                    <div className="font-semibold">{addr.address}, {addr.city}, {addr.country}</div>
                                    <div className="text-xs text-gray-500">Postal: {addr.postalCode}</div>
                                </div>
                                <div className="flex gap-2 items-center mt-2 md:mt-0">
                                    <button onClick={() => { setAddressModalOpen(idx); setEditAddressIdx(idx); }} className="text-blue-600 hover:underline flex items-center gap-1" aria-label="Edit Address" title="Edit Address"><PencilIcon className="w-5 h-5" /> Edit</button>
                                    <button onClick={() => handleDeleteAddress(idx)} className="text-red-600 hover:underline flex items-center gap-1" aria-label="Delete Address" title="Delete Address"><TrashIcon className="w-5 h-5" /> Delete</button>
                                    <button onClick={() => handleSetDefault(idx)} className={`flex items-center gap-1 ${defaultIdx === idx ? 'text-green-600 font-bold' : 'text-gray-400 hover:text-green-600'}`} aria-label={defaultIdx === idx ? 'Default Address' : 'Set as Default'} title={defaultIdx === idx ? 'Default Address' : 'Set as Default'}><CheckIcon className="w-5 h-5" /> {defaultIdx === idx ? 'Default' : 'Set Default'}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Order History</h3>
                {loading ? (
                    <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <div key={idx} className="border-b pb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <Skeleton width="w-1/3" height="h-6" />
                                    <Skeleton width="w-1/4" height="h-4" />
                                </div>
                                <div className="flex flex-wrap gap-4 items-center mb-2">
                                    {Array.from({ length: 2 }).map((_, i) => (
                                        <Skeleton key={i} width="w-16" height="h-16" className="rounded" />
                                    ))}
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <Skeleton width="w-1/4" height="h-6" />
                                    <Skeleton width="w-1/6" height="h-6" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-gray-500">No orders found.</div>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order._id} className="border-b pb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">Order #{order._id.slice(-6)}</span>
                                        <span className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <span className="text-sm font-medium flex items-center gap-1">{getStatusIcon(order.status)}{order.status}</span>
                                </div>
                                <div className="flex flex-wrap gap-4 items-center">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex flex-col items-center">
                                            {item.image && (
                                                <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded" />
                                            )}
                                            <span className="text-xs text-gray-700 mt-1">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <div className="text-indigo-700 font-bold">Total: ${order.totalPrice}</div>
                                    <Link to={`/order/${order._id}`} className="flex items-center gap-1 text-sm text-indigo-600 hover:underline" aria-label="View Order Details" title="View Order Details"><EyeIcon className="w-5 h-5" /> View Details</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile; 