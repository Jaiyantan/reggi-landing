'use client';

import { useState } from 'react';
import { login } from './actions';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
    }
    setIsPending(false);
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-card shadow-card border border-creamDark">
        <div className="text-center mb-8">
          <h1 className="font-cormorant text-[32px] font-bold text-greenDark mb-2">Admin Login</h1>
          <p className="text-textMid text-[14px]">Sign in to manage your product catalog</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[14px] font-bold text-greenDark mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-[16px] py-[12px] bg-cream/50 rounded-[12px] border border-creamDark focus:outline-none focus:border-greenDark focus:ring-1 focus:ring-greenDark transition-all text-[15px]"
              placeholder="admin@reggi.in"
            />
          </div>
          
          <div>
            <label className="block text-[14px] font-bold text-greenDark mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-[16px] py-[12px] bg-cream/50 rounded-[12px] border border-creamDark focus:outline-none focus:border-greenDark focus:ring-1 focus:ring-greenDark transition-all text-[15px]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-[12px] bg-redAccent/10 border border-redAccent/20 rounded-[12px] text-redAccent text-[14px] font-medium text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-b from-greenDark to-[#1E3821] text-white py-[14px] rounded-full font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
