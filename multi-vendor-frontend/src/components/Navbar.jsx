import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar({ user, logoutHandler, cartCount }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);
    const handleLogout = () => {
        logoutHandler();
        navigate('/login');
        setIsOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md relative z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
                <Link to="/" className="text-5xl font-bold">MyStore</Link>

                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6 items-center">
                    {user && (
                        <>
                            {user.role === 'admin' && (
                                <>
                                    <li><Link to="/admin/dashboard" className={`hover:text-gray-200 ${isActive('/admin/dashboard') ? 'underline font-bold' : ''}`}>Dashboard</Link></li>
                                    <li className="relative group">
                                        <span className="hover:text-gray-200 cursor-pointer">Products</span>
                                        <div className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                                            <Link to="/admin/products" className={`block px-4 py-2 hover:bg-gray-100 ${isActive('/admin/products') ? 'bg-indigo-100 font-bold' : ''}`}>All Products</Link>
                                            <Link to="/admin/products/add" className={`block px-4 py-2 hover:bg-gray-100 ${isActive('/admin/products/add') ? 'bg-indigo-100 font-bold' : ''}`}>Add Product</Link>
                                        </div>
                                    </li>
                                    <li><Link to="/admin/users" className={`hover:text-gray-200 ${isActive('/admin/users') ? 'underline font-bold' : ''}`}>Users</Link></li>
                                    <li><Link to="/admin/orders" className={`hover:text-gray-200 ${isActive('/admin/orders') ? 'underline font-bold' : ''}`}>Orders</Link></li>
                                </>
                            )}
                            {user.role === 'vendor' && (
                                <>
                                    <li><Link to="/dashboard" className={`hover:text-gray-200 ${isActive('/dashboard') ? 'underline font-bold' : ''}`}>Dashboard</Link></li>
                                    <li className="relative group">
                                        <span className="hover:text-gray-200 cursor-pointer">My Products</span>
                                        <div className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                                            <Link to="/dashboard/products" className={`block px-4 py-2 hover:bg-gray-100 ${isActive('/dashboard/products') ? 'bg-indigo-100 font-bold' : ''}`}>All My Products</Link>
                                            <Link to="/dashboard/products/add" className={`block px-4 py-2 hover:bg-gray-100 ${isActive('/dashboard/products/add') ? 'bg-indigo-100 font-bold' : ''}`}>Add Product</Link>
                                        </div>
                                    </li>
                                    <li><Link to="/dashboard/orders" className={`hover:text-gray-200 ${isActive('/dashboard/orders') ? 'underline font-bold' : ''}`}>My Orders</Link></li>
                                </>
                            )}
                            {user.role === 'customer' && (
                                <>
                                    <li><Link to="/" className={`hover:text-gray-200 ${isActive('/') ? 'underline font-bold' : ''}`}>Home</Link></li>
                                    <li><Link to="/products" className={`hover:text-gray-200 ${isActive('/products') ? 'underline font-bold' : ''}`}>Products</Link></li>
                                    <li><Link to="/cart" className={`hover:text-gray-200 ${isActive('/cart') ? 'underline font-bold' : ''}`}>Cart ({cartCount})</Link></li>
                                    <li><Link to="/orders" className={`hover:text-gray-200 ${isActive('/orders') ? 'underline font-bold' : ''}`}>Orders</Link></li>
                                </>
                            )}
                            <li>
                                <button onClick={handleLogout} className="hover:text-gray-200 text-2xl">Logout</button>
                            </li>
                        </>
                    )}
                    {!user && (
                        <>
                            <li><Link to="/login" className="hover:text-gray-200 text-2xl">Login</Link></li>
                            <li><Link to="/register" className="hover:text-gray-200 text-2xl">Register</Link></li>
                        </>
                    )}
                </ul>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-4 space-y-4">
                    {user && (
                        <>
                            {user.role === 'admin' && (
                                <>
                                    <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Dashboard</Link>
                                    <span className="block font-semibold mt-2">Products</span>
                                    <Link to="/admin/products" onClick={() => setIsOpen(false)} className="block pl-4 hover:text-gray-200">All Products</Link>
                                    <Link to="/admin/products/add" onClick={() => setIsOpen(false)} className="block pl-4 hover:text-gray-200">Add Product</Link>
                                    <Link to="/admin/users" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Users</Link>
                                    <Link to="/admin/orders" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Orders</Link>
                                </>
                            )}
                            {user.role === 'vendor' && (
                                <>
                                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Dashboard</Link>
                                    <span className="block font-semibold mt-2">My Products</span>
                                    <Link to="/dashboard/products" onClick={() => setIsOpen(false)} className="block pl-4 hover:text-gray-200">All My Products</Link>
                                    <Link to="/dashboard/products/add" onClick={() => setIsOpen(false)} className="block pl-4 hover:text-gray-200">Add Product</Link>
                                    <Link to="/dashboard/orders" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">My Orders</Link>
                                </>
                            )}
                            {user.role === 'customer' && (
                                <>
                                    <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Home</Link>
                                    <Link to="/products" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Products</Link>
                                    <Link to="/cart" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Cart ({cartCount})</Link>
                                    <Link to="/orders" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Orders</Link>
                                </>
                            )}
                            <button onClick={handleLogout} className="block w-full text-left hover:text-gray-200">Logout</button>
                        </>
                    )}

                    {!user && (
                        <>
                            <Link to="/login" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Login</Link>
                            <Link to="/register" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Register</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
