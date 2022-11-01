import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './appRouting.module';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { PatientComponent } from './patient/patient.component';

import { EmailService } from './shared/email.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SpinnerComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule 
  ],
  providers: [EmailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
