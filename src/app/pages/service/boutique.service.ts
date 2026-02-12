import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn:'root',
})

export class BoutiqueService{

    private apiUrl = `${environment.apiUrl}/boutique`;

    constructor(private http:HttpClient){};
    
    getBoutiques():Observable<any> {
        return this.http.get(`${this.apiUrl}/getAll`); // Correction ici
    }
}