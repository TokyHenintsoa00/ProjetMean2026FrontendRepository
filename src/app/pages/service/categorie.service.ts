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
 }