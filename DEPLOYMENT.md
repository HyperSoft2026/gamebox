# Deployment instructions

## GitHub Pages

1. تثبيت المتطلبات:
```bash
npm install
```

2. إنشاء ملف `.env.local` بمفاتيح Supabase:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-key-here
```

3. بناء التطبيق:
```bash
npm run build
```

4. تفعيل GitHub Pages من إعدادات المستودع:
   - اذهب إلى Settings → Pages
   - اختر "Deploy from a branch"
   - اختر الفرع `main` والمجلد `dist`

## Vercel

1. ربط المستودع مع Vercel
2. إضافة متغيرات البيئة
3. سيتم النشر تلقائياً عند كل push

## Railway / Heroku / Render

1. تثبيت المتطلبات
2. بناء المشروع: `npm run build`
3. تعيين مجلد التوزيع: `dist`

## ملاحظات

- تأكد من أن مفاتيح Supabase صحيحة
- لا تضع مفاتيح سرية في الكود مباشرة
- استخدم متغيرات البيئة دائماً
