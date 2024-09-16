import { SUBI_CONNECT_PUBLIC_BASE_URL } from '../../envs';
import { constructAPIURL } from '../../services/api';
import {
  PAYROLL_APPLICATIONS_URL,
  CONNECTED_PAYROLL_APPLICATIONS_URL,
  getConnectPayrollURL,
  getIntegratePayrollURL,
} from '../../services/api/payroll/paths';
import { PayrollConnectionTypeEnum } from '../../services/api/payroll/types';
import { Payroll } from '../../types/payroll';

export const usePayrollsEmptyMockData = {
  url: SUBI_CONNECT_PUBLIC_BASE_URL + constructAPIURL(PAYROLL_APPLICATIONS_URL),
  method: 'GET',
  status: 200,
  response: {
    count: 0,
    previous: null,
    next: null,
    results: [],
  },
};

export const usePayrollsMockData = {
  url: SUBI_CONNECT_PUBLIC_BASE_URL + constructAPIURL(PAYROLL_APPLICATIONS_URL),
  method: 'GET',
  status: 200,
  response: {
    count: 5,
    previous: null,
    next: null,
    results: [
      {
        id: 1,
        name: Payroll.QUICKBOOKS,
        bannerImg: 'https://example.com/images/quickbooks-logo.png',
        backgroundColour: '#4CAF50',
        isConnected: true,
        payrollId: 101,
        mdxIntegrationInstructions:
          '# QuickBooks Integration Instructions\n\n1. Go to the QuickBooks website.\n2. Sign in with your account.\n3. Follow the on-screen instructions to integrate.',
        payrollConnectionType: PayrollConnectionTypeEnum.OAUTH2,
      },
      {
        id: 2,
        name: Payroll.KEYPAY,
        bannerImg: 'https://example.com/images/adp-logo.png',
        backgroundColour: '#FF5733',
        isConnected: false,
        payrollId: 3,
        mdxIntegrationInstructions: null,
        payrollConnectionType: PayrollConnectionTypeEnum.OAUTH2,
      },
      {
        id: 3,
        name: Payroll.MYOB,
        bannerImg: 'https://example.com/images/gusto-logo.png',
        backgroundColour: '#FFC107',
        isConnected: false,
        payrollId: 103,
        mdxIntegrationInstructions:
          '# Gusto Integration Instructions\n\n1. Navigate to the Gusto app.\n2. Click on the integration tab.\n3. Enter your credentials and connect.',
        payrollConnectionType: PayrollConnectionTypeEnum.CUSTOM,
      },
      {
        id: 4,
        name: Payroll.BAMBOO,
        bannerImg: 'https://example.com/images/paychex-logo.png',
        backgroundColour: '#2196F3',
        isConnected: false,
        payrollId: 104,
        mdxIntegrationInstructions:
          '# PayChex Integration Instructions\n\n1. Sign in to your Wave account.\n2. Go to the payroll section.\n3. Follow the setup wizard to complete integration.',
        payrollConnectionType: PayrollConnectionTypeEnum.CUSTOM,
      },
      {
        id: 5,
        name: Payroll.XERO,
        bannerImg: 'https://example.com/images/wave-logo.png',
        backgroundColour: '#9C27B0',
        isConnected: false,
        payrollId: 105,
        mdxIntegrationInstructions:
          '# Wave Integration Instructions\n\n1. Sign in to your Wave account.\n2. Go to the payroll section.\n3. Follow the setup wizard to complete integration.',
        payrollConnectionType: PayrollConnectionTypeEnum.CUSTOM,
      },
    ],
  },
};

export const useConnectedPayrollsMockData = {
  url: SUBI_CONNECT_PUBLIC_BASE_URL + constructAPIURL(PAYROLL_APPLICATIONS_URL),
  method: 'GET',
  status: 200,
  response: {
    count: 5,
    previous: null,
    next: null,
    results: [
      {
        id: 1,
        name: Payroll.QUICKBOOKS,
        bannerImg: 'https://example.com/images/quickbooks-logo.png',
        backgroundColour: '#4CAF50',
        isConnected: true,
        payrollId: 101,
        mdxIntegrationInstructions:
          '# QuickBooks Integration Instructions\n\n1. Go to the QuickBooks website.\n2. Sign in with your account.\n3. Follow the on-screen instructions to integrate.',
        payrollConnectionType: PayrollConnectionTypeEnum.CUSTOM,
      },
      {
        id: 2,
        name: Payroll.KEYPAY,
        bannerImg: 'https://example.com/images/adp-logo.png',
        backgroundColour: '#FF5733',
        isConnected: false,
        payrollId: 3,
        mdxIntegrationInstructions: null,
        payrollConnectionType: PayrollConnectionTypeEnum.OAUTH2,
      },
      {
        id: 3,
        name: Payroll.MYOB,
        bannerImg: 'https://example.com/images/gusto-logo.png',
        backgroundColour: '#FFC107',
        isConnected: false,
        payrollId: 103,
        mdxIntegrationInstructions:
          '# Gusto Integration Instructions\n\n1. Navigate to the Gusto app.\n2. Click on the integration tab.\n3. Enter your credentials and connect.',
        payrollConnectionType: PayrollConnectionTypeEnum.CUSTOM,
      },
      {
        id: 4,
        name: Payroll.BAMBOO,
        bannerImg: 'https://example.com/images/paychex-logo.png',
        backgroundColour: '#2196F3',
        isConnected: false,
        payrollId: 104,
        mdxIntegrationInstructions:
          '# PayChex Integration Instructions\n\n1. Sign in to your Wave account.\n2. Go to the payroll section.\n3. Follow the setup wizard to complete integration.',
        payrollConnectionType: PayrollConnectionTypeEnum.CUSTOM,
      },
      {
        id: 5,
        name: Payroll.XERO,
        bannerImg: 'https://example.com/images/wave-logo.png',
        backgroundColour: '#9C27B0',
        isConnected: false,
        payrollId: 105,
        mdxIntegrationInstructions:
          '# Wave Integration Instructions\n\n1. Sign in to your Wave account.\n2. Go to the payroll section.\n3. Follow the setup wizard to complete integration.',
        payrollConnectionType: PayrollConnectionTypeEnum.CUSTOM,
      },
    ],
  },
};

export const useHasConnectedPayrollsMockData = {
  url:
    SUBI_CONNECT_PUBLIC_BASE_URL +
    constructAPIURL(CONNECTED_PAYROLL_APPLICATIONS_URL),
  method: 'GET',
  status: 200,
  response: {
    count: 1,
    previous: null,
    next: null,
    results: [
      {
        id: 1,
        name: Payroll.QUICKBOOKS,
        bannerImg: 'https://example.com/images/adp-logo.png',
        backgroundColour: '#FF5733',
        isConnected: false,
        payrollId: 1,
        mdxIntegrationInstructions: null,
        payrollConnectionType: PayrollConnectionTypeEnum.OAUTH2,
      },
    ],
  },
};

export const usePayrollConnectMockData = (payroll: Payroll = Payroll.XERO) => ({
  url: SUBI_CONNECT_PUBLIC_BASE_URL + getConnectPayrollURL(payroll),
  method: 'POST',
  status: 200,
  response: {
    redirectUri: undefined,
    type: PayrollConnectionTypeEnum.CUSTOM,
  },
});

export const usePayrollIntegrateMockData = (id: number = 1) => ({
  url: SUBI_CONNECT_PUBLIC_BASE_URL + getIntegratePayrollURL(id),
  method: 'POST',
  status: 200,
  response: {},
});
