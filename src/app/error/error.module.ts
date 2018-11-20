import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error400Component } from './error400/error400.component';
import { Error403Component } from './error403/error403.component';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';

import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

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
      {path:'error',component:Error404Component},
      {path:'400',component:Error400Component},
      ])
  ],
  declarations: [Error400Component, Error403Component, Error404Component, Error500Component]
})
export class ErrorModule { }
