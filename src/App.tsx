import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// Public Pages
import { HomePage } from '@/pages/HomePage';
import { GamesPage } from '@/pages/GamesPage';
import { SearchPage } from '@/pages/SearchPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { CategoriesPage } from '@/pages/CategoriesPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// Admin Pages
import { AdminLoginPage, AdminUnauthorizedPage } from '@/pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminProductsPage } from '@/pages/admin/AdminProductsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GamesPage type="game" />} />
          <Route path="/apps" element={<GamesPage type="app" />} />
          <Route path="/game/:slug" element={<ProductDetailPage type="game" />} />
          <Route path="/app/:slug" element={<ProductDetailPage type="app" />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/search" element={<SearchPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/unauthorized" element={<AdminUnauthorizedPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />

          {/* Catch All */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
