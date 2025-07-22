import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ShoppingCartIcon,
  CubeIcon,
  UserCircleIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon,
  Cog6ToothIcon,
  UserIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from './ThemeContext';
import { useEffect } from 'react';
import { Fragment, useRef } from 'react';

function Navbar({ user, logoutHandler, cartCount }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    const toggleMenu = () => setIsOpen(!isOpen);
    const handleLogout = () => {
        logoutHandler();
        navigate('/login');
        setIsOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    // Profile picture logic (customer)
    const profilePic = user && user.profilePic ? user.profilePic : null;

    return (
        <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
                <Link to="/" className="flex items-center gap-2 group select-none">
                    <HomeIcon className="w-12 h-12 inline mb-1 md:w-10 md:h-10 transition-all duration-200" aria-label="Home" />
                    <span className="font-extrabold tracking-widest text-white drop-shadow text-xl md:text-2xl group-hover:scale-105 transition-all duration-200 max-w-[7rem] md:max-w-[10rem] truncate">RobinkStore</span>
                </Link>

                <div className="md:hidden flex items-center gap-4">
                    {/* Cart Icon (Mobile) */}
                    {user && (
                        <Link to="/cart" className="relative block md:hidden" aria-label="View Cart" title="View Cart">
                            <ShoppingCartIcon className="text-3xl" id="cart-icon" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-lg animate-bounce">{cartCount}</span>
                            )}
                        </Link>
                    )}
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
                            {/* Admin Section */}
                            {user.role === 'admin' && (
                                <li className="relative group">
                                    <button className="flex items-center gap-1 px-4 py-2 bg-pink-700 rounded-lg font-bold shadow hover:bg-pink-800 transition-all">
                                        Admin Panel
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                    <div className="absolute left-0 mt-2 w-56 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 border border-pink-200">
                                        <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-pink-50 font-semibold border-b border-pink-100">AdminDashboard</Link>
                                        <Link to="/admin/products" className="block px-4 py-2 hover:bg-pink-50 border-b border-pink-100">Manage Products</Link>
                                        <Link to="/admin/users" className="block px-4 py-2 hover:bg-pink-50 border-b border-pink-100">Manage Users</Link>
                                        <Link to="/admin/orders" className="block px-4 py-2 hover:bg-pink-50">Manage Orders</Link>
                                    </div>
                                </li>
                            )}
                            {/* Vendor Section */}
                            {user.role === 'vendor' && (
                                <li><Link to="/dashboard" className={`hover:text-gray-200 flex items-center gap-1 ${isActive('/dashboard') ? 'underline font-bold' : ''}`}>Vendor Dashboard</Link></li>
                            )}
                            {/* Customer Section */}
                            {user.role === 'customer' && (
                                <>
                                    <li><Link to="/" className={`hover:text-gray-200 flex items-center gap-1 ${isActive('/') ? 'underline font-bold' : ''}`}>Home</Link></li>
                                    <li><Link to="/products" className={`hover:text-gray-200 flex items-center gap-1 ${isActive('/products') ? 'underline font-bold' : ''}`}>Products</Link></li>
                                    <li><Link to="/cart" className={`hover:text-gray-200 flex items-center gap-1 ${isActive('/cart') ? 'underline font-bold' : ''}`}>Cart</Link></li>
                                    <li><Link to="/orders" className={`hover:text-gray-200 flex items-center gap-1 ${isActive('/orders') ? 'underline font-bold' : ''}`}>Orders</Link></li>
                                </>
                            )}
                            {/* Profile Link for all roles */}
                            <li className="flex items-center gap-2 ml-4">
                                <Link to="/profile" className="flex items-center gap-1 hover:text-pink-200" aria-label="View Profile" title="View Profile">
                                    <UserCircleIcon className="w-8 h-8 text-pink-200" />
                                </Link>
                            </li>
                            <li>
                                <button onClick={toggleTheme} className="flex items-center gap-2 bg-gray-200/30 hover:bg-gray-200/60 text-white px-3 py-2 rounded-full shadow transition-all duration-200 text-lg active:scale-95" aria-label="Toggle Light/Dark Mode" title="Toggle Light/Dark Mode">
                                    {theme === 'dark' ? <SunIcon className="w-6 h-6 text-yellow-300" /> : <MoonIcon className="w-6 h-6 text-indigo-900" />} {theme === 'dark' ? 'Light' : 'Dark'}
                                </button>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="flex items-center gap-1 px-4 py-2 bg-red-600 rounded-lg font-bold shadow hover:bg-red-700 transition-all">Logout <ArrowRightOnRectangleIcon className="w-5 h-5" /></button>
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
                            <Link to="/cart" onClick={() => setIsOpen(false)} className="block hover:text-gray-200 relative">
                                <span>Cart</span>
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 left-10 bg-pink-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-lg animate-bounce">{cartCount}</span>
                                )}
                            </Link>
                            <Link to="/orders" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Orders</Link>
                            {/* ...other roles... */}
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

function BottomNavbar({ user, cartCount }) {
    // Only show on mobile
    if (!user) return null;
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-t md:hidden flex justify-around items-center py-2 border-t border-pink-200">
            <Link to="/" className="flex flex-col items-center" aria-label="Home" title="Home">
                <HomeIcon className="w-7 h-7" />
                <span className="text-xs">Home</span>
            </Link>
            <Link to="/products" className="flex flex-col items-center" aria-label="Products" title="Products">
                <CubeIcon className="w-7 h-7" />
                <span className="text-xs">Products</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center relative" aria-label="Cart" title="Cart">
                <ShoppingCartIcon className="w-7 h-7" id="cart-icon-bottom" />
                {cartCount > 0 && (
                    <span className="absolute -top-1 right-2 bg-pink-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow-lg animate-bounce">{cartCount}</span>
                )}
                <span className="text-xs">Cart</span>
            </Link>
            <Link to="/orders" className="flex flex-col items-center" aria-label="Orders" title="Orders">
                <ClipboardDocumentListIcon className="w-7 h-7" />
                <span className="text-xs">Orders</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center" aria-label="Profile" title="Profile">
                <UserCircleIcon className="w-7 h-7" />
                <span className="text-xs">Profile</span>
            </Link>
        </nav>
    );
}

export { BottomNavbar };

export default Navbar;
