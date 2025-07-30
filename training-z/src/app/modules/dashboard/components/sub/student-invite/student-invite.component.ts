import { Component, inject, signal } from '@angular/core';
import { ResponsiveService } from '../../../../common/services/responsive.service';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { AppToastService } from '../../../../common/services/app-toast.service';
import { UserData } from '../../../models/user-data';
import { AppInputComponent } from '../../../../common/components/app-input/app-input.component';
import { Image } from 'primeng/image';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-student-invite',
  imports: [AppButtonComponent, AppInputComponent, Image, DividerModule],
  templateUrl: './student-invite.component.html',
  styleUrl: './student-invite.component.scss',
})
export class StudentInviteComponent {
  public readonly responsiveService = inject(ResponsiveService);

  code = signal<string | undefined>(undefined);

  invitedUserData = signal<UserData | null>(null);

  // {
  //   name: 'Adam',
  //   surname: 'Kowalski',
  //   id: 'awdawdawd-awdawdghs-srhgsdrgd',
  //   profileImageUrl: 'imgs/default_avatar.jpg',
  // }
}
