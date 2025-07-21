import { Component, inject, signal } from '@angular/core';
import { Image } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { UserData } from '../../../models/user-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  imports: [Image, DividerModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  private readonly router = inject(Router);

  students = signal<UserData[]>([
    {
      name: 'Antoni',
      surname: 'Pszczoła',
      profileImageUrl: 'imgs/default_avatar.jpg',
      id: 'awdawdawd-awdawdawd-awdawd-awda',
    },
    {
      name: 'Jan',
      surname: 'Matejko',
      profileImageUrl: 'imgs/default_avatar.jpg',
      id: 'awdawdawd-awdawdawd-awdawd-awdawdawdga',
    },
  ]);

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}
