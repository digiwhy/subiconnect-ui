import PayrollIntegrationsPage from '.';
import { _useCompanyMockData } from '../../stories/mock-data/company';
import { _useOrganisationsMockData } from '../../stories/mock-data/organisation';
import {
  _usePayrollsMockData,
  _useConnectedPayrollsMockData,
} from '../../stories/mock-data/payroll';
import { withSubiConnectProvider } from '../../stories/wrapper';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'PayrollIntegrationsPage',
  component: withSubiConnectProvider(PayrollIntegrationsPage),
  parameters: {
    layout: 'fullscreen',
    mockData: [
      _usePayrollsMockData,
      _useConnectedPayrollsMockData,
      _useCompanyMockData,
      _useOrganisationsMockData,
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
