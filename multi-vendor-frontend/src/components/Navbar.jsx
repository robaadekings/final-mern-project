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
                <Link to="/" className="text-5xl font-bold flex items-center gap-2"><HomeIcon className="w-8 h-8 inline mb-1" aria-label="Home" /> RobinkStore</Link>

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
                            {user.role === 'admin' && (
                                <>
                                    <li><Link to="/admin/dashboard" className={`hover:text-gray-200 flex items-center gap-1 ${isActive('/admin/dashboard') ? 'underline font-bold' : ''}`} aria-label="Dashboard" title="Dashboard"><Cog6ToothIcon className="w-6 h-6" /> Dashboard</Link></li>
                                    <li className="relative group">
                                        <span className="hover:text-gray-200 cursor-pointer flex items-center gap-1" aria-label="Products" title="Products"><CubeIcon className="w-6 h-6" /> Products</span>
                                        <div className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                                            <Link to="/admin/products" className={`block px-4 py-2 hover:bg-gray-100 ${isActive('/admin/products') ? 'bg-indigo-100 font-bold' : ''}`} aria-label="All Products" title="All Products"><CubeIcon className="w-5 h-5 inline mr-1" /> All Products</Link>
                                            <Link to="/admin/products/add" className={`block px-4 py-2 hover:bg-gray-100 ${isActive('/admin/products/add') ? 'bg-indigo-100 font-bold' : ''}`} aria-label="Add Product" title="Add Product"><CubeIcon className="w-5 h-5 inline mr-1" /> Add Product</Link>
                                        </div>
                                    </li>
                                    <li><Link to="/admin/users" className={`hover:text-gray-200 flex items-center gap-1 ${isActive('/admin/users') ? 'underline font-bold' : ''}`} aria-label="Users" title="Users"><UserGroupIcon className="w-6 h-6" /> Users</Link></li>
                                    <li><Link to="/admin/orders" className={`hover:text-gray-200 flex items-center gap-1 ${isActive('/admin/orders') ? 'underline font-bold' : ''}`} aria-label="Orders" title="Orders"><ClipboardDocumentListIcon className="w-6 h-6" /> Orders</Link></li>
                                </>
                            )}
                            {user.role === 'vendor' && (
                                <>
                                    <li><Link to="/dashboard" className={`hover:text-gray-200 flex items-center gap-1 ${isActive('/dashboard') ? 'underline font-bold' : ''}`} aria-label="Dashboard" title="Dashboard"><Cog6ToothIcon className="w-6 h-6" /> Dashboard</Link></li>
                                    <li className="relative group">
                                        <span className="hover:text-gray-200 cursor-pointer flex items-center gap-1" aria-label="My Products" title="My Products"><CubeIcon className="w-6 h-6" /> My Products</span>
                                        <div className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                                            <Link to="/dashboard/products" className={`block px-4 py-2 hover:bg-gray-100 ${isActive('/dashboard/products') ? 'bg-indigo-100 font-bold' : ''}`} aria-label="All My Products" title="All My Products"><CubeIcon className="w-5 h-5 inline mr-1" /> All My Products</Link>
                                            <Link to="/dashboard/products/add" className={`block px-4 py-2 hover:bg-gray-100 ${isActive('/dashboard/products/add') ? 'bg-indigo-100 font-bold' : ''}`} aria-label="Add Product" title="Add Product"><CubeIcon className="w-5 h-5 inline mr-1" /> Add Product</Link>
                                        </div>
                                    </li>
                                    <li><Link to="/dashboard/orders" className={`hover:text-gray-200 flex items-center gap-1 ${isActive('/dashboard/orders') ? 'underline font-bold' : ''}`} aria-label="My Orders" title="My Orders"><ClipboardDocumentListIcon className="w-6 h-6" /> My Orders</Link></li>
                                </>
                            )}
                            {user.role === 'customer' && (
                                <>
                                    <li><Link to="/" className={`hover:text-gray-200 flex items-center gap-1 ${isActive('/') ? 'underline font-bold' : ''}`} aria-label="Home" title="Home"><HomeIcon className="w-6 h-6" /> Home</Link></li>
                                    <li><Link to="/products" className={`hover:text-gray-200 flex items-center gap-1 ${isActive('/products') ? 'underline font-bold' : ''}`} aria-label="Products" title="Products"><CubeIcon className="w-6 h-6" /> Products</Link></li>
                                    <li className="relative">
                                        <Link to="/cart" className={`hover:text-gray-200 flex items-center gap-1 ${isActive('/cart') ? 'underline font-bold' : ''}`} aria-label="View Cart" title="View Cart">
                                            <ShoppingCartIcon className="w-6 h-6" id="cart-icon" />
                                            <span>Cart</span>
                                            {cartCount > 0 && (
                                                <span className="absolute -top-2 left-6 bg-pink-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-lg animate-bounce">{cartCount}</span>
                                            )}
                                        </Link>
                                    </li>
                                    <li><Link to="/orders" className={`hover:text-gray-200 flex items-center gap-1 ${isActive('/orders') ? 'underline font-bold' : ''}`} aria-label="Orders" title="Orders"><ClipboardDocumentListIcon className="w-6 h-6" /> Orders</Link></li>
                                    <li className="flex items-center gap-2 ml-4">
                                        <Link to="/profile" className="flex items-center gap-1 hover:text-pink-200" aria-label="View Profile" title="View Profile">
                                            {profilePic ? (
                                                <img src={profilePic} alt="Profile" className="w-8 h-8 rounded-full object-cover border-2 border-pink-400" />
                                            ) : (
                                                <UserCircleIcon className="w-8 h-8 text-pink-200" />
                                            )}
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li>
                                <button onClick={toggleTheme} className="flex items-center gap-2 bg-gray-200/30 hover:bg-gray-200/60 text-white px-3 py-2 rounded-full shadow transition-all duration-200 text-lg active:scale-95" aria-label="Toggle Light/Dark Mode" title="Toggle Light/Dark Mode">
                                    {theme === 'dark' ? <SunIcon className="w-6 h-6 text-yellow-300" /> : <MoonIcon className="w-6 h-6 text-indigo-900" />} {theme === 'dark' ? 'Light' : 'Dark'}
                                </button>
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
            <Link to="/profile" className="flex flex-col items-center" aria-label="Profile" title="Profile">
                <UserCircleIcon className="w-7 h-7" />
                <span className="text-xs">Profile</span>
            </Link>
        </nav>
    );
}

export { BottomNavbar };

export default Navbar;
