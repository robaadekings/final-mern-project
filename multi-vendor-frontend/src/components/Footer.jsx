import { Link } from 'react-router-dom';
import {
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  UserGroupIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline';

function Footer() {
    return (
        <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-gray-200 py-8 mt-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Brand/Logo */}
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <BuildingStorefrontIcon className="w-8 h-8 text-pink-400" aria-label="Store Logo" />
                    <span className="text-2xl font-bold tracking-wide">MyStore</span>
                </div>
                {/* Quick Links */}
                <div className="flex flex-wrap gap-4 text-sm justify-center">
                    <Link to="/" className="hover:text-pink-400 transition">Home</Link>
                    <Link to="/products" className="hover:text-pink-400 transition">Products</Link>
                    <Link to="/cart" className="hover:text-pink-400 transition">Cart</Link>
                    <Link to="/dashboard" className="hover:text-pink-400 transition">Dashboard</Link>
                    <Link to="/admin" className="hover:text-pink-400 transition">Admin</Link>
                </div>
                {/* Social Icons (generic for demo) */}
                <div className="flex gap-4 text-xl">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" aria-label="Facebook">
                        <GlobeAltIcon className="w-6 h-6 hover:text-pink-400 transition" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter" aria-label="Twitter">
                        <ChatBubbleLeftRightIcon className="w-6 h-6 hover:text-pink-400 transition" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram">
                        <EnvelopeIcon className="w-6 h-6 hover:text-pink-400 transition" />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub">
                        <UserGroupIcon className="w-6 h-6 hover:text-pink-400 transition" />
                    </a>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-6 text-center text-xs text-gray-400">
                <p>&copy; {new Date().getFullYear()} MyStore. All rights reserved. | Made with <span className="text-pink-400">❤️</span> by Robert Murungi</p>
            </div>
        </footer>
    );
}

export default Footer;
