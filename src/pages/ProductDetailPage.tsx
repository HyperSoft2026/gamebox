import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LoadingGrid } from '@/components/LoadingStates';
import { ErrorState } from '@/components/States';
import { useProductBySlug } from '@/hooks/useProducts';
import { Download, Star, Calendar, HardDrive, Zap } from 'lucide-react';
import { formatNumber, formatDate } from '@/utils/helpers';
import { adminService } from '@/lib/services';
import { useState } from 'react';

interface ProductDetailPageProps {
  type: 'game' | 'app';
}

export function ProductDetailPage({ type }: ProductDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const { data: productData, isLoading, error } = useProductBySlug(slug || '');
  const [isDownloading, setIsDownloading] = useState(false);

  const product = productData?.data;

  useEffect(() => {
    if (product) {
      document.title = `${product.name} - GameBox`;
    }
  }, [product]);

  const handleDownload = async () => {
    if (!product) return;

    setIsDownloading(true);
    try {
      await adminService.incrementDownloads(product.id);
      window.open(product.download_url, '_blank');
    } catch (err) {
      console.error('Error incrementing downloads:', err);
      window.open(product.download_url, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <LoadingGrid count={1} />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
          <ErrorState message="لم يتم العثور على المنتج" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Image */}
          <div className="md:col-span-1">
            <div className="bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden sticky top-20">
              <img
                src={product.icon_url}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                <p className="text-slate-500 dark:text-slate-400">{product.short_description}</p>
              </div>
              {product.featured && (
                <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-lg font-semibold flex items-center gap-1">
                  <Star size={16} fill="currentColor" />
                  مميز
                </div>
              )}
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                <div className="text-slate-600 dark:text-slate-400 text-sm mb-1">الإصدار</div>
                <div className="font-bold">{product.version}</div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                <div className="text-slate-600 dark:text-slate-400 text-sm mb-1 flex items-center gap-1">
                  <HardDrive size={14} /> الحجم
                </div>
                <div className="font-bold">{product.size}</div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                <div className="text-slate-600 dark:text-slate-400 text-sm mb-1 flex items-center gap-1">
                  <Download size={14} /> التحميلات
                </div>
                <div className="font-bold">{formatNumber(product.downloads)}</div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                <div className="text-slate-600 dark:text-slate-400 text-sm mb-1 flex items-center gap-1">
                  <Calendar size={14} /> التاريخ
                </div>
                <div className="font-bold text-xs">{formatDate(product.created_at)}</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">الوصف</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full md:w-auto px-8 py-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              <Download size={20} />
              {isDownloading ? 'جاري التحميل...' : 'تحميل الآن'}
            </button>
          </div>
        </div>

        {/* Screenshots */}
        {product.screenshots && product.screenshots.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">لقطات الشاشة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {product.screenshots.map((screenshot, index) => (
                <div key={index} className="bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden">
                  <img
                    src={screenshot}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full aspect-video object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
