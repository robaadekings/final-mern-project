import { useState } from 'react';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';

export default function AuthModal({ open, onClose, setUser }) {
  const [showRegister, setShowRegister] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="mb-4 flex justify-center">
          <button
            className={`px-4 py-2 rounded-l-xl ${showRegister ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setShowRegister(true)}
          >
            Register
          </button>
          <button
            className={`px-4 py-2 rounded-r-xl ${!showRegister ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setShowRegister(false)}
          >
            Login
          </button>
        </div>
        {showRegister ? (
          <Register setUser={setUser} asModal />
        ) : (
          <Login setUser={setUser} asModal />
        )}
      </div>
    </div>
  );
} 