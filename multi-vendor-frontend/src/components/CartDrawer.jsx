import { XMarkIcon, ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';

function CartDrawer({ open, onClose, cart, setCart, onCheckout }) {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const handleRemove = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-40" onClick={onClose}></div>
            {/* Drawer */}
            <div className="ml-auto w-full max-w-sm bg-white h-full shadow-lg flex flex-col animate-slide-in-right relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-pink-500" aria-label="Close Cart" title="Close Cart"><XMarkIcon className="w-6 h-6" /></button>
                <div className="flex items-center gap-2 p-6 border-b">
                    <ShoppingCartIcon className="text-indigo-600 w-7 h-7" />
                    <h2 className="text-xl font-bold">Your Cart</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                    ) : (
                        cart.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between border-b pb-2">
                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-gray-600">${item.price}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleRemove(idx)} className="text-red-500 hover:text-red-700" aria-label="Remove from Cart" title="Remove from Cart"><TrashIcon className="w-5 h-5" /></button>
                                    <img src={item.image} alt={item.name} className="h-12 w-12 object-cover rounded" />
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="p-6 border-t">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">Total:</span>
                        <span className="text-xl font-bold text-indigo-700">${total}</span>
                    </div>
                    <button
                        onClick={onCheckout}
                        disabled={cart.length === 0}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl disabled:opacity-50"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartDrawer; 