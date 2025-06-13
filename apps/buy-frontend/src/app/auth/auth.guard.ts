import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const token = await auth.getToken();
  if (!token) {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
