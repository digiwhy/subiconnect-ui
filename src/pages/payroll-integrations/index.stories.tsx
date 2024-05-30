import PayrollIntegrationsListPage from '.';
import { _useCompanyMockData } from '../../stories/mock-data/company';
import {
  _usePayrollsMockData,
  _useConnectedPayrollsMockData,
} from '../../stories/mock-data/payroll';
import { withSubiConnectProvider } from '../../stories/wrapper';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'PayrollIntegrationsListPage',
  component: withSubiConnectProvider(PayrollIntegrationsListPage),
  parameters: {
    layout: 'fullscreen',
    mockData: [
      _usePayrollsMockData,
      _useConnectedPayrollsMockData,
      _useCompanyMockData,
    ],
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PayrollIntegrationsListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
