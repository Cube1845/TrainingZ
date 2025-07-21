import { Component, signal } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { Image } from 'primeng/image';
import { ExtendedUserData } from '../../../models/extended-user-data';
import { AppInputComponent } from '../../../../common/components/app-input/app-input.component';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';

@Component({
  selector: 'app-coach',
  imports: [Image, DividerModule, AppInputComponent, AppButtonComponent],
  templateUrl: './coach.component.html',
  styleUrl: './coach.component.scss',
})
export class CoachComponent {
  coachData = signal<ExtendedUserData | null | undefined>({
    name: 'Adam',
    surname: 'Kowalski',
    email: 'adam.kowalski@gmail.com',
    phoneNumber: null,
    id: 'awdawdawd-awdawdghs-srhgsdrgd',
    profileImageUrl: 'imgs/default_avatar.jpg',
  });
}
