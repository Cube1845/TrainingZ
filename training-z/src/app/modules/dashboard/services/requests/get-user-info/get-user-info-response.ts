import { UserInfo } from '../../../models/user-info';

export type GetCodeResponse = {
  code: string;
  userInfo: UserInfo;
};
