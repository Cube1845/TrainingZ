export type UserInfo = {
  goals: string;
  sleepDiet: string;
  activity: string;
  injuries: string;
  timeAvaiable: string;
  other: string;
};

export const QuestionKeys: (keyof UserInfo)[] = [
  'goals',
  'sleepDiet',
  'activity',
  'injuries',
  'timeAvaiable',
  'other',
];
