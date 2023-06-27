'use client';

import Breadcrumbs from './Breadcrumbs';

interface Props {
  children?: any;
}
export default function Content({ children }: Props) {
  return (
    <div className="flex flex-col flex-grow m-1 h-screen">
      <Breadcrumbs />
      <div
        className={`
           p-5
        `}
      >
        {children}
      </div>
    </div>
  );
}
