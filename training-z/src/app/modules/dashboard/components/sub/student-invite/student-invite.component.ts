import { Component, inject, signal } from '@angular/core';
import { ResponsiveService } from '../../../../common/services/responsive.service';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { AppToastService } from '../../../../common/services/app-toast.service';
import { UserData } from '../../../models/user-data';
import { AppInputComponent } from '../../../../common/components/app-input/app-input.component';
import { Image } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { HttpClient } from '@angular/common/http';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetUserDataService } from '../../../services/requests/get-user-data/get-user-data.service';
import { ProfileImageService } from '../../../services/profile-image.service';

@Component({
  selector: 'app-student-invite',
  imports: [
    AppButtonComponent,
    AppInputComponent,
    Image,
    DividerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './student-invite.component.html',
  styleUrl: './student-invite.component.scss',
})
export class StudentInviteComponent {
  public readonly responsiveService = inject(ResponsiveService);

  private readonly getUserDataRequest = inject(GetUserDataService);
  private readonly profileImageService = inject(ProfileImageService);

  code = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  invitedUserData = signal<UserData | null>(null);

  findStudent(): void {
    this.getUserDataRequest
      .request(undefined, { code: this.code.value! })
      .subscribe((plainUserData) =>
        this.profileImageService
          .convertProfileImageId(plainUserData.value)
          .subscribe((userData) => this.invitedUserData.set(userData))
      );
  }

  // {
  //   name: 'Adam',
  //   surname: 'Kowalski',
  //   id: 'awdawdawd-awdawdghs-srhgsdrgd',
  //   profileImageUrl: 'imgs/default_avatar.jpg',
  // }
}
