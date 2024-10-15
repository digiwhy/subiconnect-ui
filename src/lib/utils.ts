import { SUBI_CONNECT_IMAGES_BASE_URL } from '../envs';
import type { Payroll } from '../types/payroll';
import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

export const twMerge = extendTailwindMerge({
  prefix: 'sc-',
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const tw = (className: TemplateStringsArray, ...classNames: string[]) =>
  String.raw({ raw: className }, ...classNames);

export const removeUndefinedValues = <T extends object>(obj: T): T => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined),
  ) as T;
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
  return `${SUBI_CONNECT_IMAGES_BASE_URL}images/${payrollName}.svg`;
};

export const createNestedObjectFromString = <T>(
  key: string,
  value: T,
): Record<string, unknown> => {
  return key
    .split('.')
    .reduceRight<
      Record<string, unknown>
    >((acc, keyPart) => ({ [keyPart]: acc }), value as unknown as Record<string, unknown>);
};

export const getPayrollFriendlyName = <
  TPayrollSystem extends { friendlyName?: string; name: string },
>(
  application: TPayrollSystem,
) => {
  return application.friendlyName ?? application.name;
};
