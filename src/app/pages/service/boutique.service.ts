import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})

export class BoutiqueService {

    private apiUrl = `${environment.apiUrl}/boutique`;

    constructor(private http: HttpClient) { };

    getBoutiques(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getAll`);
    }

    getAllActiveBoutique(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getAll/status/active`)
    }

    getAllBoutiqueForAdmin(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getAll/content/V1`);
    }

    getAllBoutiquePending(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getAll/status/pending`);
    }

    updateBoutiquePendingToActive(credentials: { _id: string }): Observable<any> {

        return this.http.put(`${this.apiUrl}/update/status/to/active`, credentials);
    }

    updateLocationAndLoyer(credentials: { _id: string, location?: string, loyer?: number, commission?: number }): Observable<any> {
        return this.http.put(`${this.apiUrl}/update/location/and/loyer`, credentials);
    }

    updateBoutiqueActiveToSuspend(credentials: { _id: string }): Observable<any> {
        return this.http.put(`${this.apiUrl}/update/status/to/suspend`, credentials);
    }

    registerBoutiqueByClient(formData: FormData): Observable<any> {
        formData.forEach((value, key) => {
            if (value instanceof File) {
                console.log(`${key}: [File] ${value.name} (${value.size} bytes)`);
            } else {
                console.log(`${key}:`, value);
            }
        });

        return this.http.post(`${this.apiUrl}/register/demandeBoutique/client`, formData);

    }

    registerBoutiqueByAdminV1(formData: FormData): Observable<any> {
        formData.forEach((value, key) => {
            if (value instanceof File) {
                console.log(`${key}: [File] ${value.name} (${value.size} bytes)`);
            } else {
                console.log(`${key}:`, value);
            }
        });
        return this.http.post(`${this.apiUrl}/register/addBoutique/byAdmin`, formData);
    }


    registerBoutiqueByAdmin(credentials: {
        nom_boutique: string,
        manager_id: string,
        description: string,
        logo: File,
        image_boutique: File[],
        id_categorie: string,
        location: string,
        status: null,
        rating: null,
        loyer: number
    }): Observable<any> {
        return this.http.post(`${this.apiUrl}/register/user`, credentials, {
            withCredentials: true
        });
    }

    // ============ GESTION MA BOUTIQUE ============

    getMyBoutique(): Observable<any> {
        return this.http.get(`${this.apiUrl}/my-boutique`, {
            withCredentials: true
        });
    }

    updateBoutiqueInfo(data: { nom_boutique?: string, description_boutique?: string, location?: string, id_categorie?: string }): Observable<any> {
        return this.http.put(`${this.apiUrl}/update/info`, data, {
            withCredentials: true
        });
    }

    updateBoutiqueHoraires(data: { horaires: any[] }): Observable<any> {
        return this.http.put(`${this.apiUrl}/update/horaires`, data, {
            withCredentials: true
        });
    }

    updateBoutiquePhotos(formData: FormData): Observable<any> {
        return this.http.put(`${this.apiUrl}/update/photos`, formData, {
            withCredentials: true
        });
    }

    deleteBoutiquePhoto(photo_id: string): Observable<any> {
        return this.http.put(`${this.apiUrl}/delete/photo`, { photo_id }, {
            withCredentials: true
        });
    }

    getBoutiqueById(id: string) {
        return this.http.get(`${this.apiUrl}/getInfo/byId?id=${id}`);
    }
}