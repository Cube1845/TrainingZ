import { TrainingSection } from './training-section';

export class TrainingUnit {
  id: string;
  name: string;
  trainingSections: TrainingSection[];

  constructor(id: string, name: string, trainingSections: TrainingSection[]) {
    this.id = id;
    this.name = name;
    this.trainingSections = trainingSections;
  }

  editName(name: string): void {
    this.name = name;
  }

  addSection(trainingSection: TrainingSection): void {
    this.trainingSections.push(trainingSection);
  }

  removeSection(sectionIndex: number): void {
    this.trainingSections.splice(sectionIndex, 1);
  }
}
