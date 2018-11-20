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
//const moment = require('moment')
//const socket = io('http://localhost:3000');
import * as io from 'socket.io-client';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-demo-component',
  templateUrl: './demo-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./demo-component.component.scss']
})
export class DemoComponentComponent implements OnInit {

  private authToken;
  private userId;
  firstName;
  lastName;
  email;
  title;
  adminName;
  adminId;

  start11 : String;
  
  //private socket = io('http://localhost:3000');
  
  events: CalendarEvent[] = [    
    
  ];  //------------------critical chnage in calneder events

 

 // createData={
    
  //};
  //meetingPlanner();

  ngOnInit(){
    //if(!re)
    //this.start11 = moment().utc("YYYY-MM-DD HH:mm:ss").utcOffset("0530");
    //console.log("name of admin:-"+Cookie.get("admindetails"));
  this.meetingPlanner(this.userId);
console.log("cookies values are:-"+Cookie.get('userId'));
//this.addEvent();
this.gettingPlanner();
//console.log("--------nginit events title---"+this.events[0].title);

  }

  constructor(private modal: NgbModal,private toastr: ToastrService,private service:ServiceAppService,private router:Router,private active : ActivatedRoute) {
    this.userId = this.active.snapshot.paramMap.get('userId');
    this.adminName = this.active.snapshot.paramMap.get('adminName');
    this.adminId = this.active.snapshot.paramMap.get('adminId');
  }


  //socket 




  //end of socket

//getting the planner data from the backend

 
  //gettng the details of jwt data

  meetingPlanner = (userId) => {
    this.service.getSingleUser(userId).subscribe(
      (apiResponse) => {
        if(apiResponse.status == 200){

           console.log("ap response"+apiResponse.data.userId);
           this.lastName=apiResponse.data.lastName;
           this.firstName=apiResponse.data.firstName;
          
           this.email=apiResponse.data.email;
           this.userId=apiResponse.data.userId
  
           console.log("firstname:-"+apiResponse.data.lastName);
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



  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();


  //getting the meeting planner from the data base
  
  gettingPlanner = () => {


    
    this.service.gettingPlannerfunction(this.userId).subscribe(
      (apiResponse) => {
        if(apiResponse.status == 200){
         // console.log("new Data values are:-"+apiResponse.data.newData[0].title);

          this.title = apiResponse.data.newData[0].title;

          for(let i=0;i<apiResponse.data.newData.length;i++){
           
          // console.log("getting the meeting planner:-"+apiResponse.newData[0].title);
           //calender logics end
           
           console.log("---start-----------:-"+parse(apiResponse.data.newData[i].start));
           this.events.push({
             id:apiResponse.data.newData[i].id,
             title : apiResponse.data.newData[i].title,
             purpose:apiResponse.data.newData[i].purpose,
             start: parse(apiResponse.data.newData[i].start),
             end: parse(apiResponse.data.newData[i].end),
              //end:new Date(),
             startTime:apiResponse.data.newData[i].startTime,
             endTime:apiResponse.data.newData[i].endTime,
             
              color: colors.red,
              actions: this.actions,
              
             
           })
           console.log("purpose s :-"+apiResponse.data.newData[i].purpose);

          }
        }
        else{
         // this.toastr.error('Some error occured'+apiResponse.status, 'sorry');
          //this.router.navigate(['/error']);
          this.events.push();
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
    //end
  


    
    
    
  

  activeDayIsOpen: boolean = true;

  
  

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
    console.log("date is :-"+date);
    //this.gettingPlanner();
    /*this.events.push({
      title : 'default',
      start: date,
      end: date,
       //end:new Date(),

       purpose:'purpose is?',
       color: colors.red,
       actions: this.actions,
       allDay: true,
       resizable: {
         beforeStart: true,
         afterEnd: true
       },
       draggable: true
    })*/
    //this.events.push();
  }


  eventTimesChanged({  ///-------------critcal changes
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end =newEnd;
    console.log("start:-"+newStart);
    console.log("end:-"+newEnd);
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      purpose:'Enter the purpose',
      start: startOfDay(new Date().toISOString()),
      end: endOfDay(new Date().toISOString()),
      startTime:'enter the time',
      endTime:'enter the time',
      color: colors.red,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    });
    this.refresh.next();
    console.log("date is:-"+endOfDay(new Date()));
  }

  

  saveEvent(i){
    console.log("event is: "+i);
   // for(let i=0;i<this.events.length;i++){


    
     let createData = {
      id:i,
      title : this.events[i].title,
      purpose : this.events[i].purpose,
      start :  this.events[i].start.toUTCString(),
      end : this.events[i].end.toUTCString(),
      startTime : this.events[i].startTime,
      endTime : this.events[i].endTime,
      userId : this.userId,
      firstName:this.firstName,
      lastName:this.lastName,
      email:this.email,
      adminName:this.adminName,
     
    }
    console.log("purpose part 2 value is:-"+this.events[i].purpose);
    
  
 

  this.service.createMeetingfunction(createData,Cookie.get("adminauthtoken")).subscribe(

    (apiResponse) => {
      if(apiResponse.status == 200){

        //Cookie.set('authtoken',apiResponse.data.authToken);
        //Cookie.set('receiverId',apiResponse.data.userDetails.userId);
        //Cookie.set('details',apiResponse.data.userDetails.firstName+''+apiResponse.data.userDetails.lastName);
         //this.service.setUserInfoLocalStorage(apiResponse.data.userDetails);

         //console.log("ap response"+apiResponse);
       //this.router.navigate(['/meetingSchedule']);
       this.toastr.success('successfully created a meeting','Success');
       console.log("emiting the event from admin compo:-"+apiResponse.data.userId);
      this.service.socketFunction(apiResponse.data.userId);
      }
      else{
        this.toastr.error('Some error occured'+apiResponse.status, 'sorry');
      }
    },

    (error) => {
      console.log("error from the init eror");
      //console.log(error.errorMessage);
      this.toastr.error('Some error occured', 'Oops!');
      }


  )
//}
  }
  //end of save----------------


  //start of deleting data----------


  deleteEvent(i){
    console.log("event is: "+i);
   // for(let i=0;i<this.events.length;i++){


    
     let createData = {
      id:i,
      userId : this.userId,   
    }
    //console.log("detiales:-"+this.events[i].start+" end time"+this.events[i].end);
    
  
 

  this.service.deleteMeetingfunction(createData).subscribe(

    (apiResponse) => {
      if(apiResponse.status == 200){

        
       this.toastr.success('successfully deleted the scheduled meeting','Success');
      
      }
      else{
        this.toastr.error('Some error occured'+apiResponse.status, 'sorry');
      }
    },

    (error) => {
      console.log("error from the init eror");
      //console.log(error.errorMessage);
      this.toastr.error('Some error occured', 'Oops!');
      }


  )
//}
  }



  //end of deleting data-----------

  logoutFunction = () => {
    

    this.service.logout(this.adminId).subscribe(
    
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
