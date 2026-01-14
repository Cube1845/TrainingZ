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

  private unit(): TrainingUnit | undefined {
    return this.trainingUnit();
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

  canMoveForward(): boolean {
    const unit = this.unit();
    if (!unit) return false;

    const sectionIndex = this.currentSectionIndex();
    const exerciseIndex = this.currentExerciseIndex();
    const sections = unit.trainingSections;
    const exercises = sections[sectionIndex].exercises;

    if (exerciseIndex + 1 < exercises.length) {
      return true;
    }

    return sectionIndex + 1 < sections.length;
  }

  canMoveBackward(): boolean {
    const unit = this.unit();
    if (!unit) return false;

    return !(
      this.currentSectionIndex() === 0 && this.currentExerciseIndex() === 0
    );
  }

  nextExercise(): void {
    if (!this.canMoveForward()) return;

    const unit = this.unit()!;
    const sectionIndex = this.currentSectionIndex();
    const exerciseIndex = this.currentExerciseIndex();
    const exercises = unit.trainingSections[sectionIndex].exercises;

    if (exerciseIndex + 1 < exercises.length) {
      this.currentExerciseIndex.update((i) => i + 1);
    } else {
      this.currentSectionIndex.update((i) => i + 1);
      this.currentExerciseIndex.set(0);
    }
  }

  previousExercise(): void {
    if (!this.canMoveBackward()) return;

    const unit = this.unit()!;
    const sectionIndex = this.currentSectionIndex();
    const exerciseIndex = this.currentExerciseIndex();

    if (exerciseIndex > 0) {
      this.currentExerciseIndex.update((i) => i - 1);
    } else {
      const prevSectionIndex = sectionIndex - 1;
      const prevSection = unit.trainingSections[prevSectionIndex];

      this.currentSectionIndex.set(prevSectionIndex);
      this.currentExerciseIndex.set(prevSection.exercises.length - 1);
    }
  }
}
