import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable }             from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardAminService {

    private readonly base = 'http://localhost:5000/dashboard/admin'; // adapte l'URL si besoin

    constructor(private http: HttpClient) {}

    /* ── Helper : construit les HttpParams avec roleId si fourni ── */
    private params(roleId: string | null): HttpParams {
        return roleId
            ? new HttpParams().set('roleId', roleId)
            : new HttpParams();
    }

    /* ── Total ── */
    getTotal(roleId: string | null = null): Observable<{ success: boolean; total: number }> {
        return this.http.get<{ success: boolean; total: number }>(
            `${this.base}`,
            { params: this.params(roleId) },
        );
    }

    /* ── Par mois ── */
    getUsersByMonth(roleId: string | null = null): Observable<{ success: boolean; data: any[] }> {
        return this.http.get<{ success: boolean; data: any[] }>(
            `${this.base}/sum/AllUser/byMonth`,
            { params: this.params(roleId) },
        );
    }

    /* ── Par année ── */
    getUsersByYear(roleId: string | null = null): Observable<{ success: boolean; data: any[] }> {
        return this.http.get<{ success: boolean; data: any[] }>(
            `${this.base}/sum/AllUser/byYear`,
            { params: this.params(roleId) },
        );
    }
}