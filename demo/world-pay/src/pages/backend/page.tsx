import APIKeySwitch from '@/components/extended/api-storage-switch';
import SimulatedBackendCodeBlock from '@/components/extended/code-block';
import React from 'react';

const SimulatedBackend = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row gap-4 w-full justify-between items-center">
        <h1 className="text-2xl">
          WorldPay Simulated Backend / Server Component
        </h1>
        <APIKeySwitch />
      </div>
      <p>
        We do not store your API key—refreshing the page will clear it out of
        context. If you would like to store your API key, please toggle the{' '}
        <i>API Key Storage</i> switch.{' '}
        <b>
          Please remember to regenrate your API key when you are done testing.
        </b>
      </p>
      <SimulatedBackendCodeBlock />
    </div>
  );
};

export default SimulatedBackend;
