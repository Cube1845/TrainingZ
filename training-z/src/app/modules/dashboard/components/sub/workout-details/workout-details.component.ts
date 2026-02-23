import { Component, inject, OnInit, signal } from '@angular/core';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { DatePipe } from '@angular/common';
import { WorkoutsService } from '../../../../workout-dashboard/services/workouts.service';
import { ActivatedRoute } from '@angular/router';
import { WorkoutDetails } from '../../../models/workout-details';
import { catchError, of } from 'rxjs';
import { AppToastService } from '../../../../common/services/app-toast.service';

@Component({
  selector: 'app-workout-details',
  imports: [AppButtonComponent, CardModule, AccordionModule, DatePipe],
  templateUrl: './workout-details.component.html',
  styleUrl: './workout-details.component.scss',
})
export class WorkoutDetailsComponent implements OnInit {
  private readonly workoutsService = inject(WorkoutsService);
  private readonly route = inject(ActivatedRoute);
  private readonly toastService = inject(AppToastService);

  selectedSetIndex = 0;

  workout = signal<WorkoutDetails | null>(null);
  loading = signal(true);

  studentId = signal<string | null>(null);

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const studentId = params.get('studentId');
      this.studentId.set(studentId);
    });

    const workoutId = this.route.snapshot.paramMap.get('id')!;
    this.workoutsService
      .getWorkoutDetails(workoutId, this.studentId())
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        if (!result.isSuccess) {
          this.toastService.error(
            result.error.message || result.message || 'Invalid id',
          );
          return;
        }

        this.workout.set(result.value);
        this.loading.set(false);
      });
  }

  goBack() {
    history.back();
  }
}
