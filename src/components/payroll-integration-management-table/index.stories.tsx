import PayrollIntegrationManagementTable from '.';
import { _useOrganisationsMockData } from '../../stories/mock-data/organisation';
import {
  _usePayrollConnectMockData,
  _usePayrollIntegrateMockData,
} from '../../stories/mock-data/payroll';
import { withSubiConnectProvider } from '../../stories/wrapper';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'PayrollIntegrationManagementTable',
  component: withSubiConnectProvider(PayrollIntegrationManagementTable),
  parameters: {
    layout: 'fullscreen',
    mockData: [
      _useOrganisationsMockData,
      _usePayrollConnectMockData,
      _usePayrollIntegrateMockData,
    ],
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PayrollIntegrationManagementTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { accountPayrollId: 1 },
};
