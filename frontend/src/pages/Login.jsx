import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email: normalizedEmail,
        password,
      });

      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      } else {
        setError("Login failed. Please try again.");
      }

    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError("Email not found. Please sign up first.");
        } else if (err.response.status === 401) {
          setError("Incorrect password. Please try again.");
        } else {
          setError("Server error. Please try again later.");
        }
      } else if (err.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("Unexpected error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-xl w-full max-w-md sm:p-8 h-[80vh] max-h-[700px]">
        <h2 className="text-3xl font-bold text-violet-600 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="w-full">
          {error && (
            <div className="mb-4 text-red-600 bg-red-100 p-2 rounded-md text-sm text-center font-medium">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 text-lg px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-semibold text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 text-lg px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? 'bg-violet-300 cursor-not-allowed' : 'bg-violet-500 hover:bg-violet-700'
              } text-white py-2 px-4 rounded-md text-lg font-medium transition`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className="text-sm text-gray-500 mt-3 text-center">
              Don't have an account?{' '}
              <Link to="/register" className="text-violet-600 hover:text-violet-800">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
