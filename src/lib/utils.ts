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

export const getPayrollBannerImgUrl = (payrollName: string): string => {
  return `https://TODO/payroll/${payrollName}.png`;
};
