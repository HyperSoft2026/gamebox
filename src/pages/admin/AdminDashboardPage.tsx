import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useIsAdmin } from '@/hooks/useAuth';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useProducts } from '@/hooks/useProducts';
import { Package, Gamepad2, BarChart3, Eye } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function AdminDashboardPage() {
  const { user, loading } = useAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    games: 0,
    apps: 0,
    totalDownloads: 0,
    published: 0,
    draft: 0,
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login');
      return;
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate('/admin/unauthorized');
      return;
    }
  }, [isAdmin, adminLoading, navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: games } = await supabase
          .from('products')
          .select('id', { count: 'exact' })
          .eq('type', 'game')
          .eq('status', 'published');

        const { data: apps } = await supabase
          .from('products')
          .select('id', { count: 'exact' })
          .eq('type', 'app')
          .eq('status', 'published');

        const { data: published } = await supabase
          .from('products')
          .select('id', { count: 'exact' })
          .eq('status', 'published');

        const { data: draft } = await supabase
          .from('products')
          .select('id', { count: 'exact' })
          .eq('status', 'draft');

        const { data: products } = await supabase
          .from('products')
          .select('downloads');

        const totalDownloads = products?.reduce((sum, p) => sum + (p.downloads || 0), 0) || 0;

        setStats({
          games: games?.length || 0,
          apps: apps?.length || 0,
          totalDownloads,
          published: published?.length || 0,
          draft: draft?.length || 0,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };

    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);

  if (loading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">لوحة التحكم</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">الألعاب</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.games}</p>
              </div>
              <Gamepad2 size={32} className="text-blue-600 dark:text-blue-400 opacity-50" />
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">التطبيقات</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.apps}</p>
              </div>
              <Package size={32} className="text-purple-600 dark:text-purple-400 opacity-50" />
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">التحميلات</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {(stats.totalDownloads / 1000000).toFixed(1)}M
                </p>
              </div>
              <BarChart3 size={32} className="text-green-600 dark:text-green-400 opacity-50" />
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">منشورة</p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.published}</p>
              </div>
              <Eye size={32} className="text-yellow-600 dark:text-yellow-400 opacity-50" />
            </div>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">مسودة</p>
                <p className="text-3xl font-bold text-slate-600 dark:text-slate-400">{stats.draft}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold mb-6">الإجراءات السريعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/admin/products"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-center font-semibold"
            >
              إدارة المنتجات
            </a>
            <a
              href="/admin/products/new"
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-center font-semibold"
            >
              + إضافة منتج جديد
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
