import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useIsAdmin } from '@/hooks/useAuth';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { adminService } from '@/lib/services';
import { Product } from '@/types';
import { Edit2, Trash2, Star, Eye, EyeOff } from 'lucide-react';
import { useState as useStateHook } from 'react';

const ADMIN_EMAIL = 'modeali2021@gmail.com';

export function AdminProductsPage() {
  const { user, loading } = useAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading2, setLoading] = useState(true);
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login');
      return;
    }

    if (user && user.email !== ADMIN_EMAIL) {
      navigate('/admin/unauthorized');
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
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await adminService.getAllProducts(limit, offset);
        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchProducts();
    }
  }, [isAdmin, offset, limit]);

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت تأكد من رغبتك في حذف هذا المنتج؟')) {
      try {
        await adminService.deleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    try {
      await adminService.toggleFeatured(id, !featured);
      setProducts(
        products.map((p) => (p.id === id ? { ...p, featured: !featured } : p))
      );
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  const handleToggleStatus = async (id: string, status: string) => {
    try {
      const newStatus = status === 'published' ? 'draft' : 'published';
      await adminService.toggleStatus(id, newStatus as any);
      setProducts(
        products.map((p) => (p.id === id ? { ...p, status: newStatus as any } : p))
      );
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">المنتجات</h1>
          <a
            href="/admin/products/new"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            + إضافة منتج
          </a>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="ابحث عن منتج..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="px-4 py-3 text-right font-semibold">الاسم</th>
                <th className="px-4 py-3 text-right font-semibold">النوع</th>
                <th className="px-4 py-3 text-right font-semibold">التحميلات</th>
                <th className="px-4 py-3 text-right font-semibold">الحالة</th>
                <th className="px-4 py-3 text-right font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {loading2 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">
                    جاري التحميل...
                  </td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs">
                        {product.type === 'game' ? 'لعبة' : 'تطبيق'}
                      </span>
                    </td>
                    <td className="px-4 py-3">{product.downloads.toLocaleString('ar-EG')}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleStatus(product.id, product.status)}
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          product.status === 'published'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}
                      >
                        {product.status === 'published' ? 'منشورة' : 'مسودة'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleFeatured(product.id, product.featured)}
                          title={product.featured ? 'إزالة من المميزة' : 'إضافة للمميزة'}
                          className={`p-1 rounded transition ${
                            product.featured
                              ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <Star size={16} fill={product.featured ? 'currentColor' : 'none'} />
                        </button>
                        <a
                          href={`/admin/products/${product.id}/edit`}
                          className="p-1 rounded bg-blue-100 text-blue-600 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                        >
                          <Edit2 size={16} />
                        </a>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-1 rounded bg-red-100 text-red-600 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-500">
                    لا توجد منتجات
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 items-center mt-8">
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
            disabled={filteredProducts.length < limit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            التالي
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
