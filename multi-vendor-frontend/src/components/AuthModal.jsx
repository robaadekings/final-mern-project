import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';

export default function AuthModal({ open, onClose, setUser, mode, setAuthModalMode }) {
  if (!open) return null;

  const handleSuccess = (user) => {
    if (setUser) setUser(user);
    if (onClose) onClose();
  };

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
          <Register setUser={setUser} asModal onSuccess={handleSuccess} onSwitchMode={() => setAuthModalMode && setAuthModalMode('login')} />
        ) : (
          <Login setUser={setUser} asModal onSuccess={handleSuccess} onSwitchMode={() => setAuthModalMode && setAuthModalMode('register')} />
        )}
      </div>
    </div>
  );
} 