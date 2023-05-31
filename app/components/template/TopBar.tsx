'use client';

import { toggleNavbar } from '@/app/redux/layoutSlice';
import { useTheme } from 'next-themes';
import { useDispatch, useSelector } from 'react-redux';
import { HamburguerIcon, MoonIcon, SunIcon } from '../icons';
import Logo from './Logo';

export default function TopBar() {
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`
        flex items-center h-16 dark
      `}
    >
      <div className="w-80">
        <Logo />
      </div>
      <div className="flex w-full items-center">
        <div
          className="p-3"
          onClick={() => {
            dispatch(toggleNavbar());
          }}
        >
          {HamburguerIcon}
        </div>
        <div className="flex-grow" />
        {/* <select
          value={theme}
          onChange={(e) => {
            console.log('theme', theme);
            setTheme(e.target.value);
          }}
        >
          <option value="system">System</option>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select> */}
        <div
          className="mr-10 p-3 "
          onClick={() => {
            if (theme === 'light') setTheme('dark');
            if (theme === 'dark') setTheme('light');
          }}
        >
          {theme === 'dark' ? SunIcon : MoonIcon}
        </div>
      </div>
    </div>
  );
}
