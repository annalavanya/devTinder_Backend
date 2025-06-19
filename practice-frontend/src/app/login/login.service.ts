import { Injectable, signal } from "@angular/core";
import { signUpData } from "./login.model";

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    userData = signal<signUpData[]>([]);

    addUserData(data: signUpData) {
        const signup = {...data};
        this.userData.update((oldData)=> [...oldData, signup]);
        console.log(this.userData());
    }
}