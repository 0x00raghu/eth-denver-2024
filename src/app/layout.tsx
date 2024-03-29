import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';
import Navbar from '@/components/_navbar/index';
import { WalletProvider } from '@/context/_aa/WalletContext';
import { getServerSession } from 'next-auth/next';
import SessionProvider from '@/components/_github/SessionProvider';
import Footer from '@/components/_navbar/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GitFund: Eth Denver 2024',
  description: 'Generated by create next app',
};

// Updated RootLayout to handle session being undefined
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <SessionProvider session={session}>
            <Navbar />
            <Providers>{children}</Providers>
            <Footer />
          </SessionProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
