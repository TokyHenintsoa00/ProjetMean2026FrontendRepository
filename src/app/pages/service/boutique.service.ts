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

    registerBoutiqueV1(formData: FormData):Observable<any>{
        formData.forEach((value, key) => {
        if (value instanceof File) {
            console.log(`${key}: [File] ${value.name} (${value.size} bytes)`);
        } else {
            console.log(`${key}:`, value);
        }
    });
         return this.http.post(`${this.apiUrl}/register/addBoutique/byAdmin`, formData);
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