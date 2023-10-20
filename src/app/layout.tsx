import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import classNames from 'classnames';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo App with Next.js and Prisma',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={classNames(inter.className, 'bg-slate-800 text-slate-100 container mx-auto p-4')}>
        {children}
      </body>
    </html>
  );
}
