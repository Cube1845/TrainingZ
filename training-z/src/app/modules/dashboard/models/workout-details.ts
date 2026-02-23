import { WorkoutExerciseDetails } from './workout-exercise-details';

export type WorkoutDetails = {
  id: string;
  unitName: string;
  planName: string;
  finishedAt: Date;
  exercises: WorkoutExerciseDetails[];
};
