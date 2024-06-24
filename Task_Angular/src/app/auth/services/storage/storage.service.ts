import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';



const TOKEN = "token";

const USER = "user";


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveToken(token: string): any{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);

  }

  static saveUser(user: any):any{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user))
  }

  static getToken():any{
    return localStorage.getItem(TOKEN);
  }


  static getUser():any{
    return JSON.parse(localStorage.getItem(USER));
  }


  static getUserRole(): any{
    const user = this.getUser();
    if(user==null){
      return "";
    } 
    return user.role;
  }

  static isAdminLoggedIn(): boolean{
    if(this.getToken() == null){
      return false;
    }
    const role : any = this.getUserRole();
    return role == "ADMIN";
  }


  static isEmployeeLoggedIn(): boolean{
    if(this.getToken() == null){
      return false;
    }
    const role : any = this.getUserRole();
    return role == "EMPLOYEE";
  }


  static getUserID(): any{
    const user = this.getUser();
    if(user==null){
      return "";
    } 
    return user.id;
  }

  static logout(): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
