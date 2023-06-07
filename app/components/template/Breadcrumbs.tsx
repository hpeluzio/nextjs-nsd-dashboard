'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const path = usePathname();
  const pathArray = path.split('/').reduce((acc: any, each) => {
    return [
      ...acc,
      {
        url: each,
        name: each.replace('/', '').charAt(0).toUpperCase() + each.slice(1),
      },
    ];
  }, []);

  const handledPathArray = pathArray.reduce((acc: any, each: any, idx: Number) => {
    if (each.url === '') {
      each.url = '/';
      each.name = 'Home';
      return [each];
    }

    const stracc = acc.reduce((stracc: any, eachstr: any) => {
      return stracc + eachstr.url === '' ? '' : eachstr.url;
    }, null);

    each = {
      ...each,
      url: `${stracc}/${each.url}`,
    };
    return [...acc, each];
  }, []);

  const handledPathArray2 = handledPathArray.map((e: any) => ({ ...e, url: e.url.replace('//', '/') }));

  return (
    <div
      className={`
          flex m-2 pt-1 pb-1 pl-3 bg-neutral-200 dark:bg-neutral-700 rounded
          text-xs
        `}
    >
      {handledPathArray2.map((each: any, idx: any) => (
        <div key={idx} className="mr-2">
          <Link href={each.url}>
            <span className="text-blue-400">{each.name}</span> <span className="ml-2"> /</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
