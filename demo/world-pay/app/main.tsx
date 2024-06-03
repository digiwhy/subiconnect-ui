'use client';

import { Logo, UsersIcon } from '@/components/icons';
import { BlocksIcon } from 'lucide-react';
import Link from 'next/link';
import { NavItem } from './nav-item';
import dynamic from 'next/dynamic';

const SubiConnectProviderWrapper = dynamic(
  () => import('context/subi-connect-wrapper'),
  { ssr: false }
);

export default function Main({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body>
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
                  <NavItem href="/integrations">
                    <BlocksIcon className="h-4 w-4" />
                    Integrations
                  </NavItem>
                  <NavItem href="/employees">
                    <UsersIcon className="h-4 w-4" />
                    Employees
                  </NavItem>
                </nav>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 sm:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end">
              <Link
                className="flex items-center gap-2 font-semibold sm:hidden"
                href="/"
              >
                <Logo />
                <span className="">WorldPay</span>
              </Link>
            </header>
            <SubiConnectProviderWrapper>{children}</SubiConnectProviderWrapper>
          </div>
        </div>
      </body>
    </html>
  );
}
