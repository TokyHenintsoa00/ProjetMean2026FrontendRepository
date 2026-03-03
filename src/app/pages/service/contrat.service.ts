import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class ContratService {
    private apiUrl = `${environment.apiUrl}/contrat`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getAll`);
    }

    getAllByBoutique(boutique_id: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getAll/byBoutique/${boutique_id}`);
    }

    getById(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getById/${id}`);
    }

    create(data: {
        boutique_id: string;
        box_id?: string;
        mall_id?: string;
        date_debut: string;
        date_fin: string;
        duree_mois: number;
        loyer: { montant_mensuel: number; devise: string; charges_incluses: boolean; charges_mensuelles: number };
        caution?: number;
        statut?: string;
        renouvellement_auto?: boolean;
    }): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/create`, data);
    }

    update(id: string, data: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/update/${id}`, data);
    }

    updateStatut(id: string, statut: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/updateStatut/${id}`, { statut });
    }

    delete(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
    }
}
