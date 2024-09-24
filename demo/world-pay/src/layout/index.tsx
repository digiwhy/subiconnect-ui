import { useAuthenticationContext } from '../context/authentication';
import { NavItem } from '../nav-item';
import CompanySelector from '@/components/extended/company-selector';
import LiftModeSwitch from '@/components/extended/lift-switch';
import { Logo } from '@/components/icons';
import { useLiftMode } from '@/context/lift-mode';
import SubiConnectProviderWrapper from '@/context/subi-connect-wrapper';
import { cn } from '@/lib/utils';
import { BlocksIcon, ServerIcon, SkullIcon, UsersIcon } from 'lucide-react';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
);

export default function MainLayout() {
  const { apiKey, apiKeyLocalStorage } = useAuthenticationContext();
  const { liftMode } = useLiftMode();
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div className='flex min-h-screen w-dvw max-w-full overflow-hidden'>
      <div className='hidden min-w-fit border-r bg-gray-100/40 dark:bg-gray-800/40 sm:flex'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <div className='flex h-[60px] items-center border-b px-5'>
            <Link className='flex items-center gap-2 font-semibold' to='/'>
              <Logo />
              <span className=''>WorldPay</span>
            </Link>
          </div>
          <div className='flex-1 overflow-auto py-2'>
            <nav className='grid items-start px-4 text-sm font-medium'>
              <NavItem to='/integrations' disabled={!apiKey}>
                <BlocksIcon className='h-4 w-4' />
                Integrations
              </NavItem>

              <NavItem to='/integrations/custom' disabled={!apiKey}>
                <BlocksIcon className='h-4 w-4' />
                Integrations with Custom Styles
              </NavItem>

              <NavItem to='/employees' disabled={!apiKey}>
                <UsersIcon className='h-4 w-4' />
                Employees
              </NavItem>

              <NavItem to='/employees/custom' disabled={!apiKey}>
                <UsersIcon className='h-4 w-4' />
                Employees - Custom Columns
              </NavItem>

              <div className='w-full border-border border-b my-2 h-0'></div>

              <NavItem to='/backend' className='flex flex-row justify-between'>
                <div className='flex flex-row items-center gap-2'>
                  <ServerIcon className='h-4 w-4' />
                  <span>Simulated Backend</span>
                </div>
                {apiKeyLocalStorage && (
                  <SkullIcon className='h-4 w-4 text-red-500/50' />
                )}
              </NavItem>

              <div className='justify-start flex w-full flex-col items-start gap-2 p-3'>
                <span className='text-sm font-medium'>Select Company</span>
                <CompanySelector />
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div className='flex max-w-full flex-grow flex-col overflow-hidden'>
        <header className='flex h-14 items-center justify-between gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 sm:h-[60px] lg:justify-end'>
          <Link
            className='flex items-center gap-2 font-semibold sm:hidden'
            to='/'
          >
            <Logo />
            <span className=''>WorldPay</span>
          </Link>

          <div>
            <LiftModeSwitch />
          </div>
        </header>

        {/* Add this new div for the shadow element */}
        <div
          ref={ref}
          className='pointer-events-none fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/10 to-transparent'
        ></div>

        <SubiConnectProviderWrapper>
          <div className='relative'>
            <div
              className={cn('absolute z-10 hidden h-full w-full', {
                'block backdrop-blur-sm': liftMode,
              })}
            ></div>
            <Outlet />
          </div>
        </SubiConnectProviderWrapper>
      </div>

      <ReactQueryDevtoolsProduction />
    </div>
  );
}
