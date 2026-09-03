import { create } from 'zustand';

interface ThemeStore {
  isDark: boolean;
  toggle: () => void;
  setDark: (dark: boolean) => void;
}

const getInitialTheme = () => {
  const stored = localStorage.getItem('theme');
  if (stored) return stored === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const useTheme = create<ThemeStore>((set) => ({
  isDark: getInitialTheme(),
  toggle: () =>
    set((state) => {
      const newDark = !state.isDark;
      localStorage.setItem('theme', newDark ? 'dark' : 'light');
      updateTheme(newDark);
      return { isDark: newDark };
    }),
  setDark: (dark: boolean) => {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    updateTheme(dark);
    set({ isDark: dark });
  },
}));

const updateTheme = (dark: boolean) => {
  const root = document.documentElement;
  if (dark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

// Initialize theme on load
if (getInitialTheme()) {
  document.documentElement.classList.add('dark');
}
