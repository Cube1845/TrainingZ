import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Image } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { UserData } from '../../../models/user-data';
import { Router } from '@angular/router';
import { ProfileImageService } from '../../../services/profile-image.service';
import { catchError, combineLatest, of } from 'rxjs';
import { AppDialogService } from '../../../../common/services/app-dialog.service';
import { AppToastService } from '../../../../common/services/app-toast.service';
import { CoachingService } from '../../../services/coaching.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-students',
  imports: [Image, DividerModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  private readonly router = inject(Router);
  private readonly profileImageService = inject(ProfileImageService);
  private readonly dialogService = inject(AppDialogService);
  private readonly toastService = inject(AppToastService);
  private readonly coachingService = inject(CoachingService);

  students?: WritableSignal<UserData[]>;

  constructor() {
    this.setStudents();
  }

  setStudents(): void {
    this.coachingService.getStudents().subscribe((result) => {
      if (!result.isSuccess) {
        this.toastService.error(result.message || 'There was an error');
        return;
      }

      if (result.value.students.length == 0) {
        this.students = signal<UserData[]>([]);
        return;
      }

      const observables = result.value.students.map((x) =>
        this.profileImageService.convertProfileImageId(x)
      );

      const combinedObservable = combineLatest(observables);

      combinedObservable.subscribe((value) => {
        this.students = signal<UserData[]>(value);
      });
    });
  }

  removeStudent(studentData: UserData, event: Event): void {
    event.stopPropagation();

    this.dialogService
      .displayConfirmation(
        'Are you sure?',
        'Do you want to stop coaching ' +
          studentData.name +
          ' ' +
          studentData.surname
      )
      .subscribe(() => {
        this.coachingService
          .removeCoaching(studentData.id)
          .pipe(catchError((err) => of(err)))
          .subscribe((result) => {
            if (!result.isSuccess) {
              this.toastService.error(
                result.error.message || result.message || 'There was an error'
              );
              return;
            }

            this.toastService.success(
              'You stopped coaching ' +
                studentData.name +
                ' ' +
                studentData.surname
            );

            this.setStudents();
          });
      });
  }

  sendMessage(studentData: UserData, event: Event): void {
    event.stopPropagation();

    const messageControl = new FormControl('', [
      Validators.required,
      Validators.maxLength(600),
    ]);

    this.dialogService
      .displayEditDialog('Send message', [
        {
          label: 'Message',
          form: messageControl,
        },
      ], 'Send')
      .subscribe((shouldSend) => {
        if (!shouldSend) {
          return;
        }

        this.coachingService
          .sendNotification(studentData.id, messageControl.value || '')
          .pipe(catchError((err) => of(err)))
          .subscribe((result) => {
            if (!result.isSuccess) {
              this.toastService.error(
                result.error.message || result.message || 'There was an error'
              );
              return;
            }

            this.toastService.success(
              'Message sent to ' + studentData.name + ' ' + studentData.surname
            );
          });
      });
  }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}
