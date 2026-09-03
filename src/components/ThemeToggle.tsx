import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '@/hooks/useDarkMode';
import { cn } from '@/utils/cn';

export function ThemeToggle() {
  const { isDark, toggle } = useDarkMode();

  return (
    <button
      onClick={toggle}
      className={cn(
        'p-2 rounded-lg transition-colors duration-200',
        isDark
          ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700'
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
      )}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
