// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // Stores user details from JWT or profile fetch
    const [authLoading, setAuthLoading] = useState(true);
    const navigate = useNavigate(); // Initialize navigate for programmatic redirection

    // Function to clear authentication status and local storage
    // Added optional redirectPath to allow logout to redirect to a specific page (e.g., /login)
    const logout = (redirectPath = '/') => {
        console.log("Logging out user...");
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
        // Only navigate if the current path is different from the redirect path
        // This prevents unnecessary re-renders or navigation loops if already on the target page
        if (window.location.pathname !== redirectPath) {
            navigate(redirectPath);
        }
    };

    // Set up Axios interceptors to automatically add token to requests and handle 401 responses
    useEffect(() => {
        // Request interceptor: Add JWT token to outgoing requests
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor: Handle 401 Unauthorized errors globally
        // If a 401 is received, it means the token is invalid/expired/missing,
        // so we automatically log the user out.
        const responseInterceptor = axios.interceptors.response.use(
            (response) => response, // If response is successful, just return it
            (error) => {
                // Check if the error response exists and its status is 401 (Unauthorized)
                if (error.response && error.response.status === 401) {
                    console.warn("Axios Interceptor: Received 401 Unauthorized. Logging out user.");
                    // Call logout and redirect to the login page
                    logout('/login');
                }
                // Re-throw the error so it can be caught by specific components if needed
                return Promise.reject(error);
            }
        );

        // Cleanup function: Eject interceptors when the component unmounts
        // This prevents memory leaks and ensures interceptors don't interfere with other components
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate]); // 'navigate' is a stable function provided by react-router-dom, safe to be in dependencies

    // Function to set authentication status (called after successful login)
    const login = (userData, token) => {
        localStorage.setItem('token', token); // Store the token in local storage
        setIsAuthenticated(true);            // Set authentication state to true
        setUser(userData);                   // Store user data
        // Axios interceptor will automatically pick up the new token for future requests
    };

    // Effect hook to verify authentication status on initial load
    useEffect(() => {
        const verifyAuth = async () => {
            setAuthLoading(true); // Indicate that authentication check is in progress
            const token = localStorage.getItem('token'); // Get token from local storage

            if (!token) {
                // If no token is found, the user is not authenticated
                setIsAuthenticated(false);
                setUser(null);
                setAuthLoading(false); // Authentication check complete
                return; // Exit the function
            }

            try {
                // Attempt to fetch user data from the backend using the token
                const response = await axios.get('http://localhost:8000/api/auth/me');
                setUser(response.data.user); // Assuming user data is in response.data.user
                setIsAuthenticated(true);    // User is authenticated
            } catch (error) {
                // If token verification fails for any reason (e.g., network error, 500 from backend)
                console.error('AuthContext: Token verification failed for /api/auth/me:', error.response?.data?.message || error.message);
                // Call logout to clear the token and reset states.
                // The response interceptor might have already handled 401s,
                // but this ensures logout for other errors like 500.
                logout();
            } finally {
                setAuthLoading(false); // Always set loading to false once verification is done, regardless of success or failure
            }
        };

        verifyAuth(); // Execute the verification function on component mount
    }, []); // Empty dependency array ensures this effect runs only once after the initial render

    // Value object provided by the AuthContext.Provider
    const value = {
        isAuthenticated, // Boolean: true if user is logged in
        user,            // Object: current user data
        login,           // Function: to log in a user
        logout,          // Function: to log out a user
        authLoading,     // Boolean: true while authentication status is being determined
    };

    return (
        <AuthContext.Provider value={value}>
            {children} {/* Render child components that consume this context */}
        </AuthContext.Provider>
    );
};
