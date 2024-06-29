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

  getTaskById(id: number){
    return this.http_.get(BASIC_URL + 'getTaskById/'+ id,
    {headers: this.createAuthorization()});
  }




  createComment(id: number,content: string):Observable<any>{
    const params = {
      content : content
    }
    return this.http_.post(BASIC_URL+  "postComment/"+ id,null,
    { params: params,
      headers: this.createAuthorization()}
    )
  }



  getCommentsByTaskId(taskId: number):Observable<any>{
    return this.http_.get(BASIC_URL+ `getCommentsByTaskId/${taskId}`,{
      headers: this.createAuthorization()
    });
  }




}
