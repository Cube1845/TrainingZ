import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Image } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { PlainUserData, UserData } from '../../../models/user-data';
import { Router } from '@angular/router';
import { GetStudentsService } from '../../../services/requests/get-students/get-students.service';
import { ProfileImageService } from '../../../services/profile-image.service';
import { combineLatest, Observable } from 'rxjs';
import { RemoveCoachingService } from '../../../services/requests/remove-coaching/remove-coaching.service';
import { AppDialogService } from '../../../../common/services/app-dialog.service';
import { AppToastService } from '../../../../common/services/app-toast.service';

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

  private readonly getStudentsRequest = inject(GetStudentsService);
  private readonly removeCoachingRequest = inject(RemoveCoachingService);

  students?: WritableSignal<UserData[]>;

  constructor() {
    this.setStudents();
  }

  setStudents(): void {
    this.getStudentsRequest.request().subscribe((result) => {
      if (!result.isSuccess) {
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

  removeStudent(studentData: UserData): void {
    this.dialogService
      .displayConfirmation(
        'Are you sure?',
        'Do you want to stop coaching ' +
          studentData.name +
          ' ' +
          studentData.surname
      )
      .subscribe(() => {
        this.removeCoachingRequest.request().subscribe({
          next: () => {
            this.toastService.success(
              'You stopped coaching ' +
                studentData.name +
                ' ' +
                studentData.surname
            );

            this.setStudents();
          },
        });
      });
  }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}
