import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    // private _http: HttpClient
  ) { }


  // signup(signup: any): Observable<any>{
  //   return this._http.post(BASIC_URL + 'signup',signup);
  // }
}
