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
  const { navbar } = useSelector((state: RootState) => state.layout);

  return (
    <Link href={url} className="w-full">
      <li className={`flex h-12 p-5`}>
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
