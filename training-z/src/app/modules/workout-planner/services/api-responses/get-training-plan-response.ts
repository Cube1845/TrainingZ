import { UserData } from '../../../dashboard/models/user-data';
import { UserInfo } from '../../../dashboard/models/user-info';
import { TrainingPlan } from '../../models/training-plan';

export type GetTrainingPlanResponse = {
  trainingPlan: TrainingPlan;
  studentInfo: UserInfo;
  studentData: UserData;
};
