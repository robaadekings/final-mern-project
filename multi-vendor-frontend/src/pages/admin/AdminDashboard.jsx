import { Link } from 'react-router-dom';

function AdminDashboard() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <ul className="space-y-4">
                <li><Link to="/admin/products" className="text-blue-600 hover:underline">Manage Products</Link></li>
                <li><Link to="/admin/orders" className="text-blue-600 hover:underline">Manage Orders</Link></li>
                <li><Link to="/admin/users" className="text-blue-600 hover:underline">Manage Users</Link></li>
            </ul>
        </div>
    );
}

export default AdminDashboard;
