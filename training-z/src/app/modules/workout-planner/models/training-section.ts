import { Exercise } from './exercise';

export class TrainingSection {
  name: string;
  id: string;
  exercises: Exercise[];

  constructor(id: string, name: string, exercises: Exercise[]) {
    this.id = id;
    this.name = name;
    this.exercises = exercises;
  }

  addExercise(exercise: Exercise): void {
    this.exercises.push(exercise);
  }
}
