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

  getAllTask():Observable<any>{
    return this.http_.get(BASIC_URL+'getAllTask',{
      headers: this.createAuthorization()
    });
  }

  deleteTask(id: number){
    return this.http_.delete(BASIC_URL + 'deleteTask/'+ id,
    {headers: this.createAuthorization()});
  }

  getTaskById(id: number){
    return this.http_.get(BASIC_URL + 'getTaskById/'+ id,
    {headers: this.createAuthorization()});
  }

  updateTask(id: number, TaskDto: any):Observable<any>{
    return this.http_.put(BASIC_URL+  `updateTask/${id}`,TaskDto,
    {headers: this.createAuthorization()}
    )
  }




  searchTask(title: string):Observable<any>{
    return this.http_.get(BASIC_URL+  `task/searchByTitle/${title}`,
    {headers: this.createAuthorization()}
    )
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
