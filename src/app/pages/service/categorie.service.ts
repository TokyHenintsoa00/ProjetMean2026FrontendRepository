import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '@env/environment';

@Injectable({
    providedIn:'root',
})
 export class CategorieService{
      private apiUrl = `${environment.apiUrl}/categorie`;

    constructor(private http:HttpClient){};

    // Categories racines uniquement (pour boutique)
    getAllCategorie(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getAll/boutique`);
    }

    // Arbre hierarchique complet (pour produit)
    getCategorieTree(): Observable<any> {
        return this.http.get(`${this.apiUrl}/tree`);
    }

    // Toutes les catégories avec parent peuplé (admin)
    getAllForAdmin(): Observable<any> {
        return this.http.get(`${this.apiUrl}/admin/all`);
    }

    // Créer une catégorie (admin)
    createCategorie(data: { nom: string; parent?: string | null }): Observable<any> {
        return this.http.post(`${this.apiUrl}/register/categorie`, data);
    }

    // Modifier une catégorie (admin)
    updateCategorie(id: string, data: { nom: string; parent?: string | null }): Observable<any> {
        return this.http.put(`${this.apiUrl}/update/${id}`, data);
    }

    // Supprimer une catégorie (admin)
    deleteCategorie(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete/${id}`);
    }
 }