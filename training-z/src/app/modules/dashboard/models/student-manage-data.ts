import { ExtendedUserData } from './extended-user-data';
import { LastWorkoutData } from './last-workout-data';
import { TrainingPlanInfo } from './training-plan-info';

export type StudentManageData = {
  studentData: ExtendedUserData;
  trainingPlans: TrainingPlanInfo[];
  lastWorkouts: LastWorkoutData[];
};
