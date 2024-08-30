import DomainInput from './domain-input';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

const meta: Meta<typeof DomainInput> = {
  title: 'Form Components/DomainInput',
  component: DomainInput,
  tags: ['autodocs'],
  decorators: [
    (Story): React.ReactElement => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
            <Story />
            <button type='submit'>Submit</button>
          </form>
        </FormProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof DomainInput>;

export const Default: Story = {
  args: {
    name: 'domain',
    domainContext: 'example.com',
  },
};
