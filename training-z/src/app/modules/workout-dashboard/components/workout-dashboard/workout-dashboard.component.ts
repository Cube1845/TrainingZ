import { Component, inject, signal } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { AppInputComponent } from '../../../common/components/app-input/app-input.component';
import { AccordionModule } from 'primeng/accordion';
import { AppButtonComponent } from '../../../common/components/app-button/app-button.component';
import { WorkoutsService } from '../../services/workouts.service';
import { catchError, of } from 'rxjs';
import { AppToastService } from '../../../common/services/app-toast.service';
import { TrainingUnit } from '../../../workout-planner/models/training-unit';
import { Combo } from '../../../workout-planner/models/combo';

@Component({
  selector: 'app-workout-dashboard',
  imports: [
    DividerModule,
    CheckboxModule,
    AppInputComponent,
    AccordionModule,
    AppButtonComponent,
  ],
  templateUrl: './workout-dashboard.component.html',
  styleUrl: './workout-dashboard.component.scss',
})
export class WorkoutDashboardComponent {
  private readonly workoutsService = inject(WorkoutsService);
  private readonly toastService = inject(AppToastService);

  trainingUnit = signal<TrainingUnit | undefined>(undefined);

  currentSectionIndex = signal<number>(0);
  currentExerciseIndex = signal<number>(0);

  constructor() {
    this.workoutsService
      .getCurrentWorkout()
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        if (!result.isSuccess) {
          this.toastService.error(
            result.error.message || result.message || 'Error'
          );
          return;
        }

        this.trainingUnit.set(result.value.trainingUnit);
      });
  }

  getNElementArray(n: string): number[] {
    var x = [];

    for (let i = 0; i < Number(n); i++) {
      x.push(i);
    }

    return x;
  }

  getCombo(exercise: string | Combo): Combo {
    return (exercise as string).split('>');
  }
}
