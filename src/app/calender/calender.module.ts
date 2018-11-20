import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponentComponent } from './demo-component/demo-component.component';

import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';

import 'flatpickr/dist/flatpickr.css';
import { UserCalenderComponent } from './user-calender/user-calender.component';
import { AdminComponentComponent } from './admin-component/admin-component.component'; 
import { LoginComponent } from '../users/login/login.component';


@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    ToastrModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModalModule,
    ToastrModule.forRoot(),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    RouterModule.forChild([
      {path:'meetingSchedule/:authToken',component:UserCalenderComponent},
      {path:'adminmeetingSchedule/:userId/:adminName/:adminId',component:DemoComponentComponent},
      {path:'adminlogin/:authToken',component:AdminComponentComponent},
      {path:'login',component:LoginComponent},
      
 
      ])
  ],
  declarations: [DemoComponentComponent, UserCalenderComponent, AdminComponentComponent],
  exports: [DemoComponentComponent,UserCalenderComponent,AdminComponentComponent],
  schemas : [NO_ERRORS_SCHEMA]
})
export class CalenderModule { }
