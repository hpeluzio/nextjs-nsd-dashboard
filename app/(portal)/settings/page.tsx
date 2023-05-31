import { promises } from 'stream';

export const metadata = {
  title: 'Settings',
};

async function fetchData() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return [1, 2, 3, 4, 5];
}

export default async function Settings() {
  const data = await fetchData();

  console.log('data', data);

  return <div>Settings</div>;
}
