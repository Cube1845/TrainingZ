import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LastWorkoutData } from '../../../models/last-workout-data';
import { WorkoutsData } from '../../../models/workouts-data';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { Router } from '@angular/router';
import { CoachingService } from '../../../services/coaching.service';
import { catchError, of } from 'rxjs';
import { AppToastService } from '../../../../common/services/app-toast.service';
import { WorkoutsService } from '../../../../workout-dashboard/services/workouts.service';

@Component({
  selector: 'app-workouts',
  imports: [DatePipe, AppButtonComponent],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.scss',
})
export class WorkoutsComponent {
  private readonly router = inject(Router);
  private readonly workoutsService = inject(WorkoutsService);
  private readonly toastService = inject(AppToastService);

  constructor() {
    this.workoutsService
      .getWorkoutsData()
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        if (!result.isSuccess) {
          this.toastService.error(
            result.error.message || result.message || 'Invalid id'
          );
          return;
        }

        this.workoutsData.set(result.value);
      });
  }

  goToWorkoutSelection(): void {
    this.router.navigateByUrl('dashboard/workout-selection');
  }

  workoutsData = signal<WorkoutsData | undefined>(undefined);
}
