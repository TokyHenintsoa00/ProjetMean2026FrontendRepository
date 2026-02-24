import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ProduitService {

    private apiUrl = `http://localhost:5000/produit`;

    constructor(private http: HttpClient) {}

    // --- Modele produit ---

    getMyProducts(): Observable<any> {
        return this.http.get(`${this.apiUrl}/my-products`, { withCredentials: true });
    }

    getProductById(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/get/${id}`, { withCredentials: true });
    }

    createProduct(formData: FormData): Observable<any> {
        return this.http.post(`${this.apiUrl}/create`, formData, { withCredentials: true });
    }

    updateProduct(id: string, formData: FormData): Observable<any> {
        return this.http.put(`${this.apiUrl}/update/${id}`, formData, { withCredentials: true });
    }

    deleteProduct(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete/${id}`, { withCredentials: true });
    }

    deleteProductImage(produitId: string, imageId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete-image/${produitId}`, {
            body: { image_id: imageId },
            withCredentials: true
        });
    }

    // --- Variantes ---

    addVariante(produitId: string, body: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/variante/add/${produitId}`, body, { withCredentials: true });
    }

    updateVariante(produitId: string, varianteId: string, body: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/variante/update/${produitId}/${varianteId}`, body, { withCredentials: true });
    }

    deleteVariante(produitId: string, varianteId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/variante/delete/${produitId}/${varianteId}`, { withCredentials: true });
    }

    // --- Prix ---

    setPrix(produitId: string, varianteId: string, body: { prix_hors_taxe: number, prix_ttc?: number, devise?: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/prix/set/${produitId}/${varianteId}`, body, { withCredentials: true });
    }

    getPrixHistory(produitId: string, varianteId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/prix/history/${produitId}/${varianteId}`, { withCredentials: true });
    }

    // --- Public (pas d'auth) ---

    getPublicProducts(params?: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/all`, { params });
    }

    getPublicProductById(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/${id}`);
    }

    getProductsByBoutique(boutiqueId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/by-boutique/${boutiqueId}`);
    }

    // --- Stock ---

    updateStock(produitId: string, varianteId: string, stock: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/stock/update/${produitId}/${varianteId}`, { stock }, { withCredentials: true });
    }
}
