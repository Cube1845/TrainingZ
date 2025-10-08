import { Component, inject, signal } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { Image } from 'primeng/image';
import { UserData } from '../../../../dashboard/models/user-data';
import { environment } from '../../../../../../environments/environment.development';
import { ResponsiveService } from '../../../../common/services/responsive.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { QuestionKeys, UserInfo } from '../../../../dashboard/models/user-info';
import { UserInfoQuestions } from '../../../../dashboard/models/user-info-questions';

@Component({
  selector: 'app-student-info-dialog',
  imports: [Image, DividerModule],
  templateUrl: './student-info-dialog.component.html',
  styleUrl: './student-info-dialog.component.scss',
})
export class StudentInfoDialogComponent {
  public readonly responsive = inject(ResponsiveService);

  private readonly config = inject(DynamicDialogConfig);

  studentData = signal<UserData | undefined>({
    name: 'Adrian',
    surname: 'Down',
    profileImageUrl: environment.defaultProfileImageUrl,
    id: 'awdawdawd',
  });

  userInfo = signal<UserInfo | undefined>({
    goals: 'awdawawd awdawdafg awf a awfd awf a',
    sleepDiet: 'wfa wf ah ergdftg dsrth drfthj rt',
    activity: 'hsetr hsrth setrg srg aserg se',
    injuries: 'rg serg serg syjrtyjaer tyh',
    timeAvaiable: 'srthj srtj dtuk dyjdstt jsrtjh ',
    other: 'sryt jsrfyj srtyj tyk ',
  });

  questions = UserInfoQuestions;
  questionKeys = QuestionKeys;
}
