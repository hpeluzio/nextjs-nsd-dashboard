import { Poppins } from 'next/font/google';
import { Providers } from './redux/providers';
import Layout from './components/template/Layout';
import './globals.css';

// const poppins = Poppins({
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
//   subsets: ['latin'],
// });

export const metadata = {
  title: {
    default: 'SND Admin dashboard',
    template: '%s | SND Admin dashboard',
  },
  description: 'SND Admin dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout title="SND Admin dashboard" description="Admin dashboard">
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
