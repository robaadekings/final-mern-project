import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, ChevronRightIcon, CheckCircleIcon, CubeIcon, TrashIcon } from '@heroicons/react/24/outline';
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
                <CheckCircleIcon className="text-green-500 w-16 h-16 mx-auto mb-4" />
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
                    <MapPinIcon className="w-6 h-6" /> Address
                </div>
                <ChevronRightIcon className="w-5 h-5" />
                <div className={`flex items-center gap-2 ${step === 2 ? 'text-indigo-600 font-bold' : 'text-gray-400'}`}>
                    <CubeIcon className="w-6 h-6" /> Summary
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
                        <>
                            <div className="space-y-3 mb-6">
                                {cart.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 border rounded">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                        <div className="flex-1">
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-sm text-gray-600">Quantity: 1</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">KES {item.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t pt-4 mb-6">
                                <div className="flex justify-between items-center text-lg font-semibold">
                                    <span>Total:</span>
                                    <span>KES {total.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => setStep(1)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">Back</button>
                                <button onClick={handlePlaceOrder} disabled={placing} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded">
                                    {placing ? 'Placing Order...' : 'Place Order'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Checkout; 