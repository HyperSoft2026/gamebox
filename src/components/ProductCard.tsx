import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Star } from 'lucide-react';
import { Product } from '@/types';
import { formatNumber } from '@/utils/helpers';
import { cn } from '@/utils/cn';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const typeLabel = product.type === 'game' ? 'لعبة' : 'تطبيق';
  const link = product.type === 'game' ? `/game/${product.slug}` : `/app/${product.slug}`;

  return (
    <Link to={link}>
      <div className={cn(
        'bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200',
        featured && 'ring-2 ring-yellow-400'
      )}>
        <div className="relative overflow-hidden bg-slate-200 dark:bg-slate-700 aspect-square">
          <img
            src={product.icon_url}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          />
          {featured && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
              <Star size={12} fill="currentColor" />
              مميز
            </div>
          )}
          <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
            {typeLabel}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg truncate">{product.name}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 truncate mb-2">
            {product.short_description}
          </p>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
            <span>{product.version}</span>
            <span>{product.size}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
              <Download size={14} />
              <span className="text-sm font-semibold">{formatNumber(product.downloads)}</span>
            </div>
            <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition">
              عرض التفاصيل
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
