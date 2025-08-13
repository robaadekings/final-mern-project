import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';

// Social Media Icons
const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.53 3H21.5l-7.19 8.21L23 21h-6.18l-4.84-6.07L6.5 21H2.5l7.61-8.7L1 3h6.18l4.34 5.45L17.53 3zm-2.13 15h2.13l-5.5-6.91-5.5 6.91h2.13l3.37-4.23 3.37 4.23z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.783 2.225 7.149 2.163 8.415 2.105 8.795 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.334 3.608 1.385 2.557 2.436 2.351 3.548 2.293 4.829 2.235 6.109 2.223 6.518 2.223 12c0 5.482.012 5.891.07 7.171.058 1.281.264 2.393 1.315 3.444 1.051 1.051 2.163 1.257 3.444 1.315 1.28.058 1.689.07 7.171.07s5.891-.012 7.171-.07c1.281-.058 2.393-.264 3.444-1.315 1.051-1.051 1.257-2.163 1.315-3.444.058-1.28.07-1.689.07-7.171s-.012-5.891-.07-7.171c-.058-1.281-.264-2.393-1.315-3.444C19.393.334 18.281.128 17 .07 15.719.012 15.309 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.75 2h2.25a.75.75 0 0 1 .75.75v2.25a3.75 3.75 0 0 0 3.75 3.75h.75A.75.75 0 0 1 21 9.5v2.25a.75.75 0 0 1-.75.75h-1.5v4.25a6.25 6.25 0 1 1-6.25-6.25.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75 2.25 2.25 0 1 0 2.25 2.25V2.75A.75.75 0 0 1 12.75 2z"/>
  </svg>
);

function Footer({ user, admin }) {
    // Admin footer - simple and clean
    if (admin) {
        return (
            <footer className="w-full py-6 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <span className="font-semibold text-slate-200 text-base">
                        © 2025 RobinkStore. All rights reserved. Made with ❤️ by Robert Murungi.
                    </span>
                </div>
            </footer>
        );
    }

    const [email, setEmail] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        setError('');
        
        if (!email) {
            setError('Please enter your email address.');
            return;
        }
        
        if (!agreed) {
            setError('You must agree to the privacy and cookies policy.');
            return;
        }
        
        // Here you would send the email to your backend/newsletter service
        setSubmitted(true);
        setEmail('');
        setAgreed(false);
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <footer className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-200">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Top Section - Brand, Newsletter, Social */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform duration-200">
                                <BuildingStorefrontIcon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                RobinkStore
                            </span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed max-w-xs">
                            Your one-stop destination for unique products from trusted vendors. 
                            Discover quality items that make a difference.
                        </p>
                        <div className="flex space-x-3">
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center text-white transition-colors duration-200"
                                aria-label="Follow us on Facebook"
                            >
                                <FacebookIcon />
                            </a>
                            <a 
                                href="https://x.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center text-white transition-colors duration-200"
                                aria-label="Follow us on X (Twitter)"
                            >
                                <XIcon />
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-10 h-10 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 rounded-lg flex items-center justify-center text-white transition-colors duration-200"
                                aria-label="Follow us on Instagram"
                            >
                                <InstagramIcon />
                            </a>
                            <a 
                                href="https://tiktok.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-pink-500 hover:from-cyan-500 hover:to-pink-600 rounded-lg flex items-center justify-center text-white transition-colors duration-200"
                                aria-label="Follow us on TikTok"
                            >
                                <TikTokIcon />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <h3 className="text-slate-100 font-semibold text-sm uppercase tracking-wider">
                                Shop
                            </h3>
                            <ul className="space-y-2">
                                <li><Link to="/" className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm">Home</Link></li>
                                <li><Link to="/shop" className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm">All Products</Link></li>
                                <li><Link to="/categories" className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm">Categories</Link></li>
                                <li><Link to="/vendors" className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm">Vendors</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-slate-100 font-semibold text-sm uppercase tracking-wider">
                                Support
                            </h3>
                            <ul className="space-y-2">
                                <li><Link to="/help" className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm">Help Center</Link></li>
                                <li><Link to="/contact" className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm">Contact Us</Link></li>
                                <li><Link to="/shipping" className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm">Shipping Info</Link></li>
                                <li><Link to="/returns" className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm">Returns</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-slate-100 font-semibold text-sm uppercase tracking-wider mb-2">
                                Stay Updated
                            </h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Get the latest product updates, exclusive offers, and vendor news delivered to your inbox.
                            </p>
                        </div>
                        
                        <form onSubmit={handleSubscribe} className="space-y-3">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                                >
                                    Subscribe
                                </button>
                            </div>
                            
                            <div className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    id="privacy"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="mt-1 w-4 h-4 text-blue-600 bg-slate-800 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                                    required
                                />
                                <label htmlFor="privacy" className="text-xs text-slate-400 leading-relaxed">
                                    I agree to the{' '}
                                    <Link to="/privacy" className="text-blue-400 hover:text-blue-300 underline">
                                        Privacy Policy
                                    </Link>{' '}
                                    and{' '}
                                    <Link to="/cookies" className="text-blue-400 hover:text-blue-300 underline">
                                        Cookie Policy
                                    </Link>
                                </label>
                            </div>
                            
                            {error && (
                                <div className="text-red-400 text-xs bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">
                                    {error}
                                </div>
                            )}
                            
                            {submitted && (
                                <div className="text-green-400 text-xs bg-green-900/20 border border-green-800 rounded-lg px-3 py-2">
                                    ✓ Thank you for subscribing! You'll receive our updates soon.
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-700 mb-8"></div>

                {/* Bottom Section - Copyright and Legal */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                        <p className="text-slate-400 text-sm">
                            © 2025 RobinkStore. All rights reserved. Made with ❤️ by Robert Murungi.
                        </p>
                    </div>
                    
                    <nav className="flex items-center space-x-6">
                        <Link to="/privacy" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm">
                            Terms of Service
                        </Link>
                        <Link to="/cookies" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm">
                            Cookie Policy
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
