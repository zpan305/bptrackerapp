import { Injectable } from '@angular/core';

@Injectable()
export class EmailService {
  private email: string;

  constructor() { }

  get patientEmail(): string {
    return this.email;
  }

  set patientEmail(pEmail: string) {
    this.email = pEmail;
  }
}