import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">GameBox</h3>
            <p className="text-slate-400">متجر الألعاب والتطبيقات الموثوق</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">الروابط</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="/" className="hover:text-white transition">الرئيسية</a></li>
              <li><a href="/games" className="hover:text-white transition">الألعاب</a></li>
              <li><a href="/apps" className="hover:text-white transition">التطبيقات</a></li>
              <li><a href="/categories" className="hover:text-white transition">التصنيفات</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">المساعدة</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition">الأسئلة الشائعة</a></li>
              <li><a href="#" className="hover:text-white transition">الدعم</a></li>
              <li><a href="#" className="hover:text-white transition">شروط الاستخدام</a></li>
              <li><a href="#" className="hover:text-white transition">سياسة الخصوصية</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">تابعنا</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8">
          <p className="text-center text-slate-400">
            © {currentYear} GameBox. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
