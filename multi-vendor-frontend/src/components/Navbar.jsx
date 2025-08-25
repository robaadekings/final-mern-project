import { useState, useEffect, useRef } from 'react';
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
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from './ThemeContext';
import RealTimeNotifications from './RealTimeNotifications';

function Navbar({ user, logoutHandler, cartCount }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestionsRef = useRef(null);
    const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
    const adminDropdownRef = useRef(null);

    // Fetch all products for suggestions
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                setAllProducts(data);
            } catch {}
        };
        fetchProducts();
    }, []);

    // Update suggestions as user types
    useEffect(() => {
        if (!search.trim()) {
            setSuggestions([]);
            return;
        }
        const lower = search.toLowerCase();
        const matches = allProducts.filter(p =>
            p.name.toLowerCase().includes(lower) ||
            (p.category && p.category.toLowerCase().includes(lower))
        );
        setSuggestions(matches.slice(0, 6));
    }, [search, allProducts]);

    // Hide suggestions on click outside
    useEffect(() => {
        const handleClick = (e) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    // Close admin dropdown on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (adminDropdownRef.current && !adminDropdownRef.current.contains(e.target)) {
                setAdminDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const handleLogout = () => {
        logoutHandler();
        navigate('/login');
        setIsOpen(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/products?search=${encodeURIComponent(search.trim())}`);
        }
    };

    const isActive = (path) => location.pathname === path;

    // Profile picture logic (customer)
    const profilePic = user && user.profilePic ? user.profilePic : null;

    return (
        <>
            {/* Sticky top navbar, only logo on mobile, large font for name */}
            <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-900 text-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
                    <Link to="/" className="flex items-center gap-2 group select-none w-full justify-center md:justify-start">
                        <HomeIcon className="w-12 h-12 md:w-14 md:h-14 transition-all duration-200" aria-label="Home" />
                        <span className="font-extrabold tracking-widest text-white drop-shadow text-3xl md:text-4xl group-hover:scale-105 transition-all duration-200" style={{ fontSize: '2.5rem', lineHeight: '1' }}>
                            RobinkStore
                        </span>
                    </Link>
                    {/* Hide navbar links on mobile, show only on md+ */}
                    <ul className="hidden md:flex space-x-6 items-center">
                        {user && user.role === 'admin' && (
                            <li className="relative" ref={adminDropdownRef}>
                                <button
                                    className="flex items-center gap-1 px-4 py-2 bg-pink-700 rounded-lg font-bold shadow hover:bg-pink-800 transition-all"
                                    onClick={() => setAdminDropdownOpen((open) => !open)}
                                    aria-expanded={adminDropdownOpen}
                                    aria-haspopup="true"
                                >
                                    <Cog6ToothIcon className="w-6 h-6" /> Admin Panel
                                </button>
                                {adminDropdownOpen && (
                                    <div className="absolute left-0 mt-2 w-72 bg-white text-black rounded-xl shadow-lg z-50 border border-pink-200 p-2 space-y-2">
                                        <Link to="/admin/dashboard" className="block px-4 py-3 hover:bg-pink-50 font-semibold rounded-lg"><Cog6ToothIcon className="w-5 h-5 inline mr-1" /> AdminDashboard</Link>
                                        <Link to="/admin/products" className="block px-4 py-3 hover:bg-pink-50 rounded-lg"><CubeIcon className="w-5 h-5 inline mr-1" /> Manage Products</Link>
                                        <Link to="/admin/categories" className="block px-4 py-3 hover:bg-pink-50 rounded-lg"><CubeIcon className="w-5 h-5 inline mr-1" /> Manage Categories</Link>
                                        <Link to="/admin/users" className="block px-4 py-3 hover:bg-pink-50 rounded-lg"><UserGroupIcon className="w-5 h-5 inline mr-1" /> Manage Users</Link>
                                        <Link to="/admin/orders" className="block px-4 py-3 hover:bg-pink-50 rounded-lg"><ClipboardDocumentListIcon className="w-5 h-5 inline mr-1" /> Manage Orders</Link>
                                    </div>
                                )}
                            </li>
                        )}
                        {user && user.role === 'vendor' && (
                            <li><Link to="/dashboard" className={`hover:text-gray-200 flex items-center gap-1 ${isActive('/dashboard') ? 'underline font-bold' : ''}`}><CubeIcon className="w-6 h-6" /> Vendor Dashboard</Link></li>
                        )}
                        {user && user.role === 'customer' && (
                            <>
                                <li><Link to="/" className={`hover:text-gray-200 flex items-center gap-1 ${isActive('/') ? 'underline font-bold' : ''}`}><HomeIcon className="w-6 h-6" /> Home</Link></li>
                                <li><Link to="/products" className={`hover:text-gray-200 flex items-center gap-1 ${isActive('/products') ? 'underline font-bold' : ''}`}><CubeIcon className="w-6 h-6" /> Products</Link></li>
                                <li><Link to="/cart" className={`hover:text-gray-200 flex items-center gap-1 ${isActive('/cart') ? 'underline font-bold' : ''}`}><ShoppingCartIcon className="w-6 h-6" /> Cart {cartCount > 0 && <span className="ml-1 bg-pink-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-lg">{cartCount}</span>}</Link></li>
                                <li><Link to="/orders" className={`hover:text-gray-200 flex items-center gap-1 ${isActive('/orders') ? 'underline font-bold' : ''}`}><ClipboardDocumentListIcon className="w-6 h-6" /> Orders</Link></li>
                            </>
                        )}
                        {/* Show Login/Register if not logged in */}
                        {!user && (
                            <>
                                <li>
                                    <Link
                                        to="/login"
                                        className="px-5 py-2 rounded-full border-2 border-white text-white font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className="px-5 py-2 rounded-full border-2 border-white text-pink-200 font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-pink-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                        <li className="flex items-center gap-2 ml-2">
                            <RealTimeNotifications />
                        </li>
                        <li className="flex items-center gap-2 ml-2">
                            <Link to="/profile" className="flex items-center gap-1 hover:text-pink-200" aria-label="View Profile" title="View Profile">
                                <UserCircleIcon className={`${user && user.role === 'admin' ? 'w-12 h-12' : 'w-8 h-8'} text-pink-200`} />
                            </Link>
                        </li>
                        <li>
                            <button onClick={toggleTheme} className="flex items-center gap-2 bg-gray-200/30 hover:bg-gray-200/60 text-white px-3 py-2 rounded-full shadow transition-all duration-200 text-lg active:scale-95" aria-label="Toggle Light/Dark Mode" title="Toggle Light/Dark Mode">
                                {theme === 'dark' ? <SunIcon className="w-6 h-6 text-yellow-300" /> : <MoonIcon className="w-6 h-6 text-indigo-900" />} {theme === 'dark' ? 'Light' : 'Dark'}
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* Remove search bar from here */}
        </>
    );
}

function BottomNavbar({ user, cartCount }) {
    const { theme, toggleTheme } = useTheme ? useTheme() : { theme: 'light', toggleTheme: () => {} };
    if (!user) return null;
    // Admin bottom navbar
    if (user.role === 'admin') {
        return (
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-t md:hidden flex justify-around items-center py-2 border-t border-pink-200">
                <Link to="/admin/dashboard" className="flex flex-col items-center" aria-label="Dashboard" title="Dashboard">
                    <Cog6ToothIcon className="w-7 h-7" />
                    <span className="text-xs">Dashboard</span>
                </Link>
                {/* All Products (customer side) */}
                <Link to="/products" className="flex flex-col items-center" aria-label="All Products" title="All Products">
                    <CubeIcon className="w-7 h-7" />
                    <span className="text-xs">All Products</span>
                </Link>
                <Link to="/admin/products" className="flex flex-col items-center" aria-label="Products" title="Products">
                    <CubeIcon className="w-7 h-7" />
                    <span className="text-xs">Products</span>
                </Link>
                <Link to="/admin/categories" className="flex flex-col items-center" aria-label="Categories" title="Categories">
                    <CubeIcon className="w-7 h-7" />
                    <span className="text-xs">Categories</span>
                </Link>
                <Link to="/admin/users" className="flex flex-col items-center" aria-label="Users" title="Users">
                    <UserGroupIcon className="w-7 h-7" />
                    <span className="text-xs">Users</span>
                </Link>
                <Link to="/admin/orders" className="flex flex-col items-center" aria-label="Orders" title="Orders">
                    <ClipboardDocumentListIcon className="w-7 h-7" />
                    <span className="text-xs">Orders</span>
                </Link>
                <Link to="/profile" className="flex flex-col items-center" aria-label="Profile" title="Profile">
                    <UserCircleIcon className="w-7 h-7" />
                    <span className="text-xs">Profile</span>
                </Link>
                <button onClick={toggleTheme} className="flex flex-col items-center" aria-label="Theme" title="Theme">
                    {theme === 'dark' ? <SunIcon className="w-7 h-7 text-yellow-300" /> : <MoonIcon className="w-7 h-7 text-indigo-900" />}
                    <span className="text-xs">{theme === 'dark' ? 'Light' : 'Dark'}</span>
                </button>
            </nav>
        );
    }
    // Vendor bottom navbar
    if (user.role === 'vendor') {
        return (
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-t md:hidden flex justify-around items-center py-2 border-t border-pink-200">
                <Link to="/dashboard" className="flex flex-col items-center" aria-label="Dashboard" title="Dashboard">
                    <CubeIcon className="w-7 h-7" />
                    <span className="text-xs">Dashboard</span>
                </Link>
                <Link to="/dashboard/add-product" className="flex flex-col items-center" aria-label="Add Product" title="Add Product">
                    <CubeIcon className="w-7 h-7" />
                    <span className="text-xs">Add Product</span>
                </Link>
                <Link to="/dashboard/orders" className="flex flex-col items-center" aria-label="Orders" title="Orders">
                    <ClipboardDocumentListIcon className="w-7 h-7" />
                    <span className="text-xs">Orders</span>
                </Link>
                <Link to="/profile" className="flex flex-col items-center" aria-label="Profile" title="Profile">
                    <UserCircleIcon className="w-7 h-7" />
                    <span className="text-xs">Profile</span>
                </Link>
                <button onClick={toggleTheme} className="flex flex-col items-center" aria-label="Theme" title="Theme">
                    {theme === 'dark' ? <SunIcon className="w-7 h-7 text-yellow-300" /> : <MoonIcon className="w-7 h-7 text-indigo-900" />}
                    <span className="text-xs">{theme === 'dark' ? 'Light' : 'Dark'}</span>
                </button>
            </nav>
        );
    }
    // Customer bottom navbar (default)
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
