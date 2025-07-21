import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../../components/ui/AuthCard';
import { Button } from '@/components/ui/button';
import api from '../../lib/api';

export default function Login({ setUser, asModal, onSuccess, onSwitchMode }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', formData);
            if (setUser) setUser(res.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.user)); // Persist user
            if (asModal && onSuccess) {
                onSuccess(res.data.user); // Set user and close modal
                navigate('/products'); // Redirect to products page after modal login
            } else {
                navigate('/products'); // Also redirect to products for full-page login
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className={asModal ? "" : "min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100 p-4"}>
            <AuthCard title="Login to Your Account">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 rounded-xl">
                        Login
                    </Button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Don't have an account?{' '}
                    {asModal && onSwitchMode ? (
                        <button type="button" className="text-indigo-500 font-medium hover:underline" onClick={onSwitchMode}>
                            Register
                        </button>
                    ) : (
                        <Link to="/register" className="text-indigo-500 font-medium hover:underline">
                            Register
                        </Link>
                    )}
                </p>
            </AuthCard>
        </div>
    );
}
