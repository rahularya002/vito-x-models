'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

// Hardcoded admin for testing
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Check if using hardcoded admin credentials for testing
      if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASSWORD) {
        // Use direct admin login path
        const result = await signIn('credentials', {
          email: form.email,
          password: form.password,
          admin: "true",
          callbackUrl: '/admin',
          redirect: false,
        });

        if (result?.error) {
          setError(result.error);
        } else {
          router.push('/admin');
        }
      } else {
        // Regular flow
        const result = await signIn('credentials', {
          email: form.email,
          password: form.password,
          admin: "true",
          callbackUrl: '/admin',
          redirect: false,
        });

        if (result?.error) {
          setError(result.error);
        } else {
          router.push('/admin');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-900">
      <form onSubmit={handleSubmit} className="bg-stone-800 p-8 rounded-xl shadow-lg max-w-md w-full space-y-6 border border-white/10">
        <h2 className="text-2xl font-bold text-white text-center">Admin Login</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div className="mb-4 text-center text-white/70 text-sm">
          <p>Demo admin credentials:</p>
          <p>Email: {ADMIN_EMAIL}</p>
          <p>Password: {ADMIN_PASSWORD}</p>
        </div>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full bg-stone-900 border border-white/10 px-3 py-2 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleChange}
          className="w-full bg-stone-900 border border-white/10 px-3 py-2 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-center text-sm text-white/60">
          Not an admin? <a href="/login" className="text-red-500 hover:underline">Go to user login</a>
        </p>
      </form>
    </div>
  );
} 