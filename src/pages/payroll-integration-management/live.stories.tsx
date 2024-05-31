import PayrollIntegrationManagementPage from '.';
import { PayrollConnectionTypeEnum } from '../../services/api/payroll/types';
import { withSubiConnectProvider } from '../../stories/wrapper';
import { Payroll } from '../../types/payroll';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Live PayrollIntegrationManagementPage',
  component: withSubiConnectProvider(PayrollIntegrationManagementPage),
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PayrollIntegrationManagementPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    accountPayroll: {
      id: 1,
      name: Payroll.BAMBOO,
      // backgroundColour: '#19B4D7',
      isConnected: true,
      payrollId: 1,
      mdxIntegrationInstructions: null,
      payrollConnectionType: PayrollConnectionTypeEnum.CUSTOM,
    },
  },
};
