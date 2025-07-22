import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();

    if (!name || !normalizedEmail || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        name,
        email: normalizedEmail,
        password
      });

      if (response.data.success) {
        navigate('/login');
      } else {
        setError("Signup failed. Please try again.");
      }

    } catch (err) {
      if (err.response?.status === 409) {
        setError("Email already exists. Please login or use a different email.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-xl w-full max-w-md sm:p-8 h-[90vh] max-h-[750px]">
        <h2 className="text-3xl font-bold text-violet-600 mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="w-full">
          {error && (
            <div className="mb-4 text-red-600 bg-red-100 p-2 rounded-md text-sm text-center font-medium">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 text-lg px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-lg font-semibold text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="********"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 text-lg px-3 py-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading || (confirmPassword && password !== confirmPassword)}
              className={`w-full ${
                loading ? 'bg-violet-300 cursor-not-allowed' : 'bg-violet-500 hover:bg-violet-700'
              } text-white py-2 px-4 rounded-md text-lg font-medium transition`}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>

            <p className="text-sm text-gray-500 mt-3 text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-violet-600 hover:text-violet-800">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
