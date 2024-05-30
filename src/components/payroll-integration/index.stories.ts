import { _useCompanyMockData } from '../../stories/mock-data/company';
import {
  _usePayrollsMockData,
  _useConnectedPayrollsMockData,
  _usePayrollConnectMockData,
  _usePayrollIntegrateMockData,
} from '../../stories/mock-data/payroll';
import { withSubiConnectProvider } from '../../stories/wrapper';
import PayrollIntegrationList from './payroll-integration-list';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'PayrollIntegrationList',
  component: withSubiConnectProvider(PayrollIntegrationList),
  parameters: {
    layout: 'fullscreen',
    mockData: [
      _usePayrollsMockData,
      _useConnectedPayrollsMockData,
      _useCompanyMockData,
      _usePayrollConnectMockData,
      _usePayrollIntegrateMockData,
    ],
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PayrollIntegrationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
