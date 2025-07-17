import { Component, inject, signal } from '@angular/core';
import { StudentData } from '../../../models/student-data';
import { Image } from 'primeng/image';
import { ProfileImageService } from '../../../services/profile-image.service';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-students',
  imports: [Image, DividerModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  students = signal<StudentData[]>([
    {
      name: 'Antoni',
      surname: 'Pszczoła',
      profileImageUrl: 'imgs/default_avatar.jpg',
    },
    {
      name: 'Jan',
      surname: 'Matejko',
      profileImageUrl: 'imgs/default_avatar.jpg',
    },
  ]);
}
