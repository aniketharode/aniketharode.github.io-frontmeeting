import { NgModule ,NO_ERRORS_SCHEMA } from '@angular/core';

import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    ToastrModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild([
      {path:'sign-up',component:SignupComponent},
      {path:'forget',component:ForgetPasswordComponent},
      {path:'resetPassword/:token',component:ResetPasswordComponent},
      
 
      ])
  ],
  declarations: [LoginComponent, SignupComponent, ForgetPasswordComponent, ResetPasswordComponent]
})
export class UsersModule { }
