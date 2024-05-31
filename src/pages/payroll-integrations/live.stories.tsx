import PayrollIntegrationsPage from '.';
import { withSubiConnectProvider } from '../../stories/wrapper';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Live PayrollIntegrationsPage',
  component: withSubiConnectProvider(PayrollIntegrationsPage),
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PayrollIntegrationsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
