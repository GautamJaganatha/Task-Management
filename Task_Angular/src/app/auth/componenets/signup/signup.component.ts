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


  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    }





  onSubmit(){
    const pass = this.signupForm.get('password')?.value;
    const confirmPass = this.signupForm.get('confirmPassword')?.value;
    if(pass !== confirmPass){
      this.snackbar.open("Password did not match", "Try Again, Close",{ duration:5000});
    }
    console.log(this.signupForm.value);
    this.auhtService.signUp(this.signupForm.value).subscribe(
      (res) =>{
        console.log(res);
        if(res.id != null){
          this.snackbar.open("Sign Up was Successfull","Close",
          {duration:5000});
          this.router.navigateByUrl("/login");
        }
        else{
          this.snackbar.open("Sign Up failed. Try Again", "Close",{duration: 5000, panelClass: 'error-snackbar'});
        }
      })
  }
}
