'use client';
import { RootState } from '@/app/redux/store';
import Link from 'next/link';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

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
        <div
          className={`flex items-center ${!navbar ? 'justify-center' : 'justify-start'} 
          w-full text-neutral-50
          dark:text-neutral-300`}
        >
          {icon} {navbar && <span className="ml-2">{text}</span>}
        </div>
      </li>
    </Link>
  );
}
