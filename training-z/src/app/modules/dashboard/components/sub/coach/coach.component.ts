import { Component, inject, signal, WritableSignal } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { Image } from 'primeng/image';
import { ExtendedUserData } from '../../../models/extended-user-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coach',
  imports: [Image, DividerModule],
  templateUrl: './coach.component.html',
  styleUrl: './coach.component.scss',
})
export class CoachComponent {
  private readonly router = inject(Router);

  coachData?: WritableSignal<ExtendedUserData>;

  constructor() {
    if (true) {
      this.router.navigateByUrl('dashboard/invitation-code');
      return;
    }

    this.coachData = signal<ExtendedUserData>({
      name: 'Adam',
      surname: 'Kowalski',
      email: 'adam.kowalski@gmail.com',
      phoneNumber: null,
      id: 'awdawdawd-awdawdghs-srhgsdrgd',
      profileImageUrl: 'imgs/default_avatar.jpg',
    });
  }
}
