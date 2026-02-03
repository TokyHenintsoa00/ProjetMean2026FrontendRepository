import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root',
})

export class UserService{
    private apiUrl = `http://localhost:5000/user`;

    constructor(private http:HttpClient){};

    // signUp(credentials:{nom:string,prenom:string,dateNaissance:Date,role:string,telephone:string,email:string,pwd:string,avatar:null,rememberMe?:boolean}):Observable<any>
    // {
    //     return this.http.post(`${this.apiUrl}/register/user`, credentials,{
    //         withCredentials: true
    //     });
    // }

    findRoleUserByEmail(credentials:{email:string}):Observable<any>{
        return this.http.post(`${this.apiUrl}/find/role/by/email`,credentials,{
            withCredentials:true
        });
    }

    forgotPassword(credentials:{email:string}):Observable<any>{
        return this.http.post(`${this.apiUrl}/password/forgotPassword`,credentials,{
            withCredentials:true
        });
    }


     signUp(credentials: {
        nom_client: string,
        prenom_client: string,
        date_naissance: string,
        role: string,
        numero_telephone: string,
        email: string,
        pwd: string,
        avatar: null,
        rememberMe?: boolean
    }): Observable<any> {
        return this.http.post(`${this.apiUrl}/register/user`, credentials, {
            withCredentials: true
        });
    }

    // signIn(users:any):Observable<any>
    // {
    //     return this.http.post(`${this.apiUrl}/login/user`,users,);
    // }

    signIn(credentials: { email: string; pwd: string; rememberMe?: boolean }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/user`, credentials, {
      withCredentials: true
    });
  }
}