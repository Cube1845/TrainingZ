import { Component, inject, signal } from '@angular/core';
import { CoachingService } from '../../../services/coaching.service';
import { TrainingUnitDisplayComponent } from './training-unit-display/training-unit-display.component';
import { TrainingPlan } from '../../../../workout-planner/models/training-plan';
import { TrainingUnit } from '../../../../workout-planner/models/training-unit';
import { TrainingSection } from '../../../../workout-planner/models/training-section';
import { Exercise } from '../../../../workout-planner/models/exercise';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { ResponsiveService } from '../../../../common/services/responsive.service';

@Component({
  selector: 'app-workout-selection',
  imports: [TrainingUnitDisplayComponent, AppButtonComponent],
  templateUrl: './workout-selection.component.html',
  styleUrl: './workout-selection.component.scss',
})
export class WorkoutSelectionComponent {
  public readonly responsive = inject(ResponsiveService);

  trainingPlan = signal<TrainingPlan | undefined>({
    id: '',
    name: '',
    isActive: true,
    trainingUnits: [
      new TrainingUnit('awda', 'Push', [
        new TrainingSection('awdag', 'Volume', [
          new Exercise(
            '',
            1,
            'Banded Straddle Planche Hold',
            '3',
            '4-5',
            2,
            10,
            '3 min',
            null
          ),
          new Exercise(
            '',
            2,
            ['Straddle Planche Hold', 'Straddle Planche Press'],
            '1',
            '1',
            2,
            10,
            '2 min',
            null
          ),
          new Exercise(
            '',
            2,
            ['Straddle Planche Hold', 'Straddle Planche Press'],
            '1',
            '1',
            2,
            10,
            '2 min',
            null
          ),
        ]),
      ]),
    ],
  });
}
