import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {





  loginForm! : FormGroup;

  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService : AuthService,
    private snackbar: MatSnackBar,
    private router : Router
  ){

  }

  ngOnInit(){
    this.loginForm = this.fb.group({
      email : [null,[Validators.required]],
      password : [null,Validators.required]
    })
  }

  toggleVisibilityPassword(){
    this.hidePassword = !this.hidePassword;
  }


  onSubmit(){
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      (res) =>{
        console.log(res);
        if(res.userId != null){
          const user = {
            id : res.userId,
            role : res.userRole
          }
          StorageService.saveToken(res.jwt);
          StorageService.saveUser(user);
          if(StorageService.isAdminLoggedIn()){
            this.router.navigateByUrl("admin/dashboard");
          }
          else if(StorageService.isEmployeeLoggedIn()){
            this.router.navigateByUrl("employee/dashboard");
          }
          this.snackbar.open("Sign Up was Successfull","Close",
          {duration:5000});
        }
        else{
          this.snackbar.open("Sign Up failed. Try Again", "Close",{duration: 5000, panelClass: 'error-snackbar'});
        }
      })
  }
}
