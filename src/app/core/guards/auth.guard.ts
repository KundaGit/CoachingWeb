import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// export const authGuard: CanActivateFn = (route, state) => {
//    const auth = inject(AuthService);
//   const router = inject(Router);

//   if (auth.isLoggedIn()) {
//     return true;
//   }

//   router.navigate(['/login']);
//   return false;

// };

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  // ✅ Login ke baad wapas same page pe aaye
  router.navigate(['/login'], { 
    queryParams: { returnUrl: state.url } 
  });
  return false;
};