import { ExerciseProgress } from './exercise-progress';

export interface SectionProgress {
  sectionId: string;
  exercises: ExerciseProgress[];
}
