'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function AdminSignup() {
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' });
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
      const res = await fetch('/api/admin/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Signup failed');
        return;
      }

      // Sign in the user after successful signup
      const result = await signIn('credentials', {
        username: form.username,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/admin');
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
        <h2 className="text-2xl font-bold text-white text-center">Admin Signup</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <input
          name="username"
          type="text"
          placeholder="Username"
          required
          value={form.username}
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
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full bg-stone-900 border border-white/10 px-3 py-2 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <p className="text-center text-sm text-white/60">
          Already have an account? <a href="/admin/login" className="text-red-500 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
} 