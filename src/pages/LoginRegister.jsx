// src/pages/LoginRegister.jsx
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
// Import useLocation and useNavigate
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Initialize useLocation
    const { login } = useAuth();

    // Effect to check if user was redirected from registration
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.get('registered') === 'true' && !isLogin) {
            setIsLogin(true); // Switch to login form
            // You might want to show a temporary success message here
        }
    }, [location.search, isLogin]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            let response;
            if (isLogin) {
                // Login logic
                response = await axios.post('http://localhost:8000/api/auth/login', {
                    email: formData.email,
                    password: formData.password
                });
                const { user, token } = response.data;
                login(user, token);

                // --- IMPORTANT CHANGE HERE ---
                // Redirect back to the page they came from, or a default
                const fromPath = location.state?.from || '/'; // Get 'from' path from state, default to '/'
                navigate(fromPath, { replace: true }); // Use replace to avoid stacking login in history

            } else {
                // Registration logic
                response = await axios.post('http://localhost:8000/api/auth/register', {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone
                });
                setFormData({ name: '', email: '', password: '', phone: '' });
                setIsLogin(true); // Switch to login view after successful registration
                alert('Registration successful! Please login to continue.');
                navigate('/login?registered=true', { replace: true }); // Add replace to history
            }

        } catch (err) {
            console.error('Auth error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Authentication failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
                <Card style={{ width: '100%', maxWidth: '400px', padding: '20px' }}>
                    <Card.Body>
                        <h2 className="text-center mb-4">{isLogin ? 'Login' : 'Register'}</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {/* Optional: Show success message after registration */}
                        {!isLogin && new URLSearchParams(location.search).get('registered') && (
                            <Alert variant="success">Registration successful! Please log in.</Alert>
                        )}
                        <Form onSubmit={handleSubmit}>
                            {/* ... form fields for Login/Register ... */}
                            {!isLogin && (
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                                </Form.Group>
                            )}
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                            </Form.Group>
                            {!isLogin && (
                                <Form.Group className="mb-3" controlId="formPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                                </Form.Group>
                            )}
                            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : (isLogin ? 'Login' : 'Register')}
                            </Button>
                        </Form>
                        <p className="text-center mt-3">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                            <Button variant="link" onClick={() => {
                                setIsLogin(!isLogin);
                                setError(null);
                                setFormData({ name: '', email: '', password: '', phone: '' });
                                navigate('/login'); // Clear URL params when toggling
                            }}>
                                {isLogin ? 'Register here' : 'Login here'}
                            </Button>
                        </p>
                    </Card.Body>
                </Card>
            </Container>
            <Footer />
        </>
    );
};

export default LoginRegister;