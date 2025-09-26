import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AppToastService } from '../../../../common/services/app-toast.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { TextareaModule } from 'primeng/textarea';
import { DividerModule } from 'primeng/divider';
import { ResponsiveService } from '../../../../common/services/responsive.service';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CoachingService } from '../../../services/coaching.service';

@Component({
  selector: 'app-invitation-code',
  imports: [
    TextareaModule,
    DividerModule,
    AppButtonComponent,
    ReactiveFormsModule,
    CardModule,
  ],
  templateUrl: './invitation-code.component.html',
  styleUrl: './invitation-code.component.scss',
})
export class InvitationCodeComponent {
  public readonly responsive = inject(ResponsiveService);

  private readonly toastService = inject(AppToastService);
  private readonly router = inject(Router);
  private readonly coachingService = inject(CoachingService);

  code?: WritableSignal<string>;

  form = new FormGroup({
    goals: new FormControl<string>(''),
    sleepDiet: new FormControl<string>(''),
    activity: new FormControl<string>(''),
    injuries: new FormControl<string>(''),
    timeAvaiable: new FormControl<string>(''),
    other: new FormControl<string>(''),
  });

  constructor() {
    this.coachingService
      .getUserInfo()
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        if (!result.isSuccess) {
          this.router.navigateByUrl('dashboard/coach');
          return;
        }

        this.code = signal<string>(result.value.code);
        this.form.setValue(result.value.userInfo);
      });
  }

  copyCode() {
    navigator.clipboard
      .writeText(this.code!())
      .then(() => {
        this.toastService.success('Copied!');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  }

  saveUserInfo(): void {
    this.coachingService
      .updateUserInfo(this.form.value)
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        if (!result.isSuccess) {
          this.toastService.error(
            result.error.message || result.message || 'There was an error'
          );
          return;
        }

        this.toastService.success('Saved!');
      });
  }
}
