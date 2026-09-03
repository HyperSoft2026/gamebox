import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LoadingGrid } from '@/components/LoadingStates';
import { EmptyState } from '@/components/States';
import { useCategories } from '@/hooks/useProducts';
import { Link } from 'react-router-dom';
import { Grid } from 'lucide-react';

export function CategoriesPage() {
  const { data: gameCategories } = useCategories('game');
  const { data: appCategories } = useCategories('app');

  useEffect(() => {
    document.title = 'التصنيفات - GameBox';
  }, []);

  const gamesCats = gameCategories?.data || [];
  const appsCats = appCategories?.data || [];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">التصنيفات</h1>

        {/* Games Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Grid size={24} />
            تصنيفات الألعاب
          </h2>
          {gamesCats.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gamesCats.map((category) => (
                <Link
                  key={category.id}
                  to={`/games?category=${category.slug}`}
                  className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-bold text-center">{category.name}</h3>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState message="لا توجد تصنيفات للألعاب" />
          )}
        </section>

        {/* Apps Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Grid size={24} />
            تصنيفات التطبيقات
          </h2>
          {appsCats.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {appsCats.map((category) => (
                <Link
                  key={category.id}
                  to={`/apps?category=${category.slug}`}
                  className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-bold text-center">{category.name}</h3>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState message="لا توجد تصنيفات للتطبيقات" />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
