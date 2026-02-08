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

    registerBoutiqueByAdmin(credentials:{
        nom_boutique:string,
        manager_id:string,
        description:string,
        logo: File,
        image_boutique: File[],
        id_categorie:string,
        location:string,
        status:null,
        rating:null,
        loyer:number
    }):Observable<any>{
        return this.http.post(`${this.apiUrl}/register/user`, credentials, {
            withCredentials: true
        });
    }
    
}