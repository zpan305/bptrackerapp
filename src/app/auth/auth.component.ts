import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { throwError } from 'rxjs';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if(this.isLoginMode) {
      this.authService.logIn(email, password).subscribe({
        next: (v) => {
          console.log(v);
          this.isLoading = false;
        },
        error: (e) => {
          this.error = 'An unknown error occurred!';
          console.error(e);
          if(!e.error || !e.error.error) {
            return throwError(() => new Error(this.error));
          }
          switch (e.error.error.message) {
            case 'EMAIL_NOT_FOUND':
              this.error = 'There is no user record corresponding to this identifier. The user may have been deleted.';
            case 'INVALID_PASSWORD':
              this.error = 'The password is invalid or the user does not have a password.'
            case 'USER_DISABLED':
              this.error = 'The user account has been disabled by an administrator.';
          }
          throwError(() => new Error(this.error));
          this.isLoading = false;
        },
        complete: () => console.info('complete')
      });
    } else {
      this.authService.signUp(email, password).subscribe({
        next: (v) => {
          console.log(v);
          this.isLoading = false;
        },
        error: (e) => {
          this.error = 'An unknown error occurred!';
          console.error(e);
          if(!e.error || !e.error.error) {
            return throwError(() => new Error(this.error));
          }
          switch (e.error.error.message) {
            case 'EMAIL_EXISTS':
              this.error = 'The email address is already in use by another account.';
            case 'OPERATION_NOT_ALLOWED':
              this.error = 'Password sign-in is disabled for this project.';
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              this.error = 'We have blocked all requests from this device due to unusual activity. Try again later.';
          }
          throwError(() => new Error(this.error));
          this.isLoading = false;
        },
        complete: () => console.info('complete')
      });
    }

    form.reset();
  }

  ngOnInit(): void {
  }

}
