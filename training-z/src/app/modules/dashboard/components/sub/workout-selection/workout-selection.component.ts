import { Component, inject, signal } from '@angular/core';
import { CoachingService } from '../../../services/coaching.service';
import { TrainingUnitDisplayComponent } from './training-unit-display/training-unit-display.component';
import { TrainingPlan } from '../../../../workout-planner/models/training-plan';
import { TrainingUnit } from '../../../../workout-planner/models/training-unit';
import { TrainingSection } from '../../../../workout-planner/models/training-section';
import { Exercise } from '../../../../workout-planner/models/exercise';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { ResponsiveService } from '../../../../common/services/responsive.service';
import { catchError, of } from 'rxjs';
import { AppToastService } from '../../../../common/services/app-toast.service';
import { ExerciseType } from '../../../../workout-planner/models/enums/exercise-type';
import { WorkoutsService } from '../../../../workout-dashboard/services/workouts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-selection',
  imports: [TrainingUnitDisplayComponent, AppButtonComponent],
  templateUrl: './workout-selection.component.html',
  styleUrl: './workout-selection.component.scss',
})
export class WorkoutSelectionComponent {
  public readonly responsive = inject(ResponsiveService);

  private readonly workoutsService = inject(WorkoutsService);
  private readonly toastService = inject(AppToastService);
  private readonly router = inject(Router);

  trainingPlan = signal<TrainingPlan | undefined>(undefined);

  constructor() {
    this.workoutsService
      .getActiveTrainingPlan()
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        if (!result.isSuccess) {
          this.toastService.error(
            result.error.message || result.message || 'Error'
          );
          return;
        }

        const plan: TrainingPlan = result.value.trainingPlan;
        plan.trainingUnits.forEach((u) => {
          u.trainingSections.forEach((s) => {
            s.exercises.forEach((e) => {
              if (e.exerciseType == ExerciseType.Combo) {
                e.name = (e.name as string).split('>');
              }
            });
          });
        });

        this.trainingPlan.set(plan);
      });
  }

  startWorkout(unitId: string): void {
    this.workoutsService
      .startWorkout(unitId)
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        if (!result.isSuccess) {
          this.toastService.error(
            result.error.message || result.message || 'Error'
          );
          return;
        }

        this.router.navigateByUrl('workout-dashboard');
      });
  }
}
