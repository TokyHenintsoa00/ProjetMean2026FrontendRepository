import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private apiUrl = `${environment.apiUrl}/user`;
    private currentUserSubject = new BehaviorSubject<any>(null);
    currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) {}

    getMe(): Observable<any> {
        return this.http.get(`${this.apiUrl}/me`, { withCredentials: true });
    }

    setUser(data: any) {
        this.currentUserSubject.next(data);
    }

    getCurrentUser() {
        return this.currentUserSubject.value;
    }

    logout(): void {
        this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe({
            next: () => {
                this.currentUserSubject.next(null);
                this.router.navigate(['/logIn']);
            },
            error: () => {
                this.currentUserSubject.next(null);
                this.router.navigate(['/logIn']);
            }
        });
    }
}
