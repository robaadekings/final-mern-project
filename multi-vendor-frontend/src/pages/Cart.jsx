import { useState } from 'react';
import axios from 'axios';
import { ShoppingCart } from 'lucide-react';

function Cart({ cart, setCart }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const handleRemove = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const handleOrder = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError('You must be logged in to place an order.');
            return;
        }

        if (cart.length === 0) {
            setError('Your cart is empty.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await axios.post(
                'http://localhost:5000/api/orders',
                {
                    items: cart.map((item) => ({
                        name: item.name,
                        quantity: 1, // Correct field name
                        price: item.price,
                    })),
                    totalPrice: total,
                    shippingAddress: {
                        address: 'N/A',
                        city: 'N/A',
                        postalCode: 'N/A',
                        country: 'N/A',
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccess('Order placed successfully!');
            setCart([]);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to place order.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 py-10">
            <div className="flex justify-center items-center gap-2 mb-6">
                <ShoppingCart className="w-6 h-6 text-indigo-500" />
                <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
            </div>

            {cart.length === 0 ? (
                <p className="text-center">Your cart is empty.</p>
            ) : (
                <div className="space-y-4">
                    {cart.map((item, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-2">
                            <div>
                                <h2 className="font-semibold">{item.name}</h2>
                                <p className="text-gray-600">${item.price}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => handleRemove(index)}
                                    className="text-red-500 hover:underline text-sm"
                                >
                                    Remove
                                </button>
                                <img src={item.image} alt={item.name} className="h-16 w-16 object-cover" />
                            </div>
                        </div>
                    ))}

                    <div className="text-right font-bold text-xl">
                        Total: ${total}
                    </div>

                    <button
                        onClick={handleOrder}
                        disabled={loading}
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-xl"
                    >
                        {loading ? 'Placing Order...' : 'Place Order'}
                    </button>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {success && <p className="text-green-500 text-sm text-center">{success}</p>}
                </div>
            )}
        </div>
    );
}

export default Cart;
