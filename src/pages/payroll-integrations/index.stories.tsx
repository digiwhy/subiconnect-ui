import PayrollIntegrationsPage from '.';
import { useCompanyMockData } from '../../stories/mock-data/company';
import { useOrganisationsMockData } from '../../stories/mock-data/organisation';
import {
  usePayrollsMockData,
  usePayrollsEmptyMockData,
} from '../../stories/mock-data/payroll';
import { withSubiConnectProvider } from '../../stories/wrapper';
import type { Meta, StoryObj } from '@storybook/react';

const BASE_MOCK_DATA = [useCompanyMockData, useOrganisationsMockData(1)];
const meta = {
  title: 'PayrollIntegrationsPage',
  component: withSubiConnectProvider(PayrollIntegrationsPage),
  parameters: {
    layout: 'fullscreen',
    mockData: BASE_MOCK_DATA,
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PayrollIntegrationsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  parameters: {
    mockData: [usePayrollsMockData, ...BASE_MOCK_DATA],
  },
};

export const Empty: Story = {
  args: {},
  parameters: {
    layout: 'fullscreen',
    mockData: [usePayrollsEmptyMockData, ...BASE_MOCK_DATA],
  },
};
