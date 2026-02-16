import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root',
})

export class UserService{
    private apiUrl = `http://localhost:5000/user`;

    constructor(private http:HttpClient){};

    findUserByEmail(credentials: {email: string}): Observable<any> {
        return this.http.post(`${this.apiUrl}/findBy/email`, credentials, {
            withCredentials: true
        });
    }

    updateToDisconnectAccount(credentials:{_id:string}):Observable<any>
    {
        return this.http.put(`${this.apiUrl}/account/desactive`, credentials, {
            withCredentials: true
        });
    }

    updateToConnectAccount(credentials:{_id:string}):Observable<any>
    {
        return this.http.put(`${this.apiUrl}/account/active`, credentials, {
                withCredentials: true
        })
    }

    


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


    resetPassword(credentials:{token:string,email:string,newPassword:string})
    {
        return this.http.post(`${this.apiUrl}/password/resetPassword`,credentials)
    }    

    // Nouvelle méthode qui accepte directement FormData
    // insertion user par admin => pour faire une boutique
signUpByAddAdminFormData(formData: FormData): Observable<any> {
    console.log('Envoi du FormData au backend...');
    
    // Vérifier le contenu (debugging)
    formData.forEach((value, key) => {
        if (value instanceof File) {
            console.log(`${key}: [File] ${value.name} (${value.size} bytes)`);
        } else {
            console.log(`${key}:`, value);
        }
    });
    
    return this.http.post(`${this.apiUrl}/register/managerBoutique/byAdmin`, formData);
}


//demande de boutique par client
signUpByAddClientFormData(formData: FormData): Observable<any> {
    console.log('Envoi du FormData au backend...');
    
    // Vérifier le contenu (debugging)
    formData.forEach((value, key) => {
        if (value instanceof File) {
            console.log(`${key}: [File] ${value.name} (${value.size} bytes)`);
        } else {
            console.log(`${key}:`, value);
        }
    });
    
    return this.http.post(`${this.apiUrl}/register/permission/manager/boutique/byClient`, formData);
}
    
// Gardez l'ancienne méthode si nécessaire ailleurs
// signUpByAddAdmin(user: any): Observable<any> {
//     const format = new FormData();
    
//     format.append('nom_client', user.nom_client);
//     format.append('prenom_client', user.prenom_client);
//     format.append('date_naissance', user.date_naissance.toISOString());
//     format.append('role', user.role);
//     format.append('numero_telephone', user.numero_telephone);
//     format.append('email', user.email);
//     format.append('pwd', user.pwd);
    
//     if (user.avatar && user.avatar.length > 0) {
//         format.append('avatar', user.avatar[0], user.avatar[0].name);
//     }
    
//     format.append('rememberMe', user.rememberMe.toString());
    
//     return this.http.post(`${this.apiUrl}/register/managerBoutique/byAdmin`, format);
// }




//     signUpByAddAdmin(user: any): Observable<any> {
//     const format = new FormData();
    
//     format.append('nom_client', user.nom_client);
//     format.append('prenom_client', user.prenom_client);
//     format.append('date_naissance', user.date_naissance.toISOString()); // ← Convertir la date
//     format.append('role', user.role);
//     format.append('numero_telephone', user.numero_telephone);
//     format.append('email', user.email);
//     format.append('pwd', user.pwd);
    
//     // Ajouter l'avatar si présent
//     if (user.avatar && user.avatar.length > 0) {
//         user.avatar.forEach((file: File) => {
//             format.append('avatar', file, file.name); // ← Ajoutez le nom du fichier
//         });
//     }
    
//     // Ajouter rememberMe
//     format.append('rememberMe', user.rememberMe.toString());
    
//     return this.http.post(`${this.apiUrl}/register/managerBoutique/byAdmin`, format);
// }

    // signUpByAddAdmin(user:any):Observable<any>{

    //     const format = new FormData();
    //     format.append('nom_client', user.nom_client);
    //     format.append('prenom_client', user.prenom_client);
    //     format.append('date_naissance', user.date_naissance);
    //     format.append('role', user.role);
    //     format.append('numero_telephone', user.numero_telephone);
    //     format.append('email', user.email);
    //     format.append('pwd', user.pwd);
    //     // Ajouter l'avatar si présent
    //      user.avatar.forEach((file:File) => {
    //         format.append('avatar',file)
    //     });

    //     // Ajouter rememberMe si présent
    //     if (user.rememberMe !== undefined) {
    //         format.append('rememberMe', user.rememberMe.toString());
    //     }
    //     return this.http.post(`${this.apiUrl}/register/managerBoutique/byAdmin`, format);
    // }


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

    // login client et boutique 
    signIn(credentials: { email: string; pwd: string; rememberMe?: boolean }): Observable<any> {
        return this.http.post(`${this.apiUrl}/login/user`, credentials, {
        withCredentials: true
        });
    }

    //login by admin
    signInAdministrator(credentials:{email: string; pwd: string; rememberMe?: boolean }): Observable<any>{
        return this.http.post(`${this.apiUrl}/administrator/login/user`, credentials, {
        withCredentials: true
        });
    }
}