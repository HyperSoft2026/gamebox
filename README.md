# GameBox - متجر الألعاب والتطبيقات

منصة حديثة لتوزيع الألعاب والتطبيقات مع لوحة تحكم متقدمة.

## 🚀 المميزات

- **واجهة مستخدم عصرية** - تصميم جميل وسهل الاستخدام
- **دعم اللغة العربية** - واجهة كاملة باللغة العربية مع دعم RTL
- **الوضع المظلم** - دعم كامل للوضع المظلم والفاتح
- **لوحة تحكم قوية** - إدارة كاملة للمنتجات والفئات
- **البحث والتصفية** - بحث متقدم وتصفية حسب الفئة والنوع
- **إحصائيات مفصلة** - تتبع التحميلات والمنتجات
- **مصادقة آمنة** - تسجيل دخول آمن باستخدام Supabase
- **قابلة للتطور** - بنية قابلة للتوسع والتطوير

## 🛠️ التكنولوجيا المستخدمة

### Frontend
- **React 18** - مكتبة واجهات المستخدم
- **TypeScript** - لغة البرمجة المكتوبة بشكل ثابت
- **Vite** - بناء وتطوير سريع
- **Tailwind CSS** - تنسيق قابل للتخصيص
- **React Router** - توجيه الصفحات
- **React Query** - إدارة حالة البيانات
- **Zustand** - إدارة الحالة العامة
- **Lucide React** - مجموعة أيقونات حديثة

### Backend
- **Supabase** - قاعدة بيانات وملفات وتصديق
- **PostgreSQL** - قاعدة البيانات

## 📁 هيكل المشروع

```
src/
├── components/        # المكونات المشتركة
├── pages/             # الصفحات
│   ├── admin/        # صفحات لوحة التحكم
│   └── ...           # صفحات عامة
├── hooks/             # Hooks مخصصة
├── lib/               # مكتبات وخدمات
├── types/             # أنواع TypeScript
├── utils/             # دوال مساعدة
├── App.tsx            # التطبيق الرئيسي
└── main.tsx           # نقطة الدخول
```

## 🚀 البدء

### المتطلبات
- Node.js 16+
- npm أو yarn

### التثبيت

```bash
# استنساخ المستودع
git clone https://github.com/HyperSoft2026/gamebox.git
cd gamebox

# تثبيت المكتبات
npm install

# إنشاء ملف .env
cp .env.example .env

# تعديل .env بإضافة مفاتيح Supabase
# VITE_SUPABASE_URL=your_url
# VITE_SUPABASE_ANON_KEY=your_key
```

### التطوير

```bash
# بدء خادم التطوير
npm run dev

# الموقع سيكون متاح على http://localhost:5173
```

### البناء

```bash
# بناء النسخة الإنتاجية
npm run build

# معاينة البناء
npm run preview
```

## 🔧 إعداد Supabase

### 1. إنشاء حسابات

```sql
-- الجداول الرئيسية
CREATE TABLE categories (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(255),
  type VARCHAR(50) NOT NULL,
  category_id UUID REFERENCES categories(id),
  version VARCHAR(50),
  size VARCHAR(50),
  icon_url TEXT,
  download_url TEXT,
  screenshots TEXT[],
  featured BOOLEAN DEFAULT FALSE,
  downloads INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE admin_users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. إعداد التخزين (Storage)

أنشئ مجلدات التخزين:
- `products-icons` - لأيقونات المنتجات
- `products-screenshots` - لصور لقطات الشاشة

## 👨‍💻 الاستخدام

### الصفحات المتاحة

- `/` - الصفحة الرئيسية
- `/games` - صفحة الألعاب
- `/apps` - صفحة التطبيقات
- `/game/:slug` - تفاصيل اللعبة
- `/app/:slug` - تفاصيل التطبيق
- `/categories` - الفئات
- `/search?q=...` - نتائج البحث
- `/admin/login` - تسجيل دخول المسؤول
- `/admin` - لوحة التحكم
- `/admin/products` - إدارة المنتجات

## 📝 الترخيص

هذا المشروع مرخص تحت MIT License

## 👨‍🤝‍👨 المساهمة

نرحب بالمساهمات! الرجاء فتح Issue أو Pull Request

## 📧 التواصل

للأسئلة والاستفسارات، يرجى التواصل عبر:
- Email: modeali2021@gmail.com
- GitHub: [HyperSoft2026](https://github.com/HyperSoft2026)

---

**تم تطويره بـ ❤️ بواسطة HyperSoft**
