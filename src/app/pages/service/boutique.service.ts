import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root',
})

export class BoutiqueService{

    private apiUrl = `http://localhost:5000/boutique`;

    constructor(private http:HttpClient){};
    
    getBoutiques():Observable<any> {
        return this.http.get(`${this.apiUrl}/getAll`); // Correction ici
    }
}