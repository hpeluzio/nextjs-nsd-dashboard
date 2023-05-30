'use client';

import { RootState } from '@/app/redux/store';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

interface Props {
  children?: any;
}

export default function Content({ children }: Props) {
  const { theme } = useSelector((state: RootState) => state.layout);

  const css = useMemo(() => {
    if (theme === 'LIGHT') return 'bg-white';
    if (theme === 'DARK') return 'bg-sky-800';
    return 'bg-white';
  }, [theme]);

  return (
    <div
      className={`
      flex flex-col w-full p-5 ${css}
    `}
    >
      <div>{children}</div>
    </div>
  );
}
