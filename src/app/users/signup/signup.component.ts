import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { ServiceAppService } from '../../service-app.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  private firstName:any;
  private lastName:any;
  private mobile:any;
  private email:any;
  private password:any;
  private apiKey:any;


  constructor(private toastr: ToastrService,private service:ServiceAppService,private router:Router) { }

  ngOnInit() {
  }

  gotoSignIn():any{
    let mobile = Number("91"+this.mobile);
    console.log("type of "+typeof(mobile)+"is "+mobile);
    this.router.navigate(['/']);
  }


  signupFunction(){
 
    if(!this.firstName){
      this.toastr.warning(`enter the first name`);
    }
    else if(!this.lastName){
      this.toastr.warning(`enter the lastName`);
    }
    else if(!this.mobile){
      this.toastr.warning(`enter the mobile`);
    }
    else if(!this.email){
      this.toastr.warning(`enter the email`);
    }
    else if(!this.password){
      this.toastr.warning(`enter the password`);
    }

    else{
      let data = {
        firstName : this.firstName,
        lastName : this.lastName,
        mobileNumber : Number("91"+this.mobile),
        email : this.email,
        password : this.password,
        
      }
      this.service.signupfunction(data).subscribe(
       (apiResponse) => {
           if(apiResponse.status == 200){
             this.toastr.success(`succesfully sign up`,'Success!');
             setTimeout(() =>{
              this.gotoSignIn();
        },1000)
           }
           else {
            console.log("data is"+data);
            //console.log(error.errorMessage);
            this.toastr.error('Some error occured'+apiResponse.message, 'sorry');
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
