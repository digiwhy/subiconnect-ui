import {
  useCompanyAccessTokenMockData,
  useCompanyMockData,
} from '../../stories/mock-data/company';
import {
  usePayrollsMockData,
  usePayrollConnectMockData,
  usePayrollIntegrateMockData,
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
      useCompanyAccessTokenMockData,
      useCompanyMockData,
      usePayrollsMockData,
      usePayrollConnectMockData(),
      usePayrollIntegrateMockData(),
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
