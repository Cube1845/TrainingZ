import { CanActivateFn, Router } from '@angular/router';
import { AuthDataService } from '../../auth/services/auth-data.service';
import { inject } from '@angular/core';
import { Role } from '../../auth/models/role';

export const userMustNotBeCoachGuard: CanActivateFn = (route, state) => {
  const authDataService = inject(AuthDataService);
  const router = inject(Router);

  if (authDataService.getUserRole() == Role.User) {
    return true;
  }

  router.navigateByUrl('dashboard');
  return false;
};
