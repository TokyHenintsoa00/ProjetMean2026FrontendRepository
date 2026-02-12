import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Categorie } from "./categorie.interface";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class CategorieService {
    private apiUrl = `${environment.apiUrl}/categorie`;

    constructor(private http: HttpClient) {}

    getAllCategorie(): Observable<Categorie[]> {
        return this.http.get<Categorie[]>(`${this.apiUrl}/getAll`);
    }

    getCategorieById(id: string): Observable<Categorie> {
        return this.http.get<Categorie>(`${this.apiUrl}/get/${id}`);
    }

    getRootCategories(): Observable<Categorie[]> {
        return this.http.get<Categorie[]>(`${this.apiUrl}/getRoots`);
    }

    getTree(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getTree`);
    }

    getChildrenCategories(parentId: string): Observable<Categorie[]> {
        return this.http.get<Categorie[]>(`${this.apiUrl}/getChildren/${parentId}`);
    }

    createCategorie(categorie: Categorie): Observable<any> {
        return this.http.post(`${this.apiUrl}/register/categorie`, categorie);
    }

    updateCategorie(id: string, categorie: Categorie): Observable<any> {
        return this.http.put(`${this.apiUrl}/update/${id}`, categorie);
    }

    deleteCategorie(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete/${id}`);
    }
}
