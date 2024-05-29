import { constructAPIURL } from '@/services/api';
import { COMPANY_URL } from '@/services/api/company/paths';

export const _useCompanyMockData = {
  url: constructAPIURL(COMPANY_URL),
  method: 'GET',
  status: 200,
  response: {
    id: 1,
    name: 'Bobs Bricklaying',
    externalReferenceId: '0123',
    account: {
      id: 11,
      name: 'WorldPay',
    },
  },
};
