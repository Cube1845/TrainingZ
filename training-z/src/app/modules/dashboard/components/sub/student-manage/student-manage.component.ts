import { Component, inject, signal } from '@angular/core';
import { UserData } from '../../../models/user-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-manage',
  imports: [],
  templateUrl: './student-manage.component.html',
  styleUrl: './student-manage.component.scss',
})
export class StudentManageComponent {
  private readonly activatedRoute = inject(ActivatedRoute);

  studentId: string = '';

  studentData = signal<UserData | undefined>(undefined);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.studentId = params['id'];
    });
  }
}
