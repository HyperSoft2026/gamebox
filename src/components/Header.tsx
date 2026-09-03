import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/utils/cn';

const APP_NAME = import.meta.env.VITE_APP_NAME || 'GameBox';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
            {APP_NAME}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
            >
              الرئيسية
            </Link>
            <Link
              to="/games"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
            >
              الألعاب
            </Link>
            <Link
              to="/apps"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
            >
              التطبيقات
            </Link>
            <Link
              to="/categories"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
            >
              التصنيفات
            </Link>
          </div>

          {/* Search and Controls */}
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="hidden sm:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 pr-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search size={18} className="absolute right-3 top-2.5 text-slate-400" />
              </div>
            </form>

            <ThemeToggle />

            {user && (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin"
                  className="hidden sm:inline-block px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  لوحة التحكم
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition"
                  title="تسجيل الخروج"
                >
                  <LogOut size={20} />
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2 pb-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search size={18} className="absolute right-3 top-2.5 text-slate-400" />
              </div>
            </form>
            <Link
              to="/"
              className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              الرئيسية
            </Link>
            <Link
              to="/games"
              className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              الألعاب
            </Link>
            <Link
              to="/apps"
              className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              التطبيقات
            </Link>
            <Link
              to="/categories"
              className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              التصنيفات
            </Link>
            {user && (
              <>
                <Link
                  to="/admin"
                  className="block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  لوحة التحكم
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  تسجيل الخروج
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
