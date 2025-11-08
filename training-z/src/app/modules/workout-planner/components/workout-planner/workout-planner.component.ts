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
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../../dashboard/models/user-data';
import { UserInfo } from '../../../dashboard/models/user-info';
import { ProfileImageService } from '../../../dashboard/services/profile-image.service';
import { Combo } from '../../models/combo';

@Component({
  selector: 'app-workout-planner',
  imports: [AccordionModule, TrainingUnitComponent, AppButtonComponent, Image],
  templateUrl: './workout-planner.component.html',
  styleUrl: './workout-planner.component.scss',
})
export class WorkoutPlannerComponent {
  public readonly responsive = inject(ResponsiveService);

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly dialogService = inject(AppDialogService);
  private readonly plannerService = inject(PlannerService);
  private readonly toastService = inject(AppToastService);
  private readonly profileImageService = inject(ProfileImageService);

  deleteUnitSubject = new Subject<number>();

  trainingPlan = signal<TrainingPlan | undefined>(undefined);

  studentData = signal<UserData | undefined>(undefined);

  studentInfo = signal<UserInfo | undefined>(undefined);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.plannerService
        .getTrainingPlan(params['id'])
        .pipe(catchError((err) => of(err)))
        .subscribe((result) => {
          if (!result.isSuccess) {
            this.toastService.error(
              result.error.message || result.message || 'Invalid id'
            );
            return;
          }

          this.trainingPlan.set(
            new TrainingPlan(
              result.value.trainingPlan.id,
              result.value.trainingPlan.name,
              result.value.trainingPlan.trainingUnits.map((u: TrainingUnit) => {
                return new TrainingUnit(
                  u.id,
                  u.name,
                  u.trainingSections.map((s: TrainingSection) => {
                    return new TrainingSection(
                      s.id,
                      s.name,
                      s.exercises.map((e: Exercise) => {
                        const name = this.isCombo(e.name, e.exerciseType)
                          ? e.name.split('>')
                          : e.name;

                        return new Exercise(
                          e.id,
                          e.exerciseType,
                          name,
                          e.sets,
                          e.reps,
                          e.intensityType,
                          e.intensity,
                          e.rest,
                          e.info
                        );
                      })
                    );
                  })
                );
              }),
              result.value.trainingPlan.isActive
            )
          );
          this.studentInfo.set(result.value.studentInfo);

          this.profileImageService
            .convertProfileImageId(result.value.studentData)
            .subscribe((userData) => {
              this.studentData.set(userData);
            });
        });
    });

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

  private isCombo(obj: string | Combo, et: ExerciseType): obj is string {
    return et == ExerciseType.Combo;
  }

  changeTrainingPlanActiveState(): void {
    var fn = this.trainingPlan()!.isActive
      ? () =>
          this.dialogService.displayConfirmation(
            'Are you sure?',
            'Do you want to deactivate this training plan? This student will have no training plan active.'
          )
      : () =>
          this.dialogService.displayConfirmation(
            'Are you sure?',
            'Do you want to activate this training plan? Other active plans will be deactivated.'
          );

    fn().subscribe(() => {
      this.plannerService
        .changeTrainingPlanActiveState(
          this.trainingPlan()!.id,
          this.studentData()!.id
        )
        .pipe(catchError((err) => of(err)))
        .subscribe((result) => {
          if (!result.isSuccess) {
            this.toastService.error(
              result.error.message || result.message || 'Invalid id'
            );
            return;
          }

          this.trainingPlan.update((x) => {
            x!.isActive = !x!.isActive;
            return x;
          });
          this.toastService.success(
            this.trainingPlan()!.isActive
              ? 'You activated this training plan'
              : 'You deactivated this training plan'
          );
        });
    });
  }

  editPlanName(): void {
    const form = new FormControl<string | null>(this.trainingPlan()!.name);

    this.dialogService
      .displayEditDialog("Edit training plan's name", [
        { label: 'Name', form: form },
      ])
      .subscribe((result) => {
        if (result) {
          this.trainingPlan.update((x) => {
            x!.name = form.value!;
            return x;
          });
        }
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
      { studentData: this.studentData, userInfo: this.studentInfo },
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
