import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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

  }
}
