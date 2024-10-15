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

export const WithManualIntegration: Story = {
  args: {
    manualIntegrations: [
      {
        onConnect: ({ payrollSystem, onSuccessCallback, onCancelCallback }) => {
          setTimeout(() => {
            const result = window.confirm('Are you sure you want to connect?');
            if (result) {
              console.log('Connected', { payrollSystem });
              onSuccessCallback();
            } else {
              console.log('Cancelled', { payrollSystem });
              onCancelCallback();
            }
          }, 200);
        },
        friendlyName: 'ADP',
        bannerImgUrl:
          'https://au.adp.com/-/media/adp/redesign2018/ui/logo-adp-fy19.svg?rev=0769ecbf84a9412a93e2cd52b7319a13&hash=C2451A542096BF16BC40698417D5A6FD',
        description:
          'Import from ADP to securely share your payroll data with Bobs Burgers.',
        actionButtonText: 'Upload',
      },
    ],
  },
};
