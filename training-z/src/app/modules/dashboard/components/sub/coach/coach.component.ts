import { Component, signal } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { Image } from 'primeng/image';
import { ExtendedUserData } from '../../../models/extended-user-data';

@Component({
  selector: 'app-coach',
  imports: [Image, DividerModule],
  templateUrl: './coach.component.html',
  styleUrl: './coach.component.scss',
})
export class CoachComponent {
  coachData = signal<ExtendedUserData | undefined | null>({
    name: 'Adam',
    surname: 'Kowalski',
    email: 'adam.kowalski@gmail.com',
    phoneNumber: null,
    id: 'awdawdawd-awdawdghs-srhgsdrgd',
    profileImageUrl: 'imgs/default_avatar.jpg',
  });
}
