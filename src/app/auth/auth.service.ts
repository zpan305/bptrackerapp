import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';

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
    user = new Subject<User>();

    constructor(private http: HttpClient) {}

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDM4Z5vh2t2f_IdP4-24e97sIR42ar1Gs',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(tap(resData => {
          this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    logIn(email: string, password: string) {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDM4Z5vh2t2f_IdP4-24e97sIR42ar1Gs',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      ).pipe(tap(resData => {
        this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
    }

    private handleAuth(email: string, userId: string, token: string, expiresIn: number){
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new User(email, userId, token, expirationDate);
      this.user.next(user);
    }
}
