import { useEffect, useState } from 'react';
import { useTheme } from '@/lib/theme';

export function useDarkMode() {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return { isDark: false, toggle: () => {} };

  return {
    isDark: theme.isDark,
    toggle: theme.toggle,
  };
}
