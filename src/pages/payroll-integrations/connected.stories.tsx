import PayrollIntegrationsListPage from '.';
import { _useCompanyMockData } from '@/stories/mock-data/company';
import { _useOrganisationsMockData } from '@/stories/mock-data/organisation';
import {
  _useConnectedPayrollsMockData,
  _useHasConnectedPayrollsMockData,
  _usePayrollsMockData,
} from '@/stories/mock-data/payroll';
import { withSubiConnectProvider } from '@/stories/wrapper';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'PayrollIntegrationsListPage - Has Connected',
  component: withSubiConnectProvider(PayrollIntegrationsListPage),
  parameters: {
    layout: 'fullscreen',
    mockData: [
      _usePayrollsMockData,
      _useHasConnectedPayrollsMockData,
      _useCompanyMockData,
      _useOrganisationsMockData,
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
