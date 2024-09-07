import { SUBI_CONNECT_PUBLIC_BASE_URL } from '../../envs';
import { constructAPIURL } from '../../services/api';
import { COMPANY_URL } from '../../services/api/company/paths';
import { Payroll } from '../../types/payroll';

export const useCompanyMockData = {
  url: SUBI_CONNECT_PUBLIC_BASE_URL + constructAPIURL(COMPANY_URL),
  method: 'GET',
  status: 200,
  response: {
    id: 1,
    name: 'Bobs Bricklaying',
    externalReferenceId: '0123',
    account: {
      id: 11,
      name: Payroll.BAMBOO,
    },
  },
};

export const useCompanyAccessTokenMockData = {
  url: SUBI_CONNECT_PUBLIC_BASE_URL + `authentication/company-access-token`,
  method: 'POST',
  status: 200,
  response: {
    accessToken: '1234567890',
  },
};
