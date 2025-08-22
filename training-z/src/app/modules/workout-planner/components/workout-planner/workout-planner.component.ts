import { Component, signal } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { TrainingUnitComponent } from '../utils/training-unit/training-unit.component';
import { TrainingUnit } from '../../models/training-unit';
import { IntensityType } from '../../models/enums/intensity-type';

@Component({
  selector: 'app-workout-planner',
  imports: [AccordionModule, TrainingUnitComponent],
  templateUrl: './workout-planner.component.html',
  styleUrl: './workout-planner.component.scss',
})
export class WorkoutPlannerComponent {
  trainingUnits = signal<TrainingUnit[]>([
    {
      id: 'aawdawdafawf',
      name: 'Day 1',
      sections: [
        {
          id: 'awdawdawdaw',
          name: 'Attempts',
          exercises: [
            {
              id: 'awdawdawagaegae',
              exercise: 'Straddle Planche Hold',
              sets: '3',
              reps: '5-10s',
              intensityType: IntensityType.RPE,
              intensity: '10',
              rest: 'Max 5 min',
              info: null,
            },
          ],
        },
        {
          id: 'awdawdaggawgawdaw',
          name: 'Volume',
          exercises: [
            {
              id: 'awdawdawagaegae',
              exercise: 'Straddle Planche Press',
              sets: '3',
              reps: '2-3',
              intensityType: IntensityType.RPE,
              intensity: '9',
              rest: 'Max 5 min',
              info: '5kg band',
            },
            {
              id: 'awdawdawagaegae',
              exercise: 'Front lever Press',
              sets: '4',
              reps: '2-3',
              intensityType: IntensityType.RPE,
              intensity: '9',
              rest: 'Max 5 min',
              info: null,
            },
          ],
        },
      ],
    },
  ]);
}
