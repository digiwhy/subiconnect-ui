import './globals.css';
import '@subifinancial/subi-connect/dist/styles.css';

import './sc-override.css';

import { ReactQueryClientProvider } from '../context/react-query';
import Main from './main';
import React from 'react';
import { cookies } from 'next/headers';
import { AuthenticationProvider } from 'context/authentication';
import Link from 'next/link';
import { Logo } from '@/components/icons';
import { LiftModeProvider } from '@/context/lift-mode';

export const metadata = {
  title: 'WorldPay',
  description: 'WorldPay is a Subi Connect Demo Application'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const hasCookie = cookies().has('authToken');

  if (!hasCookie) {
    return (
      <html lang="en">
        <body className="h-screen w-screen">
          <div className="flex flex-col h-full w-full items-center justify-center gap-2">
            <Logo />
            Please login to the{' '}
            <Link href={process.env.NEXT_PUBLIC_DEVELOPER_PORTAL_URL as string}>
              dev portal.
            </Link>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <ReactQueryClientProvider>
        <AuthenticationProvider>
          <LiftModeProvider>
            <Main>{children}</Main>
          </LiftModeProvider>
        </AuthenticationProvider>
      </ReactQueryClientProvider>
    </html>
  );
}
