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
    <li className="mb-1">
      <Link href={url} className="w-full">
        <div
          className={`flex items-center 
            h-12 p-5 w-full text-neutral-50 dark:text-neutral-300
            hover:bg-neutral-400 hover:dark:bg-neutral-500
            ${!navbar ? 'justify-center' : 'justify-start'} 
          `}
        >
          {icon} {navbar && <span className="ml-2">{text}</span>}
        </div>
      </Link>
    </li>
  );
}
