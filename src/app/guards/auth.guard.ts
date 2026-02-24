import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@/pages/service/auth.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.getMe().pipe(
        map((res) => {
            authService.setUser(res);
            return true;
        }),
        catchError(() => {
            router.navigate(['/logIn']);
            return of(false);
        })
    );
};
