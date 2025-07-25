import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

function AdminDashboard() {
    return (
        <div className="p-8 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 min-h-screen rounded-xl shadow-2xl">
            <h1 className="text-4xl font-extrabold mb-8 text-pink-700 drop-shadow-lg">AdminDashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Link to="/admin/products" className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform border-2 border-pink-200">
                    <span className="text-5xl mb-2">📦</span>
                    <span className="text-xl font-bold text-pink-700">Manage Products</span>
                </Link>
                <Link to="/admin/orders" className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform border-2 border-purple-200">
                    <span className="text-5xl mb-2">📝</span>
                    <span className="text-xl font-bold text-purple-700">Manage Orders</span>
                </Link>
                <Link to="/admin/users" className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform border-2 border-indigo-200">
                    <span className="text-5xl mb-2">👥</span>
                    <span className="text-xl font-bold text-indigo-700">Manage Users</span>
                </Link>
            </div>
            <Footer admin={true} />
        </div>
    );
}

export default AdminDashboard;
