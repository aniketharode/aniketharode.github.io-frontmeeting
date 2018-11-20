import { Component, OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  getDate,
  isSameDay,
  isSameMonth,
  addHours,
  parse,
  addMinutes,
  subMinutes
} from 'date-fns';

import flatpickr from "flatpickr";
import { Cookie } from 'ng2-cookies/ng2-cookies'
import { ToastrService } from 'ngx-toastr';
import { ServiceAppService } from '../../service-app.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { MockSchemaRegistry } from '@angular/compiler/testing';
//import moment from 'moment';
import * as moment from 'moment';
import shortid from 'shortid';
//import { ModalDirective } from 'angular-bootstrap-md';
// MDB Angular Free
    

//const moment = require('moment')
//import { SidenavModule, WavesModule, AccordionModule } from 'ng-uikit-pro-standard'




@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.scss']
})
export class AdminComponentComponent implements OnInit {
  
  
    

  
private authToken;
userId;
  firstName;
  lastName;
  email;
  title;

  private userDetails = [];

  constructor(private modal: NgbModal,private toastr: ToastrService,private service:ServiceAppService,private router:Router,private active : ActivatedRoute) {
    this.authToken = this.active.snapshot.paramMap.get('authToken');
    
  }

  ngOnInit() {
    this.meetingPlanner(this.authToken);
  this.getAllUsers();
  //this.showAndHideModal();
  
  
  }

  
  


  
  meetingPlanner = (authToken) => {
    this.service.meetingPlannerfunction(authToken).subscribe(
      (apiResponse) => {
        if(apiResponse.status == 200){

           console.log("ap response"+apiResponse.data.userId);
           this.lastName=apiResponse.data.lastName;
           this.firstName=apiResponse.data.firstName;
          
           this.email=apiResponse.data.email;
           this.userId=apiResponse.data.userId
  
           Cookie.set('adminauthtoken',authToken);
              Cookie.set('adminuserId',apiResponse.data.userId);
              Cookie.set('admindetails',apiResponse.data.firstName+''+apiResponse.data.lastName);
               this.service.setUserInfoLocalStorage(apiResponse.data.userDetails);

           console.log("authtoken of admin:-"+Cookie.get("adminauthtoken"));
           console.log("name of admin:-"+Cookie.get("admindetails"));
           //calender logics end

        }
        else{
          this.toastr.error('Some error occured'+apiResponse.status, 'sorry');
          this.router.navigate(['/error']);
        }
      },

      (error) => {
        console.log("error from the init eror");
        //console.log(error.errorMessage);
        this.toastr.error('Some error occured', 'Oops!');
        this.router.navigate(['/error']);
        }


    )

  }


  //side nav bar logic

    
  public openNav(){
    document.getElementById("mySidenav").style.width = "350px";
    //this.showdropdown=false;
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    //this.showdropdown=false;
}
  
getAllUsers = () =>  {
this.service.getAllUser().subscribe(

(apiResponse) => {

  if(apiResponse.status==200){
        for(let i=0;i<apiResponse.data.length;i++) {
          this.userDetails[i] = apiResponse.data[i];
          console.log("userdetails is :----"+apiResponse.data[i].firstName);
        }
  }
  else{
    this.toastr.error('Some error occured while fetching users'+apiResponse.status, 'sorry');
    this.router.navigate(['/error']);
  }
},

(error) => {
  console.log("error from the init eror");
  //console.log(error.errorMessage);
  this.toastr.error('Some error occured', 'Oops!');
  this.router.navigate(['/error']);
  }


)
}


logoutFunction = () => {
    

  this.service.logout(this.userId).subscribe(
  
  (apiResponse) => {
    if(apiResponse.status == 200){
  
          
      this.toastr.success('Logout successfully', 'Success!');
  
         setTimeout(() =>{
               this.router.navigate(['/login']);
               
         },1000)
     
     }
     else{
       this.toastr.error('Some error occured'+apiResponse.status, 'sorry');
     }
  },
  
  (error) => {
    this.toastr.error('Some error occured', 'Oops!');
  
  }
  
  
  )
  
      console.log("user id of :-");
    }
  


}
