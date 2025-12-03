import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import { Button } from './Button';
import { BarChart3, LogOut, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <BarChart3 size={20} />
          </div>
          <span className="text-xl font-bold text-slate-900">Nexbound</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">Product</Link>
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">Solutions</Link>
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">Pricing</Link>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <div className="flex items-center space-x-2">
                <img src={user?.avatar} alt="Avatar" className="h-8 w-8 rounded-full border border-slate-200" />
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="mr-2 h-3 w-3" />
                  Sign Out
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/login">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-slate-500 hover:text-slate-700"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-base font-medium text-slate-600">Product</Link>
            <Link to="/" className="text-base font-medium text-slate-600">Pricing</Link>
            {isAuthenticated ? (
               <>
                <Link to="/dashboard" className="text-base font-medium text-brand-600">Dashboard</Link>
                <button onClick={handleLogout} className="text-left text-base font-medium text-red-600">Sign Out</button>
               </>
            ) : (
              <>
                <Link to="/login" className="text-base font-medium text-slate-600">Sign In</Link>
                <Link to="/login">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};