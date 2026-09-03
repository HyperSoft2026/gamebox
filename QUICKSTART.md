# GameBox - متجر الألعاب والتطبيقات

## المتطلبات
- Node.js 16+
- npm أو yarn
- حساب Supabase

## التثبيت السريع

```bash
# 1. استنساخ المشروع
git clone https://github.com/HyperSoft2026/gamebox.git
cd gamebox

# 2. تثبيت المكتبات
npm install

# 3. نسخ متغيرات البيئة
cp .env.example .env.local

# 4. تعديل .env.local بمفاتيح Supabase

# 5. بدء خادم التطوير
npm run dev
```

## الأوامر المتاحة

- `npm run dev` - بدء خادم التطوير
- `npm run build` - بناء النسخة الإنتاجية
- `npm run preview` - معاينة النسخة المبنية
- `npm run lint` - فحص الكود

## هيكل المشروع

```
src/
├── components/     # المكونات المشتركة
├── pages/          # الصفحات
├── hooks/          # Hooks مخصصة
├── lib/            # المكتبات والخدمات
├── types/          # أنواع TypeScript
├── utils/          # دوال مساعدة
├── App.tsx         # التطبيق الرئيسي
├── main.tsx        # نقطة الدخول
└── index.css       # الأنماط العام
```

## الميزات الرئيسية

✅ واجهة عربية كاملة مع دعم RTL
✅ وضع مظلم وفاتح
✅ لوحة تحكم للمسؤولين
✅ إدارة المنتجات (إضافة، تحرير، حذف)
✅ بحث متقدم وتصفية
✅ إحصائيات مفصلة
✅ مصادقة آمنة مع Supabase
✅ استجابة على جميع الأحجام

## تكوين Supabase

راجع ملف DEPLOYMENT.md للتعليمات الكاملة.

## الترخيص

MIT License - يمكنك استخدام هذا المشروع بحرية

## المساهمة

نرحب بالمساهمات! الرجاء فتح Issue أو Pull Request

## التواصل

- GitHub: [HyperSoft2026](https://github.com/HyperSoft2026)
- Email: modeali2021@gmail.com

---

**تم تطويره بـ ❤️ بواسطة HyperSoft**
