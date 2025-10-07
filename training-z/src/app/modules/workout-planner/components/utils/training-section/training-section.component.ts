import { Component, inject, input } from '@angular/core';
import { TrainingSection } from '../../../models/training-section';
import { AccordionModule } from 'primeng/accordion';
import { ExercisePanelComponent } from '../exercise-panel/exercise-panel.component';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { AppDialogService } from '../../../../common/services/app-dialog.service';
import { ExerciseEditDialogComponent } from '../../dialogs/exercise-edit-dialog/exercise-edit-dialog.component';
import { Subject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-training-section',
  imports: [AccordionModule, ExercisePanelComponent, AppButtonComponent],
  templateUrl: './training-section.component.html',
  styleUrl: './training-section.component.scss',
})
export class TrainingSectionComponent {
  private readonly dialogService = inject(AppDialogService);

  trainingSection = input.required<TrainingSection>();

  sectionIndex = input.required<number>();
  deleteSectionSubject = input.required<Subject<number>>();

  deleteSection(event: Event): void {
    event.stopPropagation();
    this.deleteSectionSubject().next(this.sectionIndex());
  }

  editSectionName(event: Event): void {
    event.stopPropagation();

    const form = new FormControl<string>(
      this.trainingSection().name,
      Validators.required
    );

    this.dialogService
      .displayEditDialog('Add new section', [
        { label: 'Section name', form: form },
      ])
      .subscribe((saved) => {
        if (!saved) {
          return;
        }

        this.trainingSection().editSectionName(form.value!);
      });
  }

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
          this.dialogService
            .displayConfirmation(
              'Are you sure?',
              'Do you want to delete this exercise?'
            )
            .subscribe(() => {
              this.trainingSection().deleteExercise(exerciseIndex);
            });
          return;
        }

        this.trainingSection().editExercise(exerciseIndex, exercise);
      });
  }

  deleteExercise(exerciseIndex: number): void {
    this.dialogService
      .displayConfirmation(
        'Are you sure?',
        'Do you want to delete this exercise?'
      )
      .subscribe(() => {
        this.trainingSection().deleteExercise(exerciseIndex);
      });
  }
}
