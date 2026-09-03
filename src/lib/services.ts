import { supabase } from './supabase';
import { Product, Category } from '@/types';

export const productService = {
  async getProducts(type?: 'game' | 'app', limit = 20, offset = 0) {
    let query = supabase
      .from('products')
      .select('*, category:categories(id, name, slug, type)', { count: 'exact' })
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (type) {
      query = query.eq('type', type);
    }

    return query;
  },

  async getFeaturedProducts(type?: 'game' | 'app', limit = 10) {
    let query = supabase
      .from('products')
      .select('*, category:categories(id, name, slug, type)')
      .eq('featured', true)
      .eq('status', 'published')
      .order('downloads', { ascending: false })
      .limit(limit);

    if (type) {
      query = query.eq('type', type);
    }

    return query;
  },

  async getProductBySlug(slug: string) {
    return supabase
      .from('products')
      .select('*, category:categories(id, name, slug, type)')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();
  },

  async searchProducts(searchTerm: string, type?: 'game' | 'app', limit = 20) {
    let query = supabase
      .from('products')
      .select('*, category:categories(id, name, slug, type)')
      .eq('status', 'published')
      .ilike('name', `%${searchTerm}%`)
      .order('downloads', { ascending: false })
      .limit(limit);

    if (type) {
      query = query.eq('type', type);
    }

    return query;
  },

  async incrementDownloads(productId: string) {
    return supabase.rpc('increment_downloads', { product_id: productId });
  },

  async getTopDownloaded(type?: 'game' | 'app', limit = 10) {
    let query = supabase
      .from('products')
      .select('*, category:categories(id, name, slug, type)')
      .eq('status', 'published')
      .order('downloads', { ascending: false })
      .limit(limit);

    if (type) {
      query = query.eq('type', type);
    }

    return query;
  },
};

export const categoryService = {
  async getCategories(type?: 'game' | 'app') {
    let query = supabase.from('categories').select('*');

    if (type) {
      query = query.eq('type', type);
    }

    return query.order('name', { ascending: true });
  },

  async getCategoryBySlug(slug: string) {
    return supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();
  },
};

export const adminService = {
  async getAdminUser(email: string) {
    return supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();
  },

  async getAllProducts(limit = 50, offset = 0) {
    return supabase
      .from('products')
      .select('*, category:categories(id, name, slug, type)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
  },

  async createProduct(data: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
    return supabase.from('products').insert([data]).select().single();
  },

  async updateProduct(id: string, data: Partial<Product>) {
    return supabase
      .from('products')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
  },

  async deleteProduct(id: string) {
    return supabase.from('products').delete().eq('id', id);
  },

  async toggleFeatured(id: string, featured: boolean) {
    return supabase
      .from('products')
      .update({ featured, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
  },

  async toggleStatus(id: string, status: 'published' | 'draft') {
    return supabase
      .from('products')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
  },

  async uploadImage(bucket: string, path: string, file: File) {
    return supabase.storage.from(bucket).upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });
  },

  async deleteImage(bucket: string, path: string) {
    return supabase.storage.from(bucket).remove([path]);
  },

  async getPublicUrl(bucket: string, path: string) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },
};
