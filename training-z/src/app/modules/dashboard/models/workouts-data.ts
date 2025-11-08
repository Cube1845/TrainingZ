import { LastWorkoutData } from './last-workout-data';

export type WorkoutsData = {
  hasActiveTrainingPlan: boolean;
  lastWorkouts: LastWorkoutData[];
};
