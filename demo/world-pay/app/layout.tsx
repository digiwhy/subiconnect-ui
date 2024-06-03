import './globals.css';
import '@subifinancial/subi-connect/styles.css';

// import './sc-override.css';

import { ReactQueryClientProvider } from '../context/react-query';
import Main from './main';
import React from 'react';

export const metadata = {
  title: 'WorldPay',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ReactQueryClientProvider>
        <Main>{children}</Main>
      </ReactQueryClientProvider>
    </html>
  );
}
