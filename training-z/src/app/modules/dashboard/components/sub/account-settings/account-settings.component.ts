import { Component, signal } from '@angular/core';
import { Image } from 'primeng/image';
import { ExtendedUserData } from '../../../models/extended-user-data';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-account-settings',
  imports: [Image, DividerModule],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss',
})
export class AccountSettingsComponent {
  userData = signal<ExtendedUserData | undefined>({
    name: 'Adam',
    surname: 'Kowalski',
    email: 'adam.kowalski@gmail.com',
    phoneNumber: '685374274',
    id: 'awdawdawd-awdawdghs-srhgsdrgd',
    profileImageUrl: 'imgs/default_avatar.jpg',
  });
}
