import { Routes } from '@angular/router';
import { userMustNotBeLoggedInGuard } from './modules/auth/guards/user-must-not-be-logged-in.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [userMustNotBeLoggedInGuard],
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((x) => x.routes),
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
