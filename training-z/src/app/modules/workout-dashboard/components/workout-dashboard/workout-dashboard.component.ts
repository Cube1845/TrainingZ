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
import { TrainingProgress } from '../../models/training-progress';
import { TrainingSection } from '../../../workout-planner/models/training-section';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-workout-dashboard',
  imports: [
    DividerModule,
    CheckboxModule,
    AppInputComponent,
    AccordionModule,
    AppButtonComponent,
    ReactiveFormsModule,
    Menu,
  ],
  templateUrl: './workout-dashboard.component.html',
  styleUrl: './workout-dashboard.component.scss',
})
export class WorkoutDashboardComponent {
  private readonly workoutsService = inject(WorkoutsService);
  private readonly toastService = inject(AppToastService);

  trainingUnit = signal<TrainingUnit | undefined>(undefined);

  trainingProgress = signal<TrainingProgress | null>(null);

  currentSectionIndex = signal<number>(0);
  currentExerciseIndex = signal<number>(0);

  selectedSetIndex = signal<number>(0);

  setFormGroup = new FormGroup({
    comment: new FormControl<string | null>(''),
    done: new FormControl<boolean>(false),
  });

  constructor() {
    this.workoutsService
      .getCurrentWorkout()
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        if (!result.isSuccess) {
          this.toastService.error(
            result.error.message || result.message || 'Error',
          );
          return;
        }

        this.trainingUnit.set(result.value.trainingUnit);
        this.trainingProgress.set({
          unitId: result.value.trainingUnit.id,
          sections: result.value.trainingUnit.trainingSections.map(
            (section: TrainingSection) => ({
              sectionId: section.id,
              exercises: section.exercises.map((ex) => ({
                exerciseId: ex.id,
                sets: Array.from({ length: Number(ex.sets) }).map((_, i) => ({
                  index: i,
                  done: false,
                  comment: '',
                })),
              })),
            }),
          ),
        });

        this.syncFormWithSelectedSet();
      });

    this.setFormGroup.get('comment')!.valueChanges.subscribe((comment) => {
      this.trainingProgress.update((progress) => {
        if (!progress) return progress;

        const newProgress = structuredClone(progress);

        newProgress.sections[this.currentSectionIndex()].exercises[
          this.currentExerciseIndex()
        ].sets[this.selectedSetIndex()].comment = comment;

        return newProgress;
      });
    });

    this.setFormGroup.get('done')!.valueChanges.subscribe((done) => {
      this.trainingProgress.update((progress) => {
        if (!progress) return progress;

        const newProgress = structuredClone(progress);

        newProgress.sections[this.currentSectionIndex()].exercises[
          this.currentExerciseIndex()
        ].sets[this.selectedSetIndex()].done = done!;

        return newProgress;
      });
    });
  }

  menuItems: MenuItem[] = [
    {
      label: 'Finish workout',
      icon: 'pi pi-stop-circle',
      command: () => this.finishWorkout(),
    },
    {
      label: 'Back to menu',
      icon: 'pi pi-home',
      command: () => this.goBackToMenu(),
    },
  ];

  private unit(): TrainingUnit | undefined {
    return this.trainingUnit();
  }

  private syncFormWithSelectedSet(): void {
    const set = this.getSelectedSetProgress();

    this.setFormGroup.patchValue(
      {
        comment: set?.comment ?? '',
        done: set?.done ?? false,
      },
      { emitEvent: false },
    );
  }

  finishWorkout() {
    // call finish endpoint
  }

  goBackToMenu() {
    // router navigation
  }

  private getSelectedSetProgress() {
    const progress = this.trainingProgress();
    if (!progress) return null;

    return progress.sections[this.currentSectionIndex()].exercises[
      this.currentExerciseIndex()
    ].sets[this.selectedSetIndex()];
  }

  private currentExerciseProgress() {
    const progress = this.trainingProgress();
    if (!progress) return null;

    return progress.sections[this.currentSectionIndex()].exercises[
      this.currentExerciseIndex()
    ];
  }

  get currentSetsProgress() {
    return this.currentExerciseProgress()?.sets ?? [];
  }

  getCombo(exercise: string | Combo): Combo {
    return (exercise as string).split('>');
  }

  selectSet(index: number): void {
    this.selectedSetIndex.set(index);
    this.syncFormWithSelectedSet();
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

    this.selectedSetIndex.set(0);
    this.syncFormWithSelectedSet();
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

    this.selectedSetIndex.set(0);
    this.syncFormWithSelectedSet();
  }
}
