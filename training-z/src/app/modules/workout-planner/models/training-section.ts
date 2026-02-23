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

  static fromBackend(raw: any): TrainingSection {
    return new TrainingSection(
      raw.id,
      raw.name,
      raw.exercises.map((e: any) => Exercise.fromBackend(e))
    );
  }

  editSectionName(name: string): void {
    this.name = name;
  }

  addExercise(exercise: Exercise): void {
    this.exercises.push(exercise);
  }

  editExercise(exerciseIndex: number, exercise: Exercise): void {
    this.exercises[exerciseIndex] = exercise;
  }

  deleteExercise(exerciseIndex: number): void {
    this.exercises.splice(exerciseIndex, 1);
  }
}
