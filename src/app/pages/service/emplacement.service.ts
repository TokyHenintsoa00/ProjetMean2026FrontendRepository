import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class EmplacementService {
    private apiUrl = `${environment.apiUrl}/emplacement`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getAll`);
    }

    getAllByType(type: 'etage' | 'zone'): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getAll/${type}`);
    }

    getZonesByEtage(etage_id: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/zones/${etage_id}`);
    }

    create(data: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/create`, data);
    }

    update(id: string, data: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/update/${id}`, data);
    }

    delete(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
    }
}
