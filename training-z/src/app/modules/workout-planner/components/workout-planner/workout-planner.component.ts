import { Component, signal } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { TrainingUnitComponent } from '../utils/training-unit/training-unit.component';
import { TrainingUnit } from '../../models/training-unit';
import { IntensityType } from '../../models/enums/intensity-type';
import { ExerciseType } from '../../models/enums/exercise-type';
import { TrainingSection } from '../../models/training-section';
import { Exercise } from '../../models/exercise';

@Component({
  selector: 'app-workout-planner',
  imports: [AccordionModule, TrainingUnitComponent],
  templateUrl: './workout-planner.component.html',
  styleUrl: './workout-planner.component.scss',
})
export class WorkoutPlannerComponent {
  trainingUnits = signal<TrainingUnit[]>([
    new TrainingUnit('aawdawdafawf', 'Day 1', [
      new TrainingSection('awdawdawdaw', 'Attempts', [
        new Exercise(
          'awdawdawagaegae',
          ExerciseType.Regular,
          'Straddle Planche Hold',
          '3',
          '5-10s',
          IntensityType.RPE,
          10,
          'Max 5 min',
          null
        ),
      ]),
      new TrainingSection('awdawdaggawgawdaw', 'Volume', [
        new Exercise(
          'awdawdawagaegae',
          ExerciseType.Regular,
          'Straddle Planche Press',
          '3',
          '2-3',
          IntensityType.RPE,
          9,
          'Max 5 min',
          '5kg Band'
        ),
        new Exercise(
          'awdawdagagawgawagaegae',
          ExerciseType.Regular,
          'Front lever Press',
          '4',
          '2-3',
          IntensityType.RPE,
          9,
          'Max 5 min',
          null
        ),
      ]),
    ]),
  ]);
}
