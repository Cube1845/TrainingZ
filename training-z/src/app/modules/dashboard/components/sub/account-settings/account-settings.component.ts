import { Component, inject, signal } from '@angular/core';
import { Image } from 'primeng/image';
import { ExtendedUserData } from '../../../models/extended-user-data';
import { DividerModule } from 'primeng/divider';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { ResponsiveService } from '../../../../common/services/responsive.service';

@Component({
  selector: 'app-account-settings',
  imports: [Image, DividerModule, AppButtonComponent],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss',
})
export class AccountSettingsComponent {
  public readonly responsiveService = inject(ResponsiveService);

  userData = signal<ExtendedUserData | undefined>({
    name: 'Adam',
    surname: 'Kowalski',
    email: 'adam.kowalski@gmail.com',
    phoneNumber: '+48 685 374 274',
    id: 'awdawdawd-awdawdghs-srhgsdrgd',
    profileImageUrl: 'imgs/default_avatar.jpg',
  });
}
