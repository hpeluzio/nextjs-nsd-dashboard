'use client';

import type { RootState } from './redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from 'next-themes';

export default function Page() {
  const { theme } = useTheme();
  const { navbar } = useSelector((state: RootState) => state.layout);
  const dispatch = useDispatch();

  return (
    <main>
      <div>
        <div className="text-3xl">Home page</div>
        <div>Navbar: {navbar ? 'true' : 'false'}</div>
        <div>Theme: {theme}</div>
      </div>
    </main>
  );
}
