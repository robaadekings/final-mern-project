import { Link } from 'react-router-dom';
import { UserGroupIcon, CubeIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

function AdminDashboard() {
    return (
        <div className="p-4 md:p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Welcome, Admin!</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link to="/admin/products" className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition">
                    <CubeIcon className="w-8 h-8 text-indigo-600 mb-2" />
                    <span className="font-semibold">Manage Products</span>
                </Link>
                <Link to="/admin/orders" className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition">
                    <ClipboardDocumentListIcon className="w-8 h-8 text-pink-600 mb-2" />
                    <span className="font-semibold">Manage Orders</span>
                </Link>
                <Link to="/admin/users" className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition">
                    <UserGroupIcon className="w-8 h-8 text-green-600 mb-2" />
                    <span className="font-semibold">Manage Users</span>
                </Link>
            </div>
        </div>
    );
}

export default AdminDashboard;
