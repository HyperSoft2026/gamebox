import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { LoadingGrid } from '@/components/LoadingStates';
import { EmptyState } from '@/components/States';
import { useSearchProducts } from '@/hooks/useProducts';
import { useSearchParams } from 'react-router-dom';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [type, setType] = useState<'game' | 'app' | undefined>(undefined);

  const { data: results, isLoading } = useSearchProducts(query, type, 50);

  useEffect(() => {
    document.title = query ? `نتائج البحث: ${query} - GameBox` : 'البحث - GameBox';
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">نتائج البحث</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          تم العثور على {results?.data?.length || 0} نتيجة لـ "{query}"
        </p>

        {/* Type Filter */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setType(undefined)}
            className={`px-4 py-2 rounded-lg transition ${
              type === undefined
                ? 'bg-blue-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setType('game')}
            className={`px-4 py-2 rounded-lg transition ${
              type === 'game'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            الألعاب
          </button>
          <button
            onClick={() => setType('app')}
            className={`px-4 py-2 rounded-lg transition ${
              type === 'app'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            التطبيقات
          </button>
        </div>

        {/* Results */}
        {isLoading ? (
          <LoadingGrid count={12} />
        ) : results?.data && results.data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState message={`لم يتم العثور على نتائج لـ "${query}"`} />
        )}
      </main>

      <Footer />
    </div>
  );
}
