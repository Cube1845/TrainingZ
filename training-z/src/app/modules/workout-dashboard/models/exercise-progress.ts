import { SetProgress } from './set-progress';

export interface ExerciseProgress {
  exerciseId: string;
  sets: SetProgress[];
}
