import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';



const BASIC_URL = "http://localhost:8084/api/employee/";


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http_ : HttpClient
  ) { }



  private createAuthorization(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',  'Bearer ' + StorageService.getToken()
    )
  }

  getEmployeeByTaskId():Observable<any>{
    return this.http_.get(BASIC_URL+'tasks',{
      headers: this.createAuthorization()
    });
  }


  updateStatus(id: number, status: string):Observable<any>{
    return this.http_.get(BASIC_URL+`updateTask/${id}/${status}`,{
      headers: this.createAuthorization()
    });
  }
}
