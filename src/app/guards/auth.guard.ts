import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@/pages/service/auth.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const CLIENT_ROLE  = '697b0d46b784b5da2ab3ba24';
const BOUTIQUE_ROLE = '697b0d19b784b5da2ab3ba22';
const ADMIN_ROLE   = '697b0d56b784b5da2ab3ba26';

function getRoleId(res: any): string {
    // getMe() returns { user: {..., role: "id"}, roleName: "...", ... }
    const u = res?.user || res;
    return u?.role?._id || u?.role || '';
}

function getHomeForRole(roleId: string): string {
    if (roleId === CLIENT_ROLE)   return '/client';
    if (roleId === BOUTIQUE_ROLE) return '/boutique/home';
    if (roleId === ADMIN_ROLE)    return '/admin/home';
    return '/logIn';
}

// Guard for public pages (/, /logIn, /signUp):
// if already authenticated → redirect to role home; otherwise allow access
export const publicGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.getMe().pipe(
        map((res) => {
            authService.setUser(res);
            const roleId = getRoleId(res);
            const home = getHomeForRole(roleId);
            if (home !== '/logIn') {
                router.navigate([home]);
                return false;
            }
            return true;
        }),
        catchError(() => of(true)) // not authenticated → show the public page
    );
};

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

export const clientGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.getMe().pipe(
        map((res) => {
            authService.setUser(res);
            const roleId = getRoleId(res);
            if (roleId === CLIENT_ROLE) return true;
            router.navigate([getHomeForRole(roleId)]);
            return false;
        }),
        catchError(() => {
            router.navigate(['/logIn']);
            return of(false);
        })
    );
};

export const boutiqueGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.getMe().pipe(
        map((res) => {
            authService.setUser(res);
            const roleId = getRoleId(res);
            if (roleId === BOUTIQUE_ROLE) return true;
            router.navigate([getHomeForRole(roleId)]);
            return false;
        }),
        catchError(() => {
            router.navigate(['/logIn']);
            return of(false);
        })
    );
};

export const adminGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.getMe().pipe(
        map((res) => {
            authService.setUser(res);
            const roleId = getRoleId(res);
            if (roleId === ADMIN_ROLE) return true;
            router.navigate([getHomeForRole(roleId)]);
            return false;
        }),
        catchError(() => {
            router.navigate(['/logIn']);
            return of(false);
        })
    );
};
