import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { useToast } from '../../components/ToastContext';
import { ClockIcon, Cog6ToothIcon, TruckIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

function ManageOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [statusUpdates, setStatusUpdates] = useState({});
    const toast = useToast();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await api.get('/orders/admin', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(res.data);
            } catch (err) {
                setError('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleStatusChange = (orderId, newStatus) => {
        setStatusUpdates({ ...statusUpdates, [orderId]: newStatus });
    };

    const handleUpdateStatus = async (orderId) => {
        const newStatus = statusUpdates[orderId];
        if (!newStatus) return;
        try {
            const token = localStorage.getItem('token');
            await api.put(`/orders/${orderId}/status`, { status: newStatus }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
            toast.showToast('Order status updated successfully', 'success');
        } catch (err) {
            toast.showToast('Failed to update order status', 'error');
        }
    };

    const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    // Status badge with icon
    const getStatusBadge = (status) => {
        let color = '';
        let icon = null;
        switch (status) {
            case 'Delivered':
                color = 'bg-green-500';
                icon = <CheckCircleIcon className="inline w-4 h-4 mr-1" />;
                break;
            case 'Processing':
                color = 'bg-blue-500';
                icon = <Cog6ToothIcon className="inline w-4 h-4 mr-1 animate-spin" />;
                break;
            case 'Shipped':
                color = 'bg-blue-700';
                icon = <TruckIcon className="inline w-4 h-4 mr-1" />;
                break;
            case 'Pending':
                color = 'bg-orange-500';
                icon = <ClockIcon className="inline w-4 h-4 mr-1" />;
                break;
            case 'Cancelled':
                color = 'bg-red-500';
                icon = <XCircleIcon className="inline w-4 h-4 mr-1" />;
                break;
            default:
                color = 'bg-gray-400';
        }
        return <span className={`px-2 py-1 rounded text-white text-xs inline-flex items-center gap-1 ${color}`}>{icon}{status}</span>;
    };

    return (
        <div className="p-2 md:p-8">
            <h2 className="text-xl font-semibold mb-4">Manage Orders</h2>
            {error && <div className="text-red-600 mb-2 flex flex-col items-center">{error}</div>}
            {loading ? (
                <div className="flex justify-center items-center py-10"><span className="loader mr-2"></span>Loading...</div>
            ) : (
                orders.length === 0 ? (
                    <div className="text-gray-500 text-center py-8">No orders found.</div>
                ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full border min-w-[900px] text-sm">
                          <thead>
                              <tr className="bg-gray-100">
                                  <th className="p-2 border">Order ID</th>
                                  <th className="p-2 border">Customer</th>
                                  <th className="p-2 border">Total</th>
                                  <th className="p-2 border">Status</th>
                                  <th className="p-2 border">Change Status</th>
                                  <th className="p-2 border">Items</th>
                              </tr>
                          </thead>
                          <tbody>
                              {orders.map(order => (
                                  <tr key={order._id}>
                                      <td className="p-2 border">{order._id.slice(-6)}</td>
                                      <td className="p-2 border">{order.customer?.name || 'N/A'}<br/>{order.customer?.email || ''}</td>
                                      <td className="p-2 border">${order.totalPrice}</td>
                                      <td className="p-2 border">{getStatusBadge(order.status)}</td>
                                      <td className="p-2 border">
                                          <select
                                              value={statusUpdates[order._id] || order.status}
                                              onChange={e => handleStatusChange(order._id, e.target.value)}
                                              className="border p-1 mr-2"
                                          >
                                              {statusOptions.map(status => (
                                                  <option key={status} value={status}>{status}</option>
                                              ))}
                                          </select>
                                          <button
                                              onClick={() => handleUpdateStatus(order._id)}
                                              className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded transition-all duration-200"
                                              disabled={(statusUpdates[order._id] || order.status) === order.status}
                                          >
                                              Update
                                          </button>
                                      </td>
                                      <td className="p-2 border">
                                          <ul className="list-disc pl-4">
                                              {order.items.map((item, idx) => (
                                                  <li key={idx}>{item.name} x {item.quantity} (${item.price})</li>
                                              ))}
                                          </ul>
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

export default ManageOrders;
