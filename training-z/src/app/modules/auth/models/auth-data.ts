import { Role } from './roles';

export type AuthData = {
  userId: string | null;
  accessToken: string | null;
  accessExpiryDateTime: string | null;
  refreshToken: string | null;
  role: Role;
};
