import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Orders from './pages/Orders';
import Dashboard from './pages/dashboard/Dashboard';
import AddProduct from './pages/dashboard/AddProduct';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrders from './pages/admin/ManageOrders';
import ManageUsers from './pages/admin/ManageUsers';
import Cart from './pages/Cart';

function App() {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const handleAddToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Navbar user={user} logoutHandler={logoutHandler} cartCount={cart.length} />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/login" element={<Login setUser={setUser} />} />
                        <Route path="/register" element={<Register setUser={setUser} />} />

                        <Route path="/" element={
                            <ProtectedRoute user={user}>
                                <Home />
                            </ProtectedRoute>
                        } />

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

                        <Route path="/admin" element={
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
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
