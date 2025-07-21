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
    this.code.set('awdghs2gus');
  }

  cancelCode(): void {
    this.code.set(undefined);
  }
}
