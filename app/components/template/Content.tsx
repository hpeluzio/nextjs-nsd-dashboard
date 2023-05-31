'use client';

import { RootState } from '@/app/redux/store';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

interface Props {
  children?: any;
}

export default function Content({ children }: Props) {
  const { theme } = useSelector((state: RootState) => state.layout);

  return (
    <div
      className={`
      flex flex-col w-full p-5
    `}
    >
      <div>{children}</div>
    </div>
  );
}
