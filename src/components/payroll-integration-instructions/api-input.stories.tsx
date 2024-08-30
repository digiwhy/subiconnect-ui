import ApiKeyInput from './api-input';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

const meta: Meta<typeof ApiKeyInput> = {
  title: 'Form Components/ApiKeyInput',
  component: ApiKeyInput,
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
type Story = StoryObj<typeof ApiKeyInput>;

export const Default: Story = {};
