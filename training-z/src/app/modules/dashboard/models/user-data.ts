export type UserData = {
  name: string;
  surname: string;
  readonly profileImageUrl: string | null;
  id: string;
};

export type PlainUserData = Omit<UserData, 'profileImageUrl'> & {
  readonly profileImageId: string;
};
