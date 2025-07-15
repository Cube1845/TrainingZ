import { AuthDto } from '../../models/auth-dto';
import { Role } from '../../models/role';

export type RegisterRequest = AuthDto & {
  role: Role;
};
