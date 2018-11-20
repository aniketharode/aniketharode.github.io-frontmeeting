import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceAppService } from '../../service-app.service';
import { ActivatedRoute,Router, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  
 private password: any;
 private confirm:any;
 private token:any;
  
 constructor(private toastr: ToastrService,private service:ServiceAppService,private router:Router,private active:ActivatedRoute) { }
    

  ngOnInit() {
   this.token = this.active.snapshot.paramMap.get('token');
  }

  gotoSignIn():any{
   
    this.router.navigate(['/']);
  }
  
  resetPassword = () => {

    if(!this.password){
      this.toastr.warning(`enter the password`);
    }
    else if(!this.confirm){
      this.toastr.warning(`enter the confirm password`);
    }
    else if(!(this.password===this.confirm)){
      this.toastr.warning(`password and  confirm password do not match`);
    }

    else{
      let data = {
        password : this.password,
        confirm : this.confirm
      }
      this.service.resetPasswordfunction(data,this.token).subscribe(
        (apiResponse) => {
            if(apiResponse.status == 200){
              this.toastr.success(`succesfully reset the password`,'Success!');
              setTimeout(() =>{
               this.gotoSignIn();
         },1000)
            }
            else {
             console.log("data is"+data);
             //console.log(error.errorMessage);
             this.toastr.error('Some error occured'+apiResponse.status, 'sorry');
             }
      
        },
        (error) => {
         console.log("error from the init eror");
         //console.log(error.errorMessage);
         this.toastr.error('Some error occured', 'Oops!');
         }
  
 
 
 
 
 
       )
    }
  }

}
