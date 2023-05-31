import { NextResponse } from 'next/server';

const fetchData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return 'GET';
};

export async function GET() {
  await fetchData();

  return NextResponse.json({ message: 'Hello, Next.js!' });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { message } = body;

  await fetchData();

  return NextResponse.json({ message: `Your message is ${message}` });
}
