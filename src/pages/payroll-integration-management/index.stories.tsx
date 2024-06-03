import PayrollIntegrationManagementPage from '.';
import { PayrollConnectionTypeEnum } from '../../services/api/payroll/types';
import { useOrganisationsMockData } from '../../stories/mock-data/organisation';
import { withSubiConnectProvider } from '../../stories/wrapper';
import { Payroll } from '../../types/payroll';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'PayrollIntegrationManagementPage',
  component: withSubiConnectProvider(PayrollIntegrationManagementPage),
  parameters: {
    layout: 'fullscreen',
    mockData: [useOrganisationsMockData(1)],
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
      name: Payroll.XERO,
      // backgroundColour: '#19B4D7',
      isConnected: true,
      payrollId: 1,
      mdxIntegrationInstructions: null,
      payrollConnectionType: PayrollConnectionTypeEnum.OAUTH2,
    },
  },
};
