import React from 'react';

export function ProductSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md">
      <div className="w-full aspect-square bg-slate-200 dark:bg-slate-700 animate-pulse" />
      <div className="p-4">
        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded mb-2 animate-pulse" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2 w-3/4 animate-pulse" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded mb-4 w-1/2 animate-pulse" />
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
      </div>
    </div>
  );
}

export function LoadingGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
