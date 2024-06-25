import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASIC_URL = "http://localhost:8084/api/admin/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http_ :HttpClient
  ) { }

  getUsers():Observable<any>{
    return this.http_.get(BASIC_URL + 'getUsers',
    {headers: this.createAuthorization()})
  }

  private createAuthorization(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',  'Bearer ' + StorageService.getToken()
    )
  }

  postTask(TaskDto: any):Observable<any>{
    return this.http_.post(BASIC_URL+ 'addTask',TaskDto,
    {headers: this.createAuthorization()}
    )
  }
}
