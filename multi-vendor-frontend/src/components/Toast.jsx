import React from 'react';

function Toast({ message, type = 'success', onClose }) {
    if (!message) return null;
    return (
        <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded shadow-lg text-white transition-all duration-300 ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`} role="alert">
            <div className="flex items-center">
                <span className="mr-4">{message}</span>
                <button onClick={onClose} className="ml-2 text-white font-bold text-xl leading-none">&times;</button>
            </div>
        </div>
    );
}

export default Toast; 