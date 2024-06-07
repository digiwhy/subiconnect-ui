'use client';

import LiftedComponent from '@/components/lifted';
import dynamic from 'next/dynamic';

const EmployeeManagementPage = dynamic(
  () =>
    import('@subifinancial/subi-connect').then(
      (mod) => mod.EmployeeManagementPage
    ),
  { ssr: false }
);

export default function EmployeesPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">
          WorldPay - Employees
        </h1>
      </div>
      <LiftedComponent>
        <EmployeeManagementPage />
      </LiftedComponent>
    </main>
  );
}
