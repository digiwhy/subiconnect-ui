import type {
  BambooIntegrationParams,
  KeyPayIntegrationParams,
} from '@/types/integration';
import type { KeysOfUnion } from '@/types/utils';

export type CustomPayrollIntegrationWorkflowInputs = KeysOfUnion<
  BambooIntegrationParams | KeyPayIntegrationParams
>;
