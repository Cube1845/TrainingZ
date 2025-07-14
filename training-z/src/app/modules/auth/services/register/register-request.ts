import { AuthDto } from '../../models/auth-dto';
import { Role } from '../../models/roles';

export type RegisterRequest = AuthDto & {
  role: Role;
};
