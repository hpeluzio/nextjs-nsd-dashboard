'use client';

import { toggleNavbar } from '@/app/redux/layoutSlice';
import { RootState } from '@/app/redux/store';
import { useTheme } from 'next-themes';
import { useDispatch, useSelector } from 'react-redux';
import { HamburguerIcon, MoonIcon, SunIcon } from '../icons';
import Logo from './Logo';

export default function TopBar() {
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const { navbar } = useSelector((state: RootState) => state.layout);

  return (
    <div
      className={`
        flex items-center h-16 bg-neutral-700 dark:bg-neutral-900
      `}
    >
      <div
        className={`
        h-full flex items-center justify-center
        bg-neutral-600 dark:bg-neutral-800
        ${navbar ? 'w-80' : 'w-20'}
        transition-all
      `}
      >
        <Logo />
      </div>
      <div className="flex w-full items-center">
        <div
          className="p-3 text-neutral-50 dark:text-neutral-300"
          onClick={() => {
            dispatch(toggleNavbar());
          }}
        >
          {HamburguerIcon}
        </div>
        <div className="flex-grow" />

        <div
          className="mr-10 p-3 text-neutral-50 dark:text-neutral-300"
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
