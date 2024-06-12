'use client';

import './globals.css';
import '@subifinancial/subi-connect/dist/styles.css';

import './sc-override.css';

import { ReactQueryClientProvider } from '@/context/react-query';
import Main from './main';
import React from 'react';
import { AuthenticationProvider } from '@/context/authentication';
import { LiftModeProvider } from '@/context/lift-mode';
import Head from 'next/head';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>WorldPay</title>
        <meta name="description" content="Subi Connect Admin Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
