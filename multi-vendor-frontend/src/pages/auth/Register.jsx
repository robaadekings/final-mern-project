import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../../components/ui/AuthCard';
import { Button } from '@/components/ui/button';
import api from '../../lib/api';

export default function Register({ setUser, asModal, onSuccess, onSwitchMode }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        storeName: '',
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
            const res = await api.post('/auth/register', formData);
            if (res.data?.token) localStorage.setItem('token', res.data.token);
            if (res.data) localStorage.setItem('user', JSON.stringify(res.data));
            if (asModal && onSuccess) {
                onSuccess(); // Close modal
                if (onSwitchMode) onSwitchMode(); // Switch to login
            } else {
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className={asModal ? "" : "min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100 p-4"}>
            <AuthCard title="Create a New Account">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
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
                        Register
                    </Button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account?{' '}
                    {asModal && onSwitchMode ? (
                        <button type="button" className="text-indigo-500 font-medium hover:underline" onClick={onSwitchMode}>
                            Login
                        </button>
                    ) : (
                        <Link to="/login" className="text-indigo-500 font-medium hover:underline">
                            Login
                        </Link>
                    )}
                </p>
            </AuthCard>
        </div>
    );
}
