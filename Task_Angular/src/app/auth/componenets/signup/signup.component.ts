import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {



  signupForm! : FormGroup;
  hidePassword = true;


  constructor(
    private fb : FormBuilder,
    private auhtService : AuthService,
    private router : Router,
    private snackbar : MatSnackBar,
  ){

  }

  ngOnInit(){
    this.signupForm = this.fb.group({
      name : [null,[Validators.required]],
      email : [null,[Validators.required]],
      password : [null,[Validators.required]],
      confirmPassword : [null,[Validators.required]]
    })
  }


  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
    }





  onSubmit(){
    console.log(this.signupForm.value);
  //   this.auhtService.signup(this.signupForm.value).subscribe(
  //     (res)=>{
  //       this.snackbar.open("Sign Up was successfull", "Close",{
  //         duration:5000
  //       })
  //     },
  //     (error)=>{
  //       this.snackbar.open("Error")
  //     }
  //   )
  // }
  }
}
