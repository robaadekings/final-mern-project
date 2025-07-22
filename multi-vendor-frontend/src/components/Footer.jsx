import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';

// SVGs for real social icons
const FacebookIcon = () => (
  <svg className="w-6 h-6 transition" fill="#1877F3" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
);
const XIcon = () => (
  <svg className="w-6 h-6 transition" fill="#000000" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.53 3H21.5l-7.19 8.21L23 21h-6.18l-4.84-6.07L6.5 21H2.5l7.61-8.7L1 3h6.18l4.34 5.45L17.53 3zm-2.13 15h2.13l-5.5-6.91-5.5 6.91h2.13l3.37-4.23 3.37 4.23z"/></svg>
);
const InstagramIcon = () => (
  <svg className="w-6 h-6 transition" fill="#E4405F" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.783 2.225 7.149 2.163 8.415 2.105 8.795 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.334 3.608 1.385 2.557 2.436 2.351 3.548 2.293 4.829 2.235 6.109 2.223 6.518 2.223 12c0 5.482.012 5.891.07 7.171.058 1.281.264 2.393 1.315 3.444 1.051 1.051 2.163 1.257 3.444 1.315 1.28.058 1.689.07 7.171.07s5.891-.012 7.171-.07c1.281-.058 2.393-.264 3.444-1.315 1.051-1.051 1.257-2.163 1.315-3.444.058-1.28.07-1.689.07-7.171s-.012-5.891-.07-7.171c-.058-1.281-.264-2.393-1.315-3.444C19.393.334 18.281.128 17 .07 15.719.012 15.309 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
);
const TikTokIcon = () => (
  <svg className="w-6 h-6 transition" fill="#25F4EE" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.75 2h2.25a.75.75 0 0 1 .75.75v2.25a3.75 3.75 0 0 0 3.75 3.75h.75A.75.75 0 0 1 21 9.5v2.25a.75.75 0 0 1-.75.75h-1.5v4.25a6.25 6.25 0 1 1-6.25-6.25.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75 2.25 2.25 0 1 0 2.25 2.25V2.75A.75.75 0 0 1 12.75 2z"/></svg>
);

function Footer({ user }) {
    const [email, setEmail] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        setError('');
        if (!email) {
            setError('Please enter your email.');
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
    };

    return (
        <footer className="w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 border-t border-pink-300/30 shadow-2xl mt-12 overflow-hidden text-xs">
            {/* Newsletter Banner */}
            <div className="w-full bg-pink-600 text-white text-center py-2 font-bold tracking-widest text-lg mb-2">
                NEW TO ROBINKSTORE
            </div>
            {/* Newsletter Section */}
            <div className="w-full flex flex-col items-center justify-center px-4 py-6 bg-pink-50 border-b border-pink-200">
                <h3 className="text-xl font-bold text-pink-700 mb-2">Subscribe to our newsletter to get updates on our latest offers</h3>
                <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row items-center gap-3 w-full max-w-xl">
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded shadow transition-all"
                    >
                        Subscribe
                    </button>
                </form>
                <div className="flex items-center gap-2 mt-3">
                    <input
                        type="checkbox"
                        id="privacy"
                        checked={agreed}
                        onChange={e => setAgreed(e.target.checked)}
                        className="accent-pink-600 w-4 h-4"
                        required
                    />
                    <label htmlFor="privacy" className="text-xs text-gray-700">
                        I agree to RobinkStore <Link to="/privacy" className="underline text-pink-700">privacy and cookies policy</Link>.
                    </label>
                </div>
                <div className="text-xs text-gray-500 mt-1">You can unsubscribe from the newsletter at any time.</div>
                {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
                {submitted && <div className="text-xs text-green-600 mt-1">Thank you for subscribing!</div>}
            </div>
            {/* Main Footer Content */}
            <div className="px-3 py-4 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 text-center md:text-left">
                {/* Brand/Logo & Tagline */}
                <div className="flex flex-col items-center md:items-start gap-2 mb-4 md:mb-0 w-full">
                    <div className="flex items-center gap-2 justify-center md:justify-start w-full">
                        <BuildingStorefrontIcon className="w-10 h-10 text-pink-400 drop-shadow-lg" aria-label="Store Logo" />
                        <span className="text-3xl font-extrabold tracking-widest text-white drop-shadow">RobinkStore</span>
                    </div>
                    <span className="text-pink-200 text-sm italic mt-1">Your one-stop shop for everything unique</span>
                </div>
                {/* Divider for desktop */}
                <div className="hidden md:block h-20 w-px bg-gradient-to-b from-pink-400/30 via-white/20 to-indigo-400/30 mx-8" />
            </div>
            {/* Social Icons always at the bottom, now above copyright */}
            <div className="flex gap-3 justify-center w-full mb-2 md:mb-0">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" aria-label="Facebook" className="rounded-full bg-[#1877F3] w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition-all">
                    <svg className="w-6 h-6" fill="#fff" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" title="X" aria-label="X" className="rounded-full bg-black w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition-all">
                    <svg className="w-6 h-6" fill="#fff" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.53 3H21.5l-7.19 8.21L23 21h-6.18l-4.84-6.07L6.5 21H2.5l7.61-8.7L1 3h6.18l4.34 5.45L17.53 3zm-2.13 15h2.13l-5.5-6.91-5.5 6.91h2.13l3.37-4.23 3.37 4.23z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram" className="rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition-all" style={{background: 'radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)'}}>
                    <svg className="w-6 h-6" fill="#fff" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.783 2.225 7.149 2.163 8.415 2.105 8.795 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.334 3.608 1.385 2.557 2.436 2.351 3.548 2.293 4.829 2.235 6.109 2.223 6.518 2.223 12c0 5.482.012 5.891.07 7.171.058 1.281.264 2.393 1.315 3.444 1.051 1.051 2.163 1.257 3.444 1.315 1.28.058 1.689.07 7.171.07s5.891-.012 7.171-.07c1.281-.058 2.393-.264 3.444-1.315 1.051-1.051 1.257-2.163 1.315-3.444.058-1.28.07-1.689.07-7.171s-.012-5.891-.07-7.171c-.058-1.281-.264-2.393-1.315-3.444C19.393.334 18.281.128 17 .07 15.719.012 15.309 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" title="TikTok" aria-label="TikTok" className="rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition-all" style={{background: 'linear-gradient(135deg, #25F4EE 0%, #FE2C55 100%)'}}>
                    <svg className="w-6 h-6" viewBox="0 0 48 48" aria-hidden="true">
                      <g>
                        <path fill="#fff" d="M33.5 6.5c.6 3.2 3.1 5.7 6.3 6.3v5.2c-2.1.2-4.2-.1-6.2-.8v13.7c0 7.2-5.8 13-13 13s-13-5.8-13-13 5.8-13 13-13c.7 0 1.4.1 2.1.2v5.3c-.7-.2-1.4-.3-2.1-.3-4.3 0-7.7 3.5-7.7 7.7s3.5 7.7 7.7 7.7 7.7-3.5 7.7-7.7V6.5h5.2z"/>
                        <path fill="#FE2C55" d="M39.8 12.8c-3.2-.6-5.7-3.1-6.3-6.3h-5.2v20.2c0 4.3-3.5 7.7-7.7 7.7s-7.7-3.5-7.7-7.7 3.5-7.7 7.7-7.7c.7 0 1.4.1 2.1.3v-5.3c-.7-.1-1.4-.2-2.1-.2-7.2 0-13 5.8-13 13s5.8 13 13 13 13-5.8 13-13V12c2 .7 4.1 1 6.2.8v-5.2z"/>
                      </g>
                    </svg>
                </a>
            </div>
            <div className="px-3 pb-2 pt-1 text-center text-[10px] text-pink-200 mt-1 w-full">
                <hr className="border-pink-300/30 mb-2" />
                <p>© 2025 RobinkStore. All rights reserved. Made with <span className="text-pink-400">❤️</span> by Robert Murungi.</p>
            </div>
        </footer>
    );
}

export default Footer;
