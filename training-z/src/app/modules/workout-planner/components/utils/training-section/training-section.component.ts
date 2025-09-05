import { Component, inject, input } from '@angular/core';
import { TrainingSection } from '../../../models/training-section';
import { AccordionModule } from 'primeng/accordion';
import { ExercisePanelComponent } from '../exercise-panel/exercise-panel.component';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { AppDialogService } from '../../../../common/services/app-dialog.service';
import { ExerciseEditDialogComponent } from '../../dialogs/exercise-edit-dialog/exercise-edit-dialog.component';

@Component({
  selector: 'app-training-section',
  imports: [AccordionModule, ExercisePanelComponent, AppButtonComponent],
  templateUrl: './training-section.component.html',
  styleUrl: './training-section.component.scss',
})
export class TrainingSectionComponent {
  private readonly dialogService = inject(AppDialogService);

  trainingSection = input.required<TrainingSection>();

  addNewExercise(): void {
    this.dialogService
      .displayDialog(ExerciseEditDialogComponent, 'Add new exercise', {
        saveButtonLabel: 'Add',
      })
      .subscribe((exercise: any) => {
        if (!exercise) {
          return;
        }

        exercise.id = 'oidhgodurng';

        this.trainingSection().addExercise(exercise);
      });
  }

  editExercise(exerciseIndex: number): void {
    this.dialogService
      .displayDialog(ExerciseEditDialogComponent, 'Edit exercise', {
        saveButtonLabel: 'Save',
        exercise: this.trainingSection().exercises[exerciseIndex],
      })
      .subscribe((exercise: any) => {
        if (!exercise) {
          return;
        }

        if (exercise === 1) {
          this.trainingSection().deleteExercise(exerciseIndex);
          return;
        }

        this.trainingSection().editExercise(exerciseIndex, exercise);
      });
  }

  deleteExercise(exerciseIndex: number): void {
    this.trainingSection().deleteExercise(exerciseIndex);
  }
}
