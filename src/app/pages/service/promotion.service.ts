import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PromotionService {
    private apiUrl = 'http://localhost:5000/promotion';

    constructor(private http: HttpClient) {}

    // ── Manager ──────────────────────────────────────────────────────
    createPromotion(body: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/create`, body, { withCredentials: true });
    }

    getMyPromotions(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/my-promotions`, { withCredentials: true });
    }

    updatePromotion(id: string, body: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, body, { withCredentials: true });
    }

    deletePromotion(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
    }

    // ── Public ───────────────────────────────────────────────────────
    getActivePromotions(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/public/active-all`);
    }

    getPromotionsByBoutique(boutiqueId: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/public/by-boutique/${boutiqueId}`);
    }

    getPromotionsForProduct(produitId: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/public/for-product/${produitId}`);
    }
}
