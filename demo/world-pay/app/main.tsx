'use client';

import { Logo, UsersIcon } from '@/components/icons';
import { BlocksIcon, LoaderCircle, ServerIcon } from 'lucide-react';
import Link from 'next/link';
import { NavItem } from './nav-item';

import { useAuthenticationContext } from 'context/authentication';
import LiftModeSwitch from '@/components/extended/lift-switch';
import { useLiftMode } from '@/context/lift-mode';

import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import ProtectedRoute from '@/components/protected-route';

const SubiConnectProviderWrapper = dynamic(
  () => import('context/subi-connect-wrapper'),
  { ssr: false }
);

export default function Main({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading, isLoggedIn, apiKey } = useAuthenticationContext();
  const { liftMode } = useLiftMode();

  if (isLoading) {
    return (
      <body className="h-screen w-screen">
        <div className="flex h-full w-full items-center justify-center gap-2">
          <LoaderCircle className="h-4 w-4 animate-spin" /> Loading
        </div>
      </body>
    );
  }

  if (!isLoading && !isLoggedIn) {
    return (
      <body className="h-screen w-screen">
        <div className="flex flex-col h-full w-full items-center justify-center gap-2">
          <Logo />
          Please login to the{' '}
          <Link href={process.env.NEXT_PUBLIC_DEVELOPER_PORTAL_URL as string}>
            dev portal.
          </Link>
        </div>
      </body>
    );
  }

  return (
    <body className="w-full h-full">
      <ProtectedRoute>
        <div className="grid min-h-screen w-full sm:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-gray-100/40 sm:block dark:bg-gray-800/40">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-[60px] items-center border-b px-5">
                <Link
                  className="flex items-center gap-2 font-semibold"
                  href="/"
                >
                  <Logo />
                  <span className="">WorldPay</span>
                </Link>
              </div>
              <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                  <NavItem href="/integrations" disabled={!apiKey}>
                    <BlocksIcon className="h-4 w-4" />
                    Integrations
                  </NavItem>

                  <NavItem href="/integrations/custom" disabled={!apiKey}>
                    <BlocksIcon className="h-4 w-4" />
                    Integrations with Custom Styles
                  </NavItem>

                  <NavItem href="/employees" disabled={!apiKey}>
                    <UsersIcon className="h-4 w-4" />
                    Employees
                  </NavItem>

                  <br />
                  <NavItem href="/backend">
                    <ServerIcon className="h-4 w-4" />
                    Simulated Backend
                  </NavItem>
                </nav>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 sm:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end">
              <Link
                className="flex items-center gap-2 font-semibold sm:opacity-0"
                href="/"
              >
                <Logo />
                <span className="">WorldPay</span>
              </Link>

              <div>
                <LiftModeSwitch />
              </div>
            </header>
            <SubiConnectProviderWrapper>
              <div className={'relative'}>
                <div
                  className={cn('absolute w-full h-full z-10 hidden', {
                    'backdrop-blur-sm block': liftMode
                  })}
                ></div>
                {children}
              </div>
            </SubiConnectProviderWrapper>
          </div>
        </div>
      </ProtectedRoute>
    </body>
  );
}
