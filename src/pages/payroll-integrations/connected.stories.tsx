import PayrollIntegrationsPage from '.';
import { useCompanyMockData } from '../../stories/mock-data/company';
import { useOrganisationsMockData } from '../../stories/mock-data/organisation';
import { useConnectedPayrollsMockData } from '../../stories/mock-data/payroll';
import { withSubiConnectProvider } from '../../stories/wrapper';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'PayrollIntegrationsPage - Has Connected',
  component: withSubiConnectProvider(PayrollIntegrationsPage),
  parameters: {
    layout: 'fullscreen',
    mockData: [
      useConnectedPayrollsMockData,
      useCompanyMockData,
      useOrganisationsMockData(1),
    ],
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PayrollIntegrationsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
