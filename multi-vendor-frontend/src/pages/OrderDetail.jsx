import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api';
import { FaCheckCircle, FaClock, FaTruck, FaTimesCircle, FaChevronLeft } from 'react-icons/fa';
import Skeleton from '../components/Skeleton';

const statusSteps = [
    { label: 'Pending', icon: <FaClock /> },
    { label: 'Processing', icon: <FaClock /> },
    { label: 'Shipped', icon: <FaTruck /> },
    { label: 'Delivered', icon: <FaCheckCircle /> },
    { label: 'Cancelled', icon: <FaTimesCircle /> },
];

function OrderDetail() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await api.get(`/orders/my-orders` , {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const found = res.data.find(o => o._id === id);
                setOrder(found);
            } catch {}
            setLoading(false);
        };
        fetchOrder();
    }, [id]);

    const getStatusColor = (status) => {
        if (status === 'Delivered') return 'text-green-600';
        if (status === 'Shipped') return 'text-blue-700';
        if (status === 'Pending') return 'text-orange-500';
        if (status === 'Cancelled') return 'text-red-500';
        return 'text-gray-400';
    };

    // Status tracker
    const renderStatusTracker = (status) => {
        const idx = statusSteps.findIndex(s => s.label === status);
        return (
            <div className="flex items-center gap-4 my-4">
                {statusSteps.slice(0, 4).map((step, i) => (
                    <div key={step.label} className="flex items-center gap-2">
                        <span className={`text-xl ${i <= idx ? getStatusColor(status) : 'text-gray-300'}`}>{step.icon}</span>
                        <span className={`text-xs ${i <= idx ? getStatusColor(status) : 'text-gray-400'}`}>{step.label}</span>
                        {i < 3 && <span className={`w-8 h-1 ${i < idx ? 'bg-indigo-500' : 'bg-gray-200'} rounded-full`}></span>}
                    </div>
                ))}
            </div>
        );
    };

    if (loading) return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                    <Skeleton width="w-1/3" height="h-6" />
                    <Skeleton width="w-1/4" height="h-6" />
                </div>
                <Skeleton width="w-1/2" height="h-4" className="mb-4" />
                <div className="flex items-center gap-4 my-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} width="w-16" height="h-6" />
                    ))}
                </div>
                <div className="mt-4">
                    <Skeleton width="w-1/3" height="h-6" className="mb-2" />
                    <div className="flex flex-wrap gap-4">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <Skeleton key={i} width="w-28" height="h-24" />
                        ))}
                    </div>
                </div>
                <div className="mt-4">
                    <Skeleton width="w-1/4" height="h-6" className="mb-2" />
                    <Skeleton width="w-1/2" height="h-4" />
                </div>
                <div className="text-right mt-4">
                    <Skeleton width="w-1/4" height="h-8" />
                </div>
            </div>
        </div>
    );
    if (!order) return <div className="py-10 text-center text-red-500">Order not found.</div>;

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <Link to="/profile" className="flex items-center gap-2 text-indigo-600 hover:underline mb-6"><FaChevronLeft /> Back to Profile</Link>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Order #{order._id.slice(-6)}</span>
                    <span className={`font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}>{statusSteps.find(s => s.label === order.status)?.icon}{order.status}</span>
                </div>
                <div className="text-xs text-gray-400 mb-2">Placed on {new Date(order.createdAt).toLocaleDateString()}</div>
                {renderStatusTracker(order.status)}
                <div className="mt-4">
                    <h3 className="font-semibold mb-2">Products</h3>
                    <div className="flex flex-wrap gap-4">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center border rounded p-2 w-28">
                                {item.image && <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded mb-1" />}
                                <span className="text-xs text-gray-700 text-center">{item.name}</span>
                                <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                                <span className="text-xs text-indigo-700 font-bold">${item.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <div className="text-sm text-gray-700">
                        {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.country}
                    </div>
                </div>
                <div className="text-right mt-4 text-indigo-700 font-bold text-lg">Total: ${order.totalPrice}</div>
            </div>
        </div>
    );
}

export default OrderDetail; 