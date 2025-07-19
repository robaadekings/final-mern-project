import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, logoutHandler, cartCount }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);
    const handleLogout = () => {
        logoutHandler();
        navigate('/login');
        setIsOpen(false);
    };

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
                            <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
                            <li><Link to="/products" className="hover:text-gray-200">Products</Link></li>
                            <li><Link to="/cart" className="hover:text-gray-200 ">Cart ({cartCount})</Link></li>

                            {user.role === 'customer' && (
                                <li><Link to="/orders" className="hover:text-gray-200">Orders</Link></li>
                            )}
                            {user.role === 'vendor' && (
                                <>
                                    <li><Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link></li>
                                    <li><Link to="/orders" className="hover:text-gray-200">Vendor Orders</Link></li>
                                </>
                            )}
                            {user.role === 'admin' && (
                                <>
                                    <li><Link to="/admin/users" className="hover:text-gray-200">Users</Link></li>
                                    <li><Link to="/admin/products" className="hover:text-gray-200">Products</Link></li>
                                    <li><Link to="/admin/orders" className="hover:text-gray-200">Orders</Link></li>
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
                            <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Home</Link>
                            <Link to="/products" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Products</Link>
                            <Link to="/cart" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Cart ({cartCount})</Link>

                            {user.role === 'customer' && (
                                <Link to="/orders" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Orders</Link>
                            )}
                            {user.role === 'vendor' && (
                                <>
                                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Dashboard</Link>
                                    <Link to="/orders" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Vendor Orders</Link>
                                </>
                            )}
                            {user.role === 'admin' && (
                                <>
                                    <Link to="/admin/users" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Users</Link>
                                    <Link to="/admin/products" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Products</Link>
                                    <Link to="/admin/orders" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Orders</Link>
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
