import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class PaiementService {
    private apiUrl = `http://localhost:5000/paiement`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getAll`);
    }

    getAllByContrat(contrat_id: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getAll/byContrat/${contrat_id}`);
    }

    getAllByBoutique(boutique_id: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getAll/byBoutique/${boutique_id}`);
    }

    getById(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getById/${id}`);
    }

    getStats(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/stats`);
    }

    create(data: {
        contrat_id: string;
        boutique_id: string;
        periode: string;
        montant_attendu: number;
        montant_paye?: number;
        date_echeance: string;
        date_paiement?: string;
        mode_paiement?: string;
        statut?: string;
        reference?: string;
        notes?: string;
    }): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/create`, data);
    }

    update(id: string, data: {
        montant_paye?: number;
        date_paiement?: string;
        mode_paiement?: string;
        statut?: string;
        reference?: string;
        notes?: string;
    }): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/update/${id}`, data);
    }

    delete(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
    }
}
