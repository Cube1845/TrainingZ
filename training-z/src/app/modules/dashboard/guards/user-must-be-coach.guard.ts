import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthDataService } from '../../auth/services/auth-data.service';
import { Role } from '../../auth/models/role';

export const userMustBeCoachGuard: CanActivateFn = (route, state) => {
  const authDataService = inject(AuthDataService);
  const router = inject(Router);

  if (authDataService.getUserRole() == Role.Coach) {
    return true;
  }

  router.navigateByUrl('dashboard');
  return false;
};
