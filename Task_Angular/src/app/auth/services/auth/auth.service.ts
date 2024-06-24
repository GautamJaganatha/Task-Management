import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { StorageService } from '../storage/storage.service';

const BASIC_URL = "http://localhost:8084/api/auth/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http_ : HttpClient,
    private userStorage: StorageService,
  ) { }


  signUp(signup: any): Observable<any>{
    return this.http_.post(BASIC_URL + 'Signup', signup).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle errors here, e.g., log error message or throw a custom error
        console.error('An error occurred:', error.message);
        return throwError('Registration failed. Please try again later.');
  }));
  }


  login(loginForm : any): Observable<any>{
    return this.http_.post(BASIC_URL + 'Login', loginForm);
  }


 
}
