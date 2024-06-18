'use client';

import { Logo } from '@/components/icons';
import { BlocksIcon, ServerIcon, SkullIcon, UsersIcon } from 'lucide-react';
import { NavItem } from '../nav-item';

import LiftModeSwitch from '@/components/extended/lift-switch';
import { useLiftMode } from '@/context/lift-mode';
import { cn } from '@/lib/utils';

import { Link, Outlet } from 'react-router-dom';
import SubiConnectProviderWrapper from '@/context/subi-connect-wrapper';
import { useAuthenticationContext } from '../context/authentication';

export default function MainLayout() {
  const { apiKey, apiKeyLocalStorage } = useAuthenticationContext();
  const { liftMode } = useLiftMode();

  return (
    <div className="grid min-h-screen w-full sm:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 sm:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-5">
            <Link className="flex items-center gap-2 font-semibold" to="/">
              <Logo />
              <span className="">WorldPay</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <NavItem to="/integrations" disabled={!apiKey}>
                <BlocksIcon className="h-4 w-4" />
                Integrations
              </NavItem>

              <NavItem to="/integrations/custom" disabled={!apiKey}>
                <BlocksIcon className="h-4 w-4" />
                Integrations with Custom Styles
              </NavItem>

              <NavItem to="/employees" disabled={!apiKey}>
                <UsersIcon className="h-4 w-4" />
                Employees
              </NavItem>

              <NavItem to="/employees/custom" disabled={!apiKey}>
                <UsersIcon className="h-4 w-4" />
                Employees - Custom Columns
              </NavItem>

              <br />
              <NavItem to="/backend" className="flex flex-row justify-between">
                <div className="flex flex-row gap-2 items-center">
                  <ServerIcon className="h-4 w-4" />
                  <span>Simulated Backend</span>
                </div>
                {apiKeyLocalStorage && (
                  <SkullIcon className="w-4 h-4 text-red-500/50" />
                )}
              </NavItem>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 sm:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end">
          <Link
            className="flex items-center gap-2 font-semibold sm:opacity-0"
            to="/"
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
            <Outlet />
          </div>
        </SubiConnectProviderWrapper>
      </div>
    </div>
  );
}
