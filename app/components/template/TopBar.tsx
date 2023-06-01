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
      <Logo />
      <div className="flex h-full w-full items-center ">
        <div
          className="flex items-center cursor-pointer p-5 h-full text-neutral-50 dark:text-neutral-300 hover:bg-neutral-500 hover:dark:bg-neutral-700"
          onClick={() => {
            dispatch(toggleNavbar());
          }}
        >
          {HamburguerIcon}
        </div>
        <div className="flex-grow" />
        <div
          className="h-full p-5 cursor-pointer text-neutral-50 dark:text-neutral-300 hover:bg-neutral-500 hover:dark:bg-neutral-700"
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
