import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { ServiceAppService } from '../../service-app.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  private email:any;

  constructor(private toastr: ToastrService,private service:ServiceAppService,private router:Router) { }

  ngOnInit() {
  }

  gotoSignIn():any{
   
    this.router.navigate(['/']);
  }

  forgetPassword = () => {

    if(!this.email){
      this.toastr.warning(`enter the email`);
    }
    else{
      let data = {
        email : this.email
        
      }
      this.service.forgetPasswordfunction(data).subscribe(
        (apiResponse) => {
            if(apiResponse.status == 200){
              this.toastr.success(`succesfully send the email`,'Success!');
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
