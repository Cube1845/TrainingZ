import { TrainingSection } from './training-section';

export class TrainingUnit {
  id: string;
  name: string;
  sections: TrainingSection[];

  constructor(id: string, name: string, sections: TrainingSection[]) {
    this.id = id;
    this.name = name;
    this.sections = sections;
  }

  addSection(trainingSection: TrainingSection): void {
    this.sections.push(trainingSection);
  }
}
