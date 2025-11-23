import { Routes } from '@angular/router';
import { userMustNotBeLoggedInGuard } from './modules/auth/guards/user-must-not-be-logged-in.guard';
import { userMustBeLoggedInGuard } from './modules/auth/guards/user-must-be-logged-in.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [userMustNotBeLoggedInGuard],
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((x) => x.routes),
  },
  {
    path: 'dashboard',
    canActivate: [userMustBeLoggedInGuard],
    loadChildren: () =>
      import('./modules/dashboard/dashboard.routes').then((x) => x.routes),
  },
  {
    path: 'workout-planner',
    canActivate: [userMustBeLoggedInGuard],
    loadChildren: () =>
      import('./modules/workout-planner/workout-planner.routes').then(
        (x) => x.routes
      ),
  },
  {
    path: 'workout-dashboard',
    canActivate: [userMustBeLoggedInGuard],
    loadChildren: () =>
      import('./modules/workout-dashboard/workout-dashboard.routes').then(
        (x) => x.routes
      ),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
