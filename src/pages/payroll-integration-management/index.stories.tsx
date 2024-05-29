import PayrollIntegrationManagementPage from '.';
import { PayrollConnectionTypeEnum } from '@/services/api/payroll/types';
import { _useOrganisationsMockData } from '@/stories/mock-data/organisation';
import { withSubiConnectProvider } from '@/stories/wrapper';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'PayrollIntegrationManagementPage',
  component: withSubiConnectProvider(PayrollIntegrationManagementPage),
  parameters: {
    layout: 'fullscreen',
    mockData: [_useOrganisationsMockData],
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PayrollIntegrationManagementPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    payroll: {
      id: 1,
      name: 'Xero Payroll',
      bannerImg: '',
      backgroundColour: '#19B4D7',
      isConnected: true,
      payrollId: 1,
      mdxIntegrationInstructions: null,
      payrollConnectionType: PayrollConnectionTypeEnum.OAUTH2,
    },
  },
};
