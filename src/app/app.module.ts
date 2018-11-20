import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';

import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { UsersModule } from './users/users.module';
import { LoginComponent } from './users/login/login.component';
import { ServiceAppService } from './service-app.service';
import { CalenderModule } from './calender/calender.module';
import { DemoComponentComponent } from './calender/demo-component/demo-component.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ErrorModule } from './error/error.module';
import { Error404Component } from './error/error404/error404.component';
import { Error403Component } from './error/error403/error403.component';
import { Error400Component } from './error/error400/error400.component';
import { UserCalenderComponent } from './calender/user-calender/user-calender.component';
import { AdminComponentComponent } from './calender/admin-component/admin-component.component';


//importflatpickr/dist/flatpickr.css';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    UsersModule,
    CalenderModule,
    HttpClientModule,
    ToastrModule,
    RouterModule,
    FormsModule,
    ErrorModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    RouterModule.forRoot([
      {path:'login',component:LoginComponent},
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'*',component:LoginComponent},
      {path:'**',component:Error404Component},
      {path:'meetingSchedule/:authToken',component:UserCalenderComponent},
      {path:'adminmeetingSchedule/:userId/:adminName/:adminId',component:DemoComponentComponent},
      {path:'error',component:Error404Component},
      {path:'400',component:Error400Component},
      {path:'adminlogin/:authToken',component:AdminComponentComponent}
 
    ])
  ],
  schemas : [NO_ERRORS_SCHEMA],
  providers: [HttpClientModule,HttpClient,ServiceAppService],
  exports: [DemoComponentComponent,UserCalenderComponent,AdminComponentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
