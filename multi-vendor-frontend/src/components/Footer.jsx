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

function Footer({ user, admin }) {
    if (admin) {
        return (
            <footer className="w-full py-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-center">
                <span className="font-extrabold text-white text-lg">
                    © 2025 RobinkStore. All rights reserved. Made with love by Robert Murungi.
                </span>
            </footer>
        );
    }
    // Always show only the copyright sentence, bold and white
    return (
        <footer className="w-full py-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-center">
            <span className="font-extrabold text-white text-lg">
                © 2025 RobinkStore. All rights reserved. Made with love by Robert Murungi.
            </span>
        </footer>
    );
}

export default Footer;
