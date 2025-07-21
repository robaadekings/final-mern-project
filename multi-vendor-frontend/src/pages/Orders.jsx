import { useEffect, useState } from 'react';
import api from '../lib/api';
import { CheckCircleIcon, ClockIcon, XCircleIcon, TruckIcon, CreditCardIcon } from '@heroicons/react/24/outline';

const statusStyles = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Processing: 'bg-blue-100 text-blue-800',
  Shipped: 'bg-indigo-100 text-indigo-800',
  Delivered: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};
const statusIcons = {
  Pending: <ClockIcon className="w-5 h-5 inline mr-1" />,
  Processing: <CreditCardIcon className="w-5 h-5 inline mr-1" />,
  Shipped: <TruckIcon className="w-5 h-5 inline mr-1" />,
  Delivered: <CheckCircleIcon className="w-5 h-5 inline mr-1" />,
  Cancelled: <XCircleIcon className="w-5 h-5 inline mr-1" />,
};

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You must be logged in to view orders.');
                setLoading(false);
                return;
            }

            try {
                const res = await api.get('/orders/my-orders', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(res.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Tracked Orders</h1>
            {orders.length === 0 ? (
                <p className="text-gray-500">No orders found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {orders.map((order) => (
                    <div key={order._id} className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-xl shadow-2xl p-6 flex flex-col gap-3 border border-gray-100 hover:shadow-2xl transition">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="font-semibold text-lg">Order #{order._id.slice(-6)}</h2>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[order.status] || 'bg-gray-100 text-gray-700'}`}
                          title={order.status}
                        >
                          {statusIcons[order.status] || <ClockIcon className="w-5 h-5 inline mr-1" />} {order.status}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 mb-2">
                        <span className="text-gray-500 text-sm">Total: <span className="font-bold text-indigo-700">${order.totalPrice}</span></span>
                        <span className="text-gray-500 text-sm">Placed: {new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-600 font-medium text-sm">Items:</span>
                        <ul className="pl-4 mt-1 space-y-1">
                          {order.items.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded" />
                              <span className="font-semibold">{item.name}</span>
                              <span className="text-gray-400">x{item.qty}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-end">
                        <a href={`/orders/${order._id}`} className="text-indigo-600 hover:underline text-sm font-medium">View Details</a>
                      </div>
                    </div>
                  ))}
                </div>
            )}
        </div>
    );
}

export default Orders;
