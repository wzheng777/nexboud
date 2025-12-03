import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';
import { mockAuthService } from '../services/mockBackend';
import { RootState } from '../store/store';
import { Button } from '../components/Button';
import { BarChart3 } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('demo@nexbound.io');
  const [password, setPassword] = useState('password');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());
    setError('');

    try {
      const user = await mockAuthService.login(email);
      dispatch(loginSuccess(user));
      navigate('/dashboard');
    } catch (err) {
      dispatch(loginFailure());
      setError('Invalid credentials. Try using default values.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-slate-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
            <BarChart3 size={28} />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Or <a href="#" className="font-medium text-brand-600 hover:text-brand-500">start your 14-day free trial</a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email address</label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Button type="submit" className="w-full" isLoading={isLoading}>
                Sign in
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex w-full items-center justify-center rounded-md border border-slate-300 bg-white py-2 px-4 text-sm font-medium text-slate-500 shadow-sm hover:bg-slate-50">
                 Google
              </button>
              <button className="flex w-full items-center justify-center rounded-md border border-slate-300 bg-white py-2 px-4 text-sm font-medium text-slate-500 shadow-sm hover:bg-slate-50">
                 Microsoft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};