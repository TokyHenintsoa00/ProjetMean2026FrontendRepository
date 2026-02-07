import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root',
})

export class StatusService{
    private apiUrl = `http://localhost:5000/status`;

    constructor(private http:HttpClient){};

    getAllStatus(): Observable<any>{
        return this.http.get(`${this.apiUrl}/getAll`);
    }
}