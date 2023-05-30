'use client';
import { RootState } from '@/app/redux/store';
import Link from 'next/link';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import '../../styles/globals.css';

interface Props {
  url: string;
  text: string;
  icon: any;
}

export default function NavItem({ url, text, icon }: Props) {
  const { theme, navbar } = useSelector((state: RootState) => state.layout);

  const cssFont = useMemo(() => {
    if (theme === 'LIGHT') return 'text-sky-950 hover:bg-sky-700 hover:text-sky-100';
    if (theme === 'DARK') return 'text-sky-200 hover:bg-sky-200 hover:text-sky-950';
    return 'text-sky-950 hover:bg-sky-950 hover:text-sky-100';
  }, [theme]);

  return (
    <Link href={url} className="w-full">
      <li className={`flex h-12 p-5 ${cssFont}`}>
        {navbar && (
          <div className="flex items-center w-full">
            {icon} <span className="ml-2 text-lg">{text}</span>
          </div>
        )}
        {!navbar && <div className="flex items-center">{icon}</div>}
      </li>
    </Link>
  );
}
