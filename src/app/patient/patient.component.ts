import { Component, OnInit } from '@angular/core';

import { EmailService } from '../shared/email.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patientEmail: string;

  constructor(private emailService: EmailService) { }

  ngOnInit(): void {
    this.patientEmail = this.emailService.patientEmail;
  }
}
