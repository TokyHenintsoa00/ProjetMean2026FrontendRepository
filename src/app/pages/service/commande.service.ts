import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommandeService {
    private apiUrl = 'http://localhost:5000/commande';

    constructor(private http: HttpClient) {}

    createCommande(body: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/create`, body, { withCredentials: true });
    }

    getMyOrders(): Observable<any> {
        return this.http.get(`${this.apiUrl}/my-orders`, { withCredentials: true });
    }

    getBoutiqueOrders(): Observable<any> {
        return this.http.get(`${this.apiUrl}/boutique-orders`, { withCredentials: true });
    }

    updateOrderStatus(id: string, statut: string): Observable<any> {
        return this.http.put(`${this.apiUrl}/update-status/${id}`, { statut }, { withCredentials: true });
    }

    getAllOrders(): Observable<any> {
        return this.http.get(`${this.apiUrl}/all`, { withCredentials: true });
    }

    getStats(): Observable<any> {
        return this.http.get(`${this.apiUrl}/stats`, { withCredentials: true });
    }

    getById(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true });
    }

    cancelOrder(id: string): Observable<any> {
        return this.http.put(`${this.apiUrl}/cancel/${id}`, {}, { withCredentials: true });
    }
}
