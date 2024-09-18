export enum AccountUserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export type Me = {
  id: number;
  name: string;
  accountId: number;
  role: AccountUserRole;
};
