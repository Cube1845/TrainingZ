import { LastWorkoutData } from '../../../dashboard/models/last-workout-data';

export type GetWorkoutHistoryResponse = {
  workouts: LastWorkoutData[];
};
