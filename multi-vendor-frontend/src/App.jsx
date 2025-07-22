import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar, { BottomNavbar } from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AuthModal from './components/AuthModal';
import { ToastProvider, useToast } from './components/ToastContext';
import { ThemeProvider } from './components/ThemeContext';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Orders from './pages/Orders';
import Dashboard from './pages/dashboard/Dashboard';
import AddProduct from './pages/dashboard/AddProduct';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/Profile';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrders from './pages/admin/ManageOrders';
import ManageUsers from './pages/admin/ManageUsers';
import Cart from './pages/Cart';

function AppContent() {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authModalMode, setAuthModalMode] = useState('register'); // 'register' or 'login'
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    useEffect(() => {
        const storedUserStr = localStorage.getItem('user');
        let storedUser = null;
        try {
            if (storedUserStr && storedUserStr !== "undefined") {
                storedUser = JSON.parse(storedUserStr);
            }
        } catch (e) {
            storedUser = null;
        }
        setUser(storedUser);
        setLoading(false);
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const handleAddToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
        showToast('Item added to cart successfully!', 'success');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Navbar user={user} logoutHandler={logoutHandler} cartCount={cart.length} onLoginClick={() => { setAuthModalMode('login'); setShowAuthModal(true); }} onRegisterClick={() => { setAuthModalMode('register'); setShowAuthModal(true); }} />
                <main className="flex-grow relative">
                    <Routes>
                        <Route path="/login" element={<Login setUser={setUser} />} />
                        <Route path="/register" element={<Register setUser={setUser} />} />
                        <Route path="/" element={<Home user={user} onLoginClick={() => { setAuthModalMode('login'); setShowAuthModal(true); }} onRegisterClick={() => { setAuthModalMode('register'); setShowAuthModal(true); }} />} />
                        <Route path="/profile" element={<Profile />} />

                        <Route path="/products" element={
                            <ProtectedRoute user={user}>
                                <Products onAddToCart={handleAddToCart} />
                            </ProtectedRoute>
                        } />

                        <Route path="/products/:id" element={
                            <ProtectedRoute user={user}>
                                <ProductDetail />
                            </ProtectedRoute>
                        } />

                        <Route path="/orders" element={
                            <ProtectedRoute user={user}>
                                <Orders />
                            </ProtectedRoute>
                        } />

                        <Route path="/dashboard" element={
                            <ProtectedRoute user={user}>
                                <Dashboard />
                            </ProtectedRoute>
                        } />

                        <Route path="/dashboard/add-product" element={
                            <ProtectedRoute user={user}>
                                <AddProduct />
                            </ProtectedRoute>
                        } />

                        <Route path="/admin/dashboard" element={
                            <ProtectedRoute user={user && user.role === 'admin'}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        } />

                        <Route path="/admin/products" element={
                            <ProtectedRoute user={user && user.role === 'admin'}>
                                <ManageProducts />
                            </ProtectedRoute>
                        } />

                        <Route path="/admin/orders" element={
                            <ProtectedRoute user={user && user.role === 'admin'}>
                                <ManageOrders />
                            </ProtectedRoute>
                        } />

                        <Route path="/admin/users" element={
                            <ProtectedRoute user={user && user.role === 'admin'}>
                                <ManageUsers />
                            </ProtectedRoute>
                        } />

                        <Route path="/cart" element={
                            <ProtectedRoute user={user}>
                                <Cart cart={cart} setCart={setCart} user={user} />
                            </ProtectedRoute>
                        } />
                    </Routes>
                    <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} setUser={setUser} mode={authModalMode} />
                </main>
                <BottomNavbar user={user} cartCount={cart.length} />
                <Footer user={user} />
            </div>
        </Router>
    );
}

function App() {
    return (
        <ThemeProvider>
            <ToastProvider>
                <AppContent />
            </ToastProvider>
        </ThemeProvider>
    );
}

export default App;
