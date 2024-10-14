export const Payroll = {
  BAMBOO: 'BAMBOO',
  KEYPAY: 'KEYPAY',
  MYOB: 'MYOB',
  QUICKBOOKS: 'QUICKBOOKS',
  XERO: 'XERO',
} as const;

export type Payroll = (typeof Payroll)[keyof typeof Payroll];
