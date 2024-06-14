'use client';

import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

type NavItemProps = {
  to: string;
  disabled?: boolean;
  children: React.ReactNode;
} & React.ComponentProps<typeof Link>;
export function NavItem({
  to,
  children,
  disabled = false,
  ...props
}: NavItemProps) {
  const location = useLocation();

  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-50',
        isActive ? 'bg-gray-50 dark:bg-gray-800' : '[&>svg]:hover:scale-105',
        { 'pointer-events-none opacity-50': disabled }
      )}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      {...props}
    >
      {children}
    </Link>
  );
}
