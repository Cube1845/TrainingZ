import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LastWorkoutData } from '../../../models/last-workout-data';
import { WorkoutsData } from '../../../models/workouts-data';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';

@Component({
  selector: 'app-workouts',
  imports: [DatePipe, AppButtonComponent],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.scss',
})
export class WorkoutsComponent {
  workoutsData = signal<WorkoutsData | undefined>({
    hasActiveTrainingPlan: true,
    lastWorkouts: [
      {
        id: '',
        planName: 'First plan',
        unitName: 'Push',
        date: new Date(),
      },
      {
        id: '',
        planName: 'First plan',
        unitName: 'Pull',
        date: new Date(),
      },
      {
        id: '',
        planName: 'First plan',
        unitName: 'Balance',
        date: new Date(),
      },
    ],
  });
}
