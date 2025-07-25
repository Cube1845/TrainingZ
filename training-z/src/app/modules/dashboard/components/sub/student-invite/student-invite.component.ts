import { Component, inject, signal } from '@angular/core';
import { ResponsiveService } from '../../../../common/services/responsive.service';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { AppToastService } from '../../../../common/services/app-toast.service';
import { UserData } from '../../../models/user-data';
import { Image } from 'primeng/image';

@Component({
  selector: 'app-student-invite',
  imports: [AppButtonComponent, Image],
  templateUrl: './student-invite.component.html',
  styleUrl: './student-invite.component.scss',
})
export class StudentInviteComponent {
  public readonly responsiveService = inject(ResponsiveService);
  private readonly toastService = inject(AppToastService);

  code = signal<string | undefined>(undefined);

  timer = signal<number | undefined>(undefined);
  timerIntervalId?: any;

  invitedUserData = signal<UserData | undefined>(undefined);

  copyCode() {
    navigator.clipboard
      .writeText(this.code()!)
      .then(() => {
        this.toastService.success('Copied!');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  }

  generateCode(): void {
    this.startTimer(120);
    this.code.set('awdghs2gus');
  }

  cancelCode(): void {
    this.code.set(undefined);
    this.stopTimer();
  }

  startTimer(seconds: number): void {
    this.timer.set(seconds);

    this.timerIntervalId = setInterval(() => {
      if (
        this.timer() == undefined ||
        (this.timer() != undefined && this.timer()! <= 0)
      ) {
        this.cancelCode();

        return;
      }

      this.timer.update((x) => x! - 1);
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.timerIntervalId);
  }
}
