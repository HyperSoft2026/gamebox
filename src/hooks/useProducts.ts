import { useQuery } from '@tanstack/react-query';
import { productService, categoryService } from '@/lib/services';
import { Product, Category } from '@/types';

export function useProducts(
  type?: 'game' | 'app',
  limit = 20,
  offset = 0
) {
  return useQuery({
    queryKey: ['products', type, limit, offset],
    queryFn: () => productService.getProducts(type, limit, offset),
    staleTime: 5 * 60 * 1000,
  });
}

export function useFeaturedProducts(type?: 'game' | 'app', limit = 10) {
  return useQuery({
    queryKey: ['featured-products', type, limit],
    queryFn: () => productService.getFeaturedProducts(type, limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productService.getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
}

export function useSearchProducts(
  searchTerm: string,
  type?: 'game' | 'app',
  limit = 20
) {
  return useQuery({
    queryKey: ['search-products', searchTerm, type, limit],
    queryFn: () => productService.searchProducts(searchTerm, type, limit),
    enabled: !!searchTerm && searchTerm.length > 0,
    staleTime: 3 * 60 * 1000,
  });
}

export function useTopDownloadedProducts(type?: 'game' | 'app', limit = 10) {
  return useQuery({
    queryKey: ['top-downloaded', type, limit],
    queryFn: () => productService.getTopDownloaded(type, limit),
    staleTime: 10 * 60 * 1000,
  });
}

export function useCategories(type?: 'game' | 'app') {
  return useQuery({
    queryKey: ['categories', type],
    queryFn: () => categoryService.getCategories(type),
    staleTime: 30 * 60 * 1000,
  });
}

export function useCategoryBySlug(slug: string) {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => categoryService.getCategoryBySlug(slug),
    enabled: !!slug,
    staleTime: 30 * 60 * 1000,
  });
}
