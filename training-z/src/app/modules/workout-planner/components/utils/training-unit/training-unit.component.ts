import { Component, inject, input } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { TrainingUnit } from '../../../models/training-unit';
import { TrainingSectionComponent } from '../training-section/training-section.component';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { AppDialogService } from '../../../../common/services/app-dialog.service';
import { FormControl, Validators } from '@angular/forms';
import { TrainingSection } from '../../../models/training-section';
import { Subject } from 'rxjs';
import { ResponsiveService } from '../../../../common/services/responsive.service';

@Component({
  selector: 'app-training-unit',
  imports: [AccordionModule, TrainingSectionComponent, AppButtonComponent],
  templateUrl: './training-unit.component.html',
  styleUrl: './training-unit.component.scss',
})
export class TrainingUnitComponent {
  public readonly responsive = inject(ResponsiveService);

  private readonly dialogService = inject(AppDialogService);

  trainingUnit = input.required<TrainingUnit>();

  deleteUnitSubject = input.required<Subject<number>>();
  unitIndex = input.required<number>();

  deleteSectionSubject = new Subject<number>();

  constructor() {
    this.deleteSectionSubject.asObservable().subscribe((sectionIndex) => {
      this.dialogService
        .displayConfirmation(
          'Are you sure?',
          'Do you want to delete this section?'
        )
        .subscribe(() => {
          this.trainingUnit().removeSection(sectionIndex);
        });
    });
  }

  deleteTrainingUnit(): void {
    this.deleteUnitSubject().next(this.unitIndex());
  }

  editTrainingUnitName(): void {
    const form = new FormControl<string | null>(
      this.trainingUnit().name,
      Validators.required
    );

    this.dialogService
      .displayEditDialog('Add new training unit', [
        { label: 'Unit name', form: form },
      ])
      .subscribe((saved) => {
        if (!saved) {
          return;
        }

        this.trainingUnit().editName(form.value!);
      });
  }

  addTrainingSection(): void {
    const form = new FormControl<string | null>('', Validators.required);

    this.dialogService
      .displayEditDialog(
        'Add new section',
        [{ label: 'Section name', form: form }],
        'Add'
      )
      .subscribe((saved) => {
        if (!saved) {
          return;
        }

        this.trainingUnit().addSection(
          new TrainingSection('', form.value!, [])
        );
      });
  }
}
