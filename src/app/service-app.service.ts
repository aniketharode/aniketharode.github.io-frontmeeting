import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ServiceAppService {

  private baseurl='http://api.webcloud360.com';

  private socket = io('http://api.webcloud360.com');

  constructor(private http:HttpClient,private toastr: ToastrService) { }


socketFunction = (userId) => {
  this.socket.emit("calender-event",userId);
  this.toastr.success('Meeting is send to online users ','Success');
}

socketListening = (userId) => {
  this.socket.on(userId,(data)=>{
      console.log(data);
  this.toastr.success(data);
  });
}


  signupfunction(data):Observable<any>{
    const param = new HttpParams()
    .set("firstName",data.firstName)
    .set("lastName",data.lastName)
    .set("email",data.email)
    .set("mobileNumber",data.mobileNumber)
    .set("password",data.password)
    //.set("apiKey",data.apiKey);
    console.log("values : "+param);
   // return this.http.post('http://localhost:3000/api/v1/users/signup',param);
    return this.http.post('http://api.webcloud360.com/api/v1/users/signup',param);
  }

  signinfunction(data):Observable<any>{
    const param = new HttpParams()
    .set("email",data.email)
    .set("password",data.password)
    console.log("values : "+param);
    return this.http.post('http://api.webcloud360.com/api/v1/users/login',param);
  }

  forgetPasswordfunction(data):Observable<any>{
    const param = new HttpParams()
    .set("email",data.email)
    console.log("values : "+param);
    return this.http.post('http://api.webcloud360.com/api/v1/users/forget',param);
  }

  resetPasswordfunction(data,token):Observable<any>{
    const param = new HttpParams()
    .set("password",data.password)
    .set("confirm",data.confirm)
    console.log("values : "+param);
    return this.http.post('http://api.webcloud360.com/api/v1/users/reset/'+token,param);
  }

  meetingPlannerfunction(authToken):Observable<any>{
    console.log("values : "+authToken);
    return this.http.get('http://api.webcloud360.com/api/v1/users/meetingPlanner?authToken='+authToken);
  }

  createMeetingfunction(data,authToken):Observable<any>{
    const param = new HttpParams()
    .set("id",data.id)
    .set("firstName",data.firstName)
    .set("lastName",data.lastName)
    .set("email",data.email)
    .set("userId",data.userId)
    .set("title",data.title)
    .set("purpose",data.purpose)
    .set("start",data.start)
    .set("end",data.end)
    .set("startTime",data.startTime)
    .set("endTime",data.endTime)
    .set("adminName",data.adminName)
    console.log("from service:- "+param.get("firstName"));
    return this.http.post('http://api.webcloud360.com/api/v1/users/createMeeting?authToken='+authToken,param);
  }

  deleteMeetingfunction(data):Observable<any>{
    const param = new HttpParams()
    .set("id",data.id)
    .set("userId",data.userId)
   
    return this.http.post('http://api.webcloud360.com/api/v1/users/deleteMeeting',param);
  }

  gettingPlannerfunction(userId):Observable<any>{
    console.log("userId from services : "+userId);
    return this.http.get('http://api.webcloud360.com/api/v1/users/findMeeting/'+userId);
  }

  getSingleUser(userId):Observable<any>{
    //console.log("userId from services : "+userId);
    return this.http.get('http://api.webcloud360.com/api/v1/users/getUser/'+userId);
  }


  getAllUser():Observable<any>{
    //console.log("userId from services : "+userId);
    return this.http.get('http://api.webcloud360.com/api/v1/users/view/all/');
  }

  findAllMeeting(id):Observable<any>{
    //console.log("userId from services : "+userId);
   
    return this.http.get('http://api.webcloud360.com/api/v1/users/stopSnoozing/'+id);
  }

  logout(userId):Observable<any>{
    //console.log("userId from services : "+userId);
   console.log("logout:---"+userId);
    return this.http.get('http://api.webcloud360.com/api/v1/users/logout/'+userId);
  }


  getUserInfoLocalStorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
    }
    
    setUserInfoLocalStorage = (data) => {
      localStorage.setItem('userInfo',JSON.stringify(data));
      }

}
