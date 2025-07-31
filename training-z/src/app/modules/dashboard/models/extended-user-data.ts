import { PlainUserData, UserData } from './user-data';

export type ExtendedUserData = UserData & {
  email: string;
  phoneNumber: string | null;
};

export type PlainExtendedUserData = PlainUserData & {
  email: string;
  phoneNumber: string | null;
};
