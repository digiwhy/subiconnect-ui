import { Button } from '../../ui/button';
import { Form } from '../../ui/form';
import ApiKeyInput from './api-input';
import DomainInput from './domain-input';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';

type PropsAndCustomArgs = React.ComponentProps<typeof Form> & {
  domainContext: string;
};

const meta: Meta = {
  title: 'Form Components/Inputs',
  tags: ['autodocs'],
  component: Form,
  subcomponents: {
    ApiKeyInput: ApiKeyInput as React.ComponentType<unknown>,
    DomainInput: DomainInput as React.ComponentType<unknown>,
  },
  decorators: [
    (_, { args }): React.ReactElement => {
      const form = useForm<{ apiKey: string; domain: string }>();
      const { register, handleSubmit } = form;
      const [formData, setFormData] = React.useState<string | null>(null);

      const handleOnSubmit = (data: { apiKey: string; domain: string }) => {
        setFormData(JSON.stringify(data, null, 2));
      };

      return (
        <div
          id='subi-connect-payroll-integration-worflow'
          className='subi-connect sc-h-full sc-w-full sc-p-2'
        >
          <Form {...form}>
            <form
              onSubmit={handleSubmit(handleOnSubmit)}
              className='sc-flex sc-flex-col sc-gap-2'
              autoComplete='off'
            >
              <ApiKeyInput
                {...register('apiKey')}
                id='search_subi-connect-payroll-integration-worflow_apiKey'
              />
              <DomainInput
                {...register('domain')}
                domainContext={args.domainContext}
                id='search_subi-connect-payroll-integration-worflow_domain'
              />
              <Button type='submit' className='sc-mt-4'>
                Finish
              </Button>
              {formData && (
                <pre className='sc-mt-4 sc-rounded sc-bg-gray-100 sc-p-2'>
                  {formData}
                </pre>
              )}
            </form>
          </Form>
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<PropsAndCustomArgs>;

export const Default: Story = {
  args: {
    domainContext: 'example.com',
  },
};
