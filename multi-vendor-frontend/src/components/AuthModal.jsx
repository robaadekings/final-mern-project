import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';

export default function AuthModal({ open, onClose, setUser, mode }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pointer-events-none">
      <div className="bg-white rounded-xl shadow-2xl p-4 w-full max-w-sm mt-16 relative pointer-events-auto">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        {mode === 'register' ? (
          <Register setUser={setUser} asModal />
        ) : (
          <Login setUser={setUser} asModal />
        )}
      </div>
    </div>
  );
} 