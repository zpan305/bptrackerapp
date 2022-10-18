import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) {

    }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDM4Z5vh2t2f_IdP4-24e97sIR42ar1Gs',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        );
    }

    logIn(email: string, password: string) {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDM4Z5vh2t2f_IdP4-24e97sIR42ar1Gs',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      );
    }
}
