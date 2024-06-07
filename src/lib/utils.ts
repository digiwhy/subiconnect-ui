import type { Payroll } from '../types/payroll';
import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

export const twMerge = extendTailwindMerge({
  prefix: 'sc-',
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// For Make Log on Develop Mode
export const logOnDev = (...message: unknown[]) => {
  console.log(...message);
};

export const removeUndefinedValues = (obj: object) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined),
  );
};

const intl = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
});

export const formatMoney = (number: number): string => {
  return intl.format(number);
};

export const getMoneyFromDecimals = (
  value: number,
  decimals: number = 2,
): string => {
  const denominator = Math.pow(10, decimals);

  return formatMoney(value / denominator);
};

export const getPayrollBannerImgUrl = (payrollName: Payroll): string => {
  return `https://subiconnect-devportal.subi.au/images/${payrollName}.svg`;
};
