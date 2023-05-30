'use client';

import { toggleNavbar, toggleTheme } from '@/app/redux/layoutSlice';
import type { RootState } from '@/app/redux/store';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HamburguerIcon, MoonIcon, SunIcon } from '../icons';
import Logo from './Logo';

export default function TopBar() {
  const dispatch = useDispatch();
  const { theme, navbar } = useSelector((state: RootState) => state.layout);

  const css = useMemo(() => {
    if (theme === 'LIGHT') return 'bg-sky-900';
    if (theme === 'DARK') return 'bg-sky-950';
    return 'bg-sky-800';
  }, [theme]);

  return (
    <div
      className={`
      flex items-center h-16 ${css}
    `}
    >
      <div className="w-80">
        <Logo />
      </div>
      <div className="flex w-full items-center  ">
        <div
          className="text-white p-3 hover:bg-sky-200 hover:text-sky-950"
          onClick={() => {
            dispatch(toggleNavbar());
          }}
        >
          {HamburguerIcon}
        </div>
        <div className="flex-grow" />
        <div
          className="text-white mr-10 hover:bg-sky-200 hover:text-sky-950 p-3 "
          onClick={() => {
            dispatch(toggleTheme());
          }}
        >
          {theme === 'DARK' ? SunIcon : MoonIcon}
        </div>
      </div>
    </div>
  );
}
