'use client';

import useLayout from '@/app/hooks/useLayout';
import { RootState } from '@/app/redux/store';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function Logo() {
  const { navbar } = useSelector((state: RootState) => state.layout);
  const layout = useLayout();

  return (
    <div
      className={`
        h-full flex items-center justify-center
        bg-neutral-600 dark:bg-neutral-800
        transition-all
        hover:bg-neutral-500 hover:dark:bg-neutral-700
        cursor-pointer
        ${layout === 'desktop' ? 'w-64 min-w-64' : 'w-20 min-w-20'}
      `}
    >
      <Link href="/" className="w-full">
        <div className="flex items-center justify-center">
          <div
            className={`
          flex flex-col items-center justify-center
          h-12 w-12 rounded-full
          bg-white
      `}
          >
            <div className="h-3 w-3 rounded-full bg-purple-600 mb-0.5" />
            <div className="flex mt-0.5">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-0.5" />
              <div className="h-3 w-3 rounded-full bg-blue-600 ml-0.5" />
            </div>
          </div>

          <div
            className={`text-3xl text-neutral-50 dark:text-neutral-300 ml-3 
        transition-all
        ${layout === 'mobile' ? 'hidden' : ''}
      `}
          >
            SND
          </div>
        </div>
      </Link>
    </div>
  );
}
