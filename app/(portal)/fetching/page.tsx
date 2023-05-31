'use client';

import { useEffect, useState } from 'react';

// export const metadata = {
//   title: 'Fetching',
// };

// async function fetchData() {
//   await new Promise((resolve) => setTimeout(resolve, 3000));

//   return [1, 2, 3, 4, 5];
// }

interface Data {
  message: string;
}

export default async function Fetching() {
  const [dataGet, setDataGet] = useState<Data>({ message: '' });
  const [dataPost, setDataPost] = useState<Data>({ message: '' });
  console.log('data', dataGet);
  useEffect(() => {
    const fetchDataGet = async () => {
      const response = await fetch('http://localhost:3000/api/hello');
      const val = await response.json();
      setDataGet(val);
    };

    const fetchDataPost = async () => {
      const response = await fetch('http://localhost:3000/api/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'POST MESSAGE CAME FROM API' }),
      });

      const val = await response.json();
      setDataPost(val);
    };

    fetchDataGet();
    fetchDataPost();
  }, []);

  // console.log('data', await data.json());

  return (
    <div>
      <div>GET</div>
      <div>Fetching page {dataGet?.message === '' ? 'NO MESSAGE' : dataGet?.message}</div>
      <div>POST</div>
      <div>Fetching page {dataPost?.message === '' ? 'NO MESSAGE' : dataPost?.message}</div>
    </div>
  );
}
