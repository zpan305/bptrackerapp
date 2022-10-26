import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EmailService } from '../shared/email.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patientName: string;
  patientGender: string;
  patientAge: string;
  patientEmail: string;
  patientExist: boolean = true;

  constructor(private emailService: EmailService, private http: HttpClient) {}

  ngOnInit(): void {
    this.patientEmail = this.emailService.patientEmail;
    if(this.patientEmail) {
      localStorage.setItem('email', this.patientEmail);
    } else{
      this.patientEmail = localStorage.getItem('email');
    }
    this.fetchPatientData();
  }

  fetchPatientData() {
    this.http.get('https://high-blood-pressure-tracker-default-rtdb.firebaseio.com/' + this.patientEmail)
    .subscribe({
      next: (v) => {
        console.log(v);
        this.patientExist = true;
      },
      error: (e) => {
        this.patientExist = false;
      },
      complete: () => console.info('complete')
    });
  }
}
