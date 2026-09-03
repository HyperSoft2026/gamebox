import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { LoadingGrid } from '@/components/LoadingStates';
import { EmptyState, ErrorState } from '@/components/States';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { Filter, ChevronDown } from 'lucide-react';
import { useState as useStateHook } from 'react';

interface GamesPageProps {
  type?: 'game' | 'app';
}

export function GamesPage({ type = 'game' }: GamesPageProps) {
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'downloads' | 'name'>('latest');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: products, isLoading, error } = useProducts(type, limit, offset);
  const { data: categoriesData } = useCategories(type);

  useEffect(() => {
    document.title = type === 'game' ? 'الألعاب - GameBox' : 'التطبيقات - GameBox';
  }, [type]);

  const categories = categoriesData?.data || [];

  const filteredAndSortedProducts = React.useMemo(() => {
    let filtered = products?.data || [];

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category_id === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const sorted = [...filtered];
    if (sortBy === 'downloads') {
      sorted.sort((a, b) => b.downloads - a.downloads);
    } else if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
    }

    return sorted;
  }, [products?.data, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">
          {type === 'game' ? 'الألعاب' : 'التطبيقات'}
        </h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Search */}
          <input
            type="text"
            placeholder="ابحث..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOffset(0);
            }}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Category Filter */}
          <select
            value={selectedCategory || ''}
            onChange={(e) => {
              setSelectedCategory(e.target.value || null);
              setOffset(0);
            }}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">جميع التصنيفات</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="latest">الأحدث</option>
            <option value="downloads">الأكثر تحميلاً</option>
            <option value="name">الاسم</option>
          </select>

          {/* Results Count */}
          <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {filteredAndSortedProducts.length} نتيجة
            </span>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <LoadingGrid count={20} />
        ) : error ? (
          <ErrorState message="حدث خطأ في تحميل البيانات" />
        ) : filteredAndSortedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4 items-center">
              <button
                onClick={() => setOffset(Math.max(0, offset - limit))}
                disabled={offset === 0}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                السابق
              </button>
              <span className="text-slate-600 dark:text-slate-400">
                الصفحة {Math.floor(offset / limit) + 1}
              </span>
              <button
                onClick={() => setOffset(offset + limit)}
                disabled={filteredAndSortedProducts.length < limit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                التالي
              </button>
            </div>
          </>
        ) : (
          <EmptyState message={`لا توجد ${type === 'game' ? 'ألعاب' : 'تطبيقات'} حالياً`} />
        )}
      </main>

      <Footer />
    </div>
  );
}
