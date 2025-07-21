import { UserData } from './user-data';

export type ExtendedUserData = UserData & {
  email: string;
  phoneNumber: string | null;
};
