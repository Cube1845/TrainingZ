import { PlainUserData } from '../../../models/user-data';
import { UserInfo } from '../../../models/user-info';

export type GetUserDataByCodeResponse = {
  userData: PlainUserData;
  userInfo: UserInfo;
};
