import { ExtendedUserData, PlainExtendedUserData } from './extended-user-data';
import { LastWorkoutData } from './last-workout-data';
import { TrainingPlanInfo } from './training-plan-info';

export type StudentManageData = {
  studentData: ExtendedUserData;
  trainingPlans: TrainingPlanInfo[];
  lastWorkouts: LastWorkoutData[];
};

export type PlainStudentManageData = {
  studentData: PlainExtendedUserData;
  trainingPlans: TrainingPlanInfo[];
  lastWorkouts: LastWorkoutData[];
};
