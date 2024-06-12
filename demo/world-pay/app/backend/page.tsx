import React from 'react';
import SimulatedBackendCodeBlock from '../../components/extended/code-block';

const SimulatedBackend = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl">
        WorldPay Simulated Backend / Server Component
      </h1>
      <SimulatedBackendCodeBlock />
    </div>
  );
};

export default SimulatedBackend;
