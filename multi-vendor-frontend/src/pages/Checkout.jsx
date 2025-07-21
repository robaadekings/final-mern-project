import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaChevronRight, FaCheckCircle, FaBoxOpen, FaTrash } from 'react-icons/fa';
import api from '../lib/api';

function Checkout({ cart, setCart }) {
    const [step, setStep] = useState(1);
    const [addresses] = useState(() => {
        const stored = localStorage.getItem('addresses');
        return stored ? JSON.parse(stored) : [];
    });
    const [selectedAddressIdx, setSelectedAddressIdx] = useState(() => {
        const stored = localStorage.getItem('defaultAddressIdx');
        return stored ? Number(stored) : 0;
    });
    const [placing, setPlacing] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const handlePlaceOrder = async () => {
        setPlacing(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            const res = await api.post(
                '/orders',
                {
                    items: cart.map((item) => ({
                        name: item.name,
                        quantity: 1,
                        price: item.price,
                        image: item.image,
                    })),
                    totalPrice: total,
                    shippingAddress: addresses[selectedAddressIdx],
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setSuccess(res.data._id);
            setCart([]);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to place order.');
        }
        setPlacing(false);
    };

    if (success) {
        return (
            <div className="max-w-xl mx-auto py-16 px-4 text-center">
                <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
                <p className="mb-4">Your order has been placed successfully.</p>
                <button onClick={() => navigate(`/order/${success}`)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded">View Order Details</button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            {/* Stepper */}
            <div className="flex items-center gap-4 mb-8">
                <div className={`flex items-center gap-2 ${step === 1 ? 'text-indigo-600 font-bold' : 'text-gray-400'}`}>
                    <FaMapMarkerAlt /> Address
                </div>
                <FaChevronRight />
                <div className={`flex items-center gap-2 ${step === 2 ? 'text-indigo-600 font-bold' : 'text-gray-400'}`}>
                    <FaBoxOpen /> Summary
                </div>
            </div>
            {step === 1 && (
                <div>
                    <h2 className="text-lg font-semibold mb-4">Select Shipping Address</h2>
                    {addresses.length === 0 ? (
                        <div className="text-gray-500">No addresses found. Please add one in your profile.</div>
                    ) : (
                        <div className="space-y-3 mb-6">
                            {addresses.map((addr, idx) => (
                                <div key={idx} className={`flex items-center gap-2 p-3 border rounded cursor-pointer ${selectedAddressIdx === idx ? 'bg-indigo-50 border-indigo-400' : ''}`} onClick={() => setSelectedAddressIdx(idx)}>
                                    <input type="radio" checked={selectedAddressIdx === idx} onChange={() => setSelectedAddressIdx(idx)} />
                                    <div>
                                        <div className="font-semibold">{addr.address}, {addr.city}, {addr.country}</div>
                                        <div className="text-xs text-gray-500">Postal: {addr.postalCode}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <button onClick={() => setStep(2)} disabled={addresses.length === 0} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded">Continue</button>
                </div>
            )}
            {step === 2 && (
                <div>
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                    {cart.length === 0 ? (
                        <div className="text-gray-500">Your cart is empty.</div>
                    ) : (
                        <div className="space-y-4 mb-6">
                            {cart.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between border-b pb-2">
                                    <div className="flex items-center gap-2">
                                        {item.image && <img src={item.image} alt={item.name} className="h-12 w-12 object-cover rounded" />}
                                        <span className="font-semibold">{item.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-indigo-700 font-bold">${item.price}</span>
                                        <button onClick={() => setCart(cart.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="mb-4">
                        <div className="font-semibold">Shipping to:</div>
                        <div className="text-sm text-gray-700">{addresses[selectedAddressIdx]?.address}, {addresses[selectedAddressIdx]?.city}, {addresses[selectedAddressIdx]?.country}</div>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">Total:</span>
                        <span className="text-xl font-bold text-indigo-700">${total}</span>
                    </div>
                    {error && <div className="text-red-500 mb-2">{error}</div>}
                    <div className="flex gap-2">
                        <button onClick={() => setStep(1)} className="bg-gray-300 px-6 py-2 rounded">Back</button>
                        <button onClick={handlePlaceOrder} disabled={placing || cart.length === 0} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded disabled:opacity-50">{placing ? 'Placing Order...' : 'Place Order'}</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Checkout; 