import { getOrganisationURL } from './paths';
import { withConnectionService } from '@/services/api/utils';
import { ConnectionService } from '@/services/axios/connection-service';
import type { Organisation } from '@/types/organisation';

export const getOrganisation = withConnectionService(
  async (
    connectionService: ConnectionService,
    organisationId: number | string,
  ): Promise<Organisation> => {
    const httpClient = connectionService.getHttpClient();
    const response = await httpClient.get<Organisation>(
      getOrganisationURL(organisationId),
    );
    return response.data;
  },
);
