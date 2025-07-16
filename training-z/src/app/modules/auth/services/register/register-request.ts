import { AuthDto } from '../../models/auth-dto';
import { Role } from '../../models/role';

export type RegisterRequest = AuthDto & {
  name: string;
  surname: string;
  phoneNumber: string | null;
  role: Role;
};
