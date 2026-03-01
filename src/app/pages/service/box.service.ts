import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class BoxService {
    private apiUrl = `${environment.apiUrl}/box`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getAll`);
    }

    getById(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getById/${id}`);
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

    getAllWithBoutique(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getAll/withBoutique`);
    }

    attribuer(id: string, boutique_id: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/attribuer/${id}`, { boutique_id });
    }

    liberer(id: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/liberer/${id}`, {});
    }
}
