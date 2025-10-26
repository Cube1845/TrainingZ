import { Component, inject, signal } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { TrainingUnitComponent } from '../utils/training-unit/training-unit.component';
import { TrainingUnit } from '../../models/training-unit';
import { IntensityType } from '../../models/enums/intensity-type';
import { ExerciseType } from '../../models/enums/exercise-type';
import { TrainingSection } from '../../models/training-section';
import { Exercise } from '../../models/exercise';
import { AppButtonComponent } from '../../../common/components/app-button/app-button.component';
import { AppDialogService } from '../../../common/services/app-dialog.service';
import { FormControl, Validators } from '@angular/forms';
import { catchError, of, Subject } from 'rxjs';
import { AppInputComponent } from '../../../common/components/app-input/app-input.component';
import { Image } from 'primeng/image';
import { environment } from '../../../../../environments/environment.development';
import { ResponsiveService } from '../../../common/services/responsive.service';
import { StudentInfoDialogComponent } from '../dialogs/student-info-dialog/student-info-dialog.component';
import { TrainingPlan } from '../../models/training-plan';
import { PlannerService } from '../../services/planner.service';
import { AppToastService } from '../../../common/services/app-toast.service';

@Component({
  selector: 'app-workout-planner',
  imports: [AccordionModule, TrainingUnitComponent, AppButtonComponent, Image],
  templateUrl: './workout-planner.component.html',
  styleUrl: './workout-planner.component.scss',
})
export class WorkoutPlannerComponent {
  public readonly responsive = inject(ResponsiveService);

  private readonly dialogService = inject(AppDialogService);
  private readonly plannerService = inject(PlannerService);
  private readonly toastService = inject(AppToastService);

  deleteUnitSubject = new Subject<number>();

  readonly defaultProfileImageUrl = environment.defaultProfileImageUrl;

  trainingPlan = signal<TrainingPlan | undefined>(
    new TrainingPlan(
      '019a21d1-8ced-7a12-b782-620909f076b1',
      'Training plan #01',
      [],
      false
    )
  );

  constructor() {
    this.deleteUnitSubject.asObservable().subscribe((unitIndex) => {
      this.dialogService
        .displayConfirmation(
          'Are you sure?',
          'Do you want to delete this training unit?'
        )
        .subscribe(() => {
          this.trainingPlan.update((x) => {
            const currentUnits = [...x!.trainingUnits];
            currentUnits.splice(unitIndex, 1);
            return new TrainingPlan(x!.id, x!.name, currentUnits, x!.isActive);
          });
        });
    });
  }

  save(): void {
    this.plannerService
      .saveTrainingPlan(this.trainingPlan()!)
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        if (!result.isSuccess) {
          this.toastService.error(
            result.error.message || result.message || 'Invalid id'
          );
          return;
        }

        this.toastService.success('Saved');
      });
  }

  openStudentInfoDialog(): void {
    this.dialogService.displayDialog(
      StudentInfoDialogComponent,
      'Student Info',
      {},
      { width: this.responsive.lg() ? '50vw' : '95vw' }
    );
  }

  addTrainingUnit(): void {
    const form = new FormControl<string | null>('', Validators.required);

    this.dialogService
      .displayEditDialog(
        'Add new training unit',
        [{ label: 'Unit name', form: form }],
        'Add'
      )
      .subscribe((saved) => {
        if (!saved) {
          return;
        }

        this.trainingPlan.update((x) => {
          const currentUnits = [...x!.trainingUnits];
          currentUnits.push(new TrainingUnit('', form.value!, []));
          return new TrainingPlan(x!.id, x!.name, currentUnits, x!.isActive);
        });
      });
  }
}
