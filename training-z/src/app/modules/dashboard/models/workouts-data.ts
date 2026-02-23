import { LastWorkoutData } from './last-workout-data';

export type WorkoutsData = {
  hasCurrentWorkout: boolean;
  hasActiveTrainingPlan: boolean;
  lastWorkouts: LastWorkoutData[];
};
