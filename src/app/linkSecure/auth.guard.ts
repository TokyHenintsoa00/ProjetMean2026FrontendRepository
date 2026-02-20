// // guards/auth.guard.ts
// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { map, catchError, of } from 'rxjs';

// export const authGuard: CanActivateFn = () => {
//     const http = inject(HttpClient);
//     const router = inject(Router);

//     return http.get('http://localhost:5000/verifyToken/verify', { withCredentials: true }).pipe(
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
//     return http.get('http://localhost:5000/verifyToken/verify/client', { withCredentials: true }).pipe(
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
//     return http.get('http://localhost:5000/verifyToken/verify/manager', { withCredentials: true }).pipe(
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

export const authGuard: CanActivateFn = () => {
    const http = inject(HttpClient);
    const router = inject(Router);
    return http.get('http://localhost:5000/verifyToken/verify', { withCredentials: true }).pipe(
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
    return http.get('http://localhost:5000/verifyToken/verify/client', { withCredentials: true }).pipe(
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
    return http.get('http://localhost:5000/verifyToken/verify/manager', { withCredentials: true }).pipe(
        map(() => true),
        catchError(() => {
            router.navigate(['/logIn']);
            return of(false);
        })
    );
};