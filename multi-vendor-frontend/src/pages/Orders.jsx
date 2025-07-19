import { useEffect, useState } from 'react';
import axios from 'axios';

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
                const res = await axios.get('http://localhost:5000/api/orders/my-orders', {
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
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="p-4 border rounded shadow-md">
                            <h2 className="font-semibold">Order #{order._id.slice(-6)}</h2>
                            <p className="text-sm text-gray-500">Status: {order.status}</p>
                            <p className="text-sm text-gray-500">Total: ${order.totalPrice}</p>
                            <p className="text-sm text-gray-500">Items:</p>
                            <ul className="list-disc pl-5 text-sm">
                                {order.items.map((item, idx) => (
                                    <li key={idx}>
                                        {item.name} - Qty: {item.qty}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Orders;
