import { Component, inject, signal } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { Image } from 'primeng/image';
import { UserData } from '../../../../dashboard/models/user-data';
import { environment } from '../../../../../../environments/environment.development';
import { ResponsiveService } from '../../../../common/services/responsive.service';

@Component({
  selector: 'app-student-info-dialog',
  imports: [Image, DividerModule],
  templateUrl: './student-info-dialog.component.html',
  styleUrl: './student-info-dialog.component.scss',
})
export class StudentInfoDialogComponent {
  public readonly responsive = inject(ResponsiveService);

  studentData = signal<UserData | undefined>({
    name: 'Adrian',
    surname: 'Down',
    profileImageUrl: environment.defaultProfileImageUrl,
    id: 'awdawdawd',
  });
}
