import { useEffect, useRef, useState } from 'react';
import { BellIcon, XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { on } from '../lib/eventBus';

const sampleMessages = [
    { id: 'n1', type: 'success', title: 'Order Shipped', message: 'Your order #1042 is on the way.' },
    { id: 'n2', type: 'info', title: 'New Deal', message: 'Flash sale: Up to 30% off today.' },
    { id: 'n3', type: 'warning', title: 'Low Stock', message: 'Items in your cart are almost sold out.' },
];

function RealTimeNotifications({ userRole }) {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [unread, setUnread] = useState(0);
    const panelRef = useRef(null);

    useEffect(() => {
        // Customers see regular, generated notifications; admin/vendor do not
        const interval = (userRole === 'customer') ? setInterval(() => {
            const next = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
            const withId = { ...next, id: `${next.id}-${Date.now()}` };
            setItems((prev) => [withId, ...prev].slice(0, 8));
            setUnread((u) => u + 1);
        }, 15000) : null;
        let off;
        if (userRole === 'admin' || userRole === 'vendor') {
            off = on('order:placed', (payload) => {
                console.log('RealTimeNotifications received order:placed event:', payload, 'for role:', userRole);
                const notif = {
                    id: `order-${Date.now()}`,
                    type: 'success',
                    title: 'New Customer Order',
                    message: `Order #${payload?.orderId || 'N/A'} placed for $${payload?.total || '0'} - Process now!`,
                };
                setItems((prev) => [notif, ...prev].slice(0, 8));
                setUnread((u) => u + 1);
            });
        }
        return () => { if (interval) clearInterval(interval); off && off(); };
    }, [userRole]);

    useEffect(() => {
        const onDocClick = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    const clearAll = () => { setItems([]); setUnread(0); };
    const openPanel = () => { setOpen((o) => !o); setUnread(0); };

    const iconFor = (type) => {
        if (type === 'success') return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
        if (type === 'warning') return <ExclamationTriangleIcon className="w-5 h-5 text-amber-600" />;
        return <BellIcon className="w-5 h-5 text-indigo-600" />;
    };

    return (
        <div className="relative" ref={panelRef}>
            <button onClick={openPanel} className="relative p-2 rounded-full hover:bg-white/10 focus:outline-none" aria-label="Notifications">
                <BellIcon className="w-7 h-7" />
                {unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 shadow">
                        {unread > 9 ? '9+' : unread}
                    </span>
                )}
            </button>
            {/* Test button for admins/vendors */}
            {(userRole === 'admin' || userRole === 'vendor') && (
                <button 
                    onClick={() => {
                        const testPayload = { orderId: 'TEST-123', total: 99.99 };
                        console.log('Manually triggering test notification:', testPayload);
                        const notif = {
                            id: `test-${Date.now()}`,
                            type: 'success',
                            title: 'Test Order',
                            message: `Test Order #${testPayload.orderId} for $${testPayload.total}`,
                        };
                        setItems((prev) => [notif, ...prev].slice(0, 8));
                        setUnread((u) => u + 1);
                    }}
                    className="ml-2 p-1 text-xs bg-pink-600 text-white rounded hover:bg-pink-700"
                    title="Test notification"
                >
                    Test
                </button>
            )}
            {open && (
                <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white text-gray-800 rounded-xl shadow-2xl border border-pink-200 z-[60]">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                        <div className="font-semibold">Notifications</div>
                        <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-gray-100" aria-label="Close">
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y">
                        {items.length === 0 ? (
                            <div className="p-4 text-sm text-gray-500">No notifications yet</div>
                        ) : items.map((n) => (
                            <div key={n.id} className="p-3 flex items-start gap-2">
                                {iconFor(n.type)}
                                <div>
                                    <div className="text-sm font-medium">{n.title}</div>
                                    <div className="text-xs text-gray-600">{n.message}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {items.length > 0 && (
                        <div className="px-4 py-2 border-t border-gray-100 flex justify-end">
                            <button onClick={clearAll} className="text-xs text-pink-600 hover:text-pink-700 font-semibold">Clear all</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default RealTimeNotifications;


