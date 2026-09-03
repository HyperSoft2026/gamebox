import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
}

export function ErrorState({ message = 'حدث خطأ ما. يرجى المحاولة مرة أخرى.' }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <AlertCircle size={48} className="text-red-500 mb-4" />
      <p className="text-slate-600 dark:text-slate-400 text-center">{message}</p>
    </div>
  );
}

export function EmptyState({ message = 'لا توجد نتائج حاليًا.' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-lg mb-4" />
      <p className="text-slate-600 dark:text-slate-400 text-center">{message}</p>
    </div>
  );
}
