// // guards/auth.guard.ts
// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { map, catchError, of } from 'rxjs';

// export const authGuard: CanActivateFn = () => {
//     const http = inject(HttpClient);
//     const router = inject(Router);

//     return http.get(`${environment.apiUrl}/verifyToken/verify`, { withCredentials: true }).pipe(
//         map(() => true),
//         catchError(() => {
//             router.navigate(['/logIn']);
//             return of(false);
//         })
//     );
// };



// export const clientGuard: CanActivateFn = () => {
//     const http = inject(HttpClient);
//     const router = inject(Router);
//     return http.get(`${environment.apiUrl}/verifyToken/verify/client`, { withCredentials: true }).pipe(
//         map(() => true),
//         catchError(() => {
//             router.navigate(['/logIn']);
//             return of(false);
//         })
//     );
// };

// export const managerGuard: CanActivateFn = () => {
//     const http = inject(HttpClient);
//     const router = inject(Router);
//     return http.get(`${environment.apiUrl}/verifyToken/verify/manager`, { withCredentials: true }).pipe(
//         map(() => true),
//         catchError(() => {
//             router.navigate(['/logIn']);
//             return of(false);
//         })
//     );
// };


// guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';
import { environment } from '@env/environment';

export const authGuard: CanActivateFn = () => {
    const http = inject(HttpClient);
    const router = inject(Router);
    return http.get(`${environment.apiUrl}/verifyToken/verify`, { withCredentials: true }).pipe(
        map(() => true),
        catchError(() => {
            router.navigate(['/logIn']);
            return of(false);
        })
    );
};

export const clientGuard: CanActivateFn = () => {
    const http = inject(HttpClient);
    const router = inject(Router);
    return http.get(`${environment.apiUrl}/verifyToken/verify/client`, { withCredentials: true }).pipe(
        map(() => true),
        catchError(() => {
            router.navigate(['/logIn']);
            return of(false);
        })
    );
};

export const managerGuard: CanActivateFn = () => {
    const http = inject(HttpClient);
    const router = inject(Router);
    return http.get(`${environment.apiUrl}/verifyToken/verify/manager`, { withCredentials: true }).pipe(
        map(() => true),
        catchError(() => {
            router.navigate(['/logIn']);
            return of(false);
        })
    );
};