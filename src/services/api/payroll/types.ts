export enum PayrollConnectionTypeEnum {
  CUSTOM = 'CUSTOM',
  OAUTH2 = 'OAUTH2',
  OAUTH2_AND_COMPANY_MANUALLY = 'OAUTH2_AND_COMPANY_MANUALLY',
}

export type ConnectPayrollResponse =
  | ConnectPayrollCustomResponse
  | ConnectPayrollOAuth2Response
  | ConnectPayrollOAuth2AndCustomResponse;

type ConnectPayrollCustomResponse = {
  redirectUri: undefined;
  type: PayrollConnectionTypeEnum.CUSTOM;
};

type ConnectPayrollOAuth2Response = {
  redirectUri: string;
  type: PayrollConnectionTypeEnum.OAUTH2;
};

type ConnectPayrollOAuth2AndCustomResponse = {
  redirectUri: string;
  type: PayrollConnectionTypeEnum.OAUTH2_AND_COMPANY_MANUALLY;
};
