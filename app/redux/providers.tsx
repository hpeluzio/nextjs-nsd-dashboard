'use client';

import { Provider } from 'react-redux';
import { ThemeProvider, useTheme } from 'next-themes';
import { store } from './store';
import { useEffect, useState } from 'react';

export function Providers({ children }: any) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </Provider>
  );
}
