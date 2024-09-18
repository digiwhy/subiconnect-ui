import IntegrationsComponent from './component';
import { useAuthenticationAuthenticatedContext } from '@/context/authentication';

const IntegrationsPage = ({ subTitle }: { subTitle?: string }) => {
  const { company } = useAuthenticationAuthenticatedContext();

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <div className='flex flex-col gap-2 justify-start items-start text-left'>
        <h1 className='font-semibold text-lg md:text-2xl'>
          WorldPay - {company.name}'s Integrations
        </h1>
        {subTitle && <h2>{subTitle}</h2>}
      </div>
      <IntegrationsComponent />
    </main>
  );
};

export default IntegrationsPage;
