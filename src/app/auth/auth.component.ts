import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
      // ...
    } else {
      this.authService.signUp(email, password).subscribe({
        next: (v) => {
          console.log(v);
          this.isLoading = false;
        },
        error: (e) => {
          console.error(e);
          this.error = 'An error occurred!';
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
