import { Component, signal } from '@angular/core';
import { Image } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { UserData } from '../../../models/user-data';

@Component({
  selector: 'app-students',
  imports: [Image, DividerModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
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
}
