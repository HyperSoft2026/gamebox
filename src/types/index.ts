export interface Category {
  id: string;
  name: string;
  slug: string;
  type: 'game' | 'app';
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  type: 'game' | 'app';
  category_id: string;
  version: string;
  size: string;
  icon_url: string;
  download_url: string;
  screenshots: string[];
  featured: boolean;
  downloads: number;
  status: 'published' | 'draft';
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'superadmin';
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}
