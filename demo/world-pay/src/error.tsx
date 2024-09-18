'use client';

import React from 'react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className='p-4 md:p-6'>
      <div className='mb-8 space-y-4'>
        <h1 className='font-semibold text-lg md:text-2xl'>Error</h1>
      </div>
    </main>
  );
}
