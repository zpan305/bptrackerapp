import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

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
    this.http.get('https://high-blood-pressure-tracker-default-rtdb.firebaseio.com/' + this.patientEmail.replace('.', '') + '.json')
    .subscribe(res => {
      if (!res) {
        this.patientExist = false;
      }
      else{
        this.patientExist = true;
        this.patientName = res['Name'];
        this.patientAge = res['Age'];
        this.patientGender = res['Gender'];
      }
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.patientName = form.value.name;
    this.patientGender = form.value.gender;
    this.patientAge = form.value.age;

    this.http.put('https://high-blood-pressure-tracker-default-rtdb.firebaseio.com/' + this.patientEmail.replace('.', '') + '.json', {
      "Name": this.patientName,
      "Gender": this.patientGender,
      "Age": this.patientAge
    }).subscribe(res => {
      this.patientExist = true;
      console.log(res);
    });

    form.reset();
  }
}
