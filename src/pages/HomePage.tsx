import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { LoadingGrid } from '@/components/LoadingStates';
import { EmptyState, ErrorState } from '@/components/States';
import { useProducts, useFeaturedProducts, useTopDownloadedProducts, useCategories } from '@/hooks/useProducts';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const APP_NAME = import.meta.env.VITE_APP_NAME || 'GameBox';
const APP_DESCRIPTION = import.meta.env.VITE_APP_DESCRIPTION || 'متجر الألعاب والتطبيقات';

export function HomePage() {
  useEffect(() => {
    document.title = `${APP_NAME} - ${APP_DESCRIPTION}`;
  }, []);

  const { data: latestGames, isLoading: loadingGames } = useProducts('game', 8);
  const { data: latestApps, isLoading: loadingApps } = useProducts('app', 8);
  const { data: featuredGames, isLoading: loadingFeatured } = useFeaturedProducts('game', 6);
  const { data: topDownloaded } = useTopDownloaded(undefined, 8);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{APP_NAME}</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">{APP_DESCRIPTION}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/games"
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-slate-100 transition"
            >
              استكشف الألعاب
            </Link>
            <Link
              to="/apps"
              className="px-8 py-3 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-800 transition"
            >
              استكشف التطبيقات
            </Link>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        {/* Latest Games */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">أحدث الألعاب</h2>
            <Link to="/games" className="flex items-center gap-2 text-blue-500 hover:text-blue-600">
              عرض الكل
              <ArrowLeft size={20} />
            </Link>
          </div>
          {loadingGames ? (
            <LoadingGrid count={8} />
          ) : latestGames?.data && latestGames.data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {latestGames.data.map((game) => (
                <ProductCard key={game.id} product={game} />
              ))}
            </div>
          ) : (
            <EmptyState message="لا توجد ألعاب حالياً" />
          )}
        </section>

        {/* Latest Apps */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">أحدث التطبيقات</h2>
            <Link to="/apps" className="flex items-center gap-2 text-blue-500 hover:text-blue-600">
              عرض الكل
              <ArrowLeft size={20} />
            </Link>
          </div>
          {loadingApps ? (
            <LoadingGrid count={8} />
          ) : latestApps?.data && latestApps.data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {latestApps.data.map((app) => (
                <ProductCard key={app.id} product={app} />
              ))}
            </div>
          ) : (
            <EmptyState message="لا توجد تطبيقات حالياً" />
          )}
        </section>

        {/* Featured Games */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">الألعاب المميزة</h2>
            <Link to="/games" className="flex items-center gap-2 text-blue-500 hover:text-blue-600">
              عرض الكل
              <ArrowLeft size={20} />
            </Link>
          </div>
          {loadingFeatured ? (
            <LoadingGrid count={6} />
          ) : featuredGames?.data && featuredGames.data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {featuredGames.data.map((game) => (
                <ProductCard key={game.id} product={game} featured />
              ))}
            </div>
          ) : (
            <EmptyState message="لا توجد ألعاب مميزة حالياً" />
          )}
        </section>

        {/* Top Downloaded */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">الأكثر تحميلاً</h2>
          </div>
          {topDownloaded?.data && topDownloaded.data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {topDownloaded.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState message="لا توجد نتائج" />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
