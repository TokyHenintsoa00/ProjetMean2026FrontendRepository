import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root',
})
 export class CategorieService{
      private apiUrl = `http://localhost:5000/categorie`;

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