import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BeautyConnect - Professional Booking Platform',
  description: 'SaaS booking & business management platform for beauty, wellness, and fitness businesses',
  keywords: ['booking', 'appointments', 'beauty', 'wellness', 'fitness', 'salon', 'spa'],
  authors: [{ name: 'BeautyConnect Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}