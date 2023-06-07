'use client';

import Breadcrumbs from './Breadcrumbs';

interface Props {
  children?: any;
}
export default function Content({ children }: Props) {
  return (
    <div className="w-full m-1">
      <Breadcrumbs />
      <div
        className={`
          flex flex-col w-full p-5
        `}
      >
        {children}
      </div>
    </div>
  );
}
