import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/sub/home/home.component';
import { StudentsComponent } from './components/sub/students/students.component';
import { userMustBeCoachGuard } from './guards/user-must-be-coach.guard';
import { NotificationsComponent } from './components/sub/notifications/notifications.component';
import { AccountSettingsComponent } from './components/sub/account-settings/account-settings.component';
import { CoachComponent } from './components/sub/coach/coach.component';
import { userMustNotBeCoachGuard } from './guards/user-must-not-be-coach.guard';
import { WorkoutsComponent } from './components/sub/workouts/workouts.component';
import { StudentInviteComponent } from './components/sub/student-invite/student-invite.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'workouts',
        component: WorkoutsComponent,
        canActivate: [userMustNotBeCoachGuard],
      },
      {
        path: 'coach',
        component: CoachComponent,
        canActivate: [userMustNotBeCoachGuard],
      },
      {
        path: 'students',
        component: StudentsComponent,
        canActivate: [userMustBeCoachGuard],
      },
      {
        path: 'student-invite',
        component: StudentInviteComponent,
        canActivate: [userMustBeCoachGuard],
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];
