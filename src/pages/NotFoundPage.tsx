import React from 'react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="text-center">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <h2 className="text-4xl font-bold mb-2">الصفحة غير موجودة</h2>
        <p className="text-xl mb-8 opacity-90">عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها.</p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-slate-100 transition"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
