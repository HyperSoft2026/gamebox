import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Chrome } from 'lucide-react';

const ADMIN_EMAIL = 'modeali2021@gmail.com';

export function AdminLoginPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      if (user.email === ADMIN_EMAIL) {
        navigate('/admin');
      } else {
        navigate('/admin/unauthorized');
      }
    }
  }, [user, loading, navigate]);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/admin/login`,
      },
    });

    if (error) {
      console.error('Login error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">GB</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">لوحة التحكم</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              سجل الدخول باستخدام Google
            </p>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition mb-4"
            >
              <Chrome size={20} />
              تسجيل باستخدام Google
            </button>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              يمكن للمستخدمين المصرحين فقط الوصول للوحة
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export function AdminUnauthorizedPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">ممنوع</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-2">
            ليس لديك صلاحية للوصول للوحة.
          </p>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            تم التسجيل باستخدام: {user?.email}
          </p>

          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
          >
            تسجيل الخروج
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
