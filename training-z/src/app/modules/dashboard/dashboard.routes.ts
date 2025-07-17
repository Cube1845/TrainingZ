import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/sub/home/home.component';
import { StudentsComponent } from './components/sub/students/students.component';
import { userMustBeCoachGuard } from './guards/user-must-be-coach.guard';
import { NotificationsComponent } from './components/sub/notifications/notifications.component';

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
        path: 'students',
        component: StudentsComponent,
        canActivate: [userMustBeCoachGuard],
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];
