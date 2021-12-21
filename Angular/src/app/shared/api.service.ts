import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {map} from 'rxjs/operators'
import { TaskModels } from '../taskdashboard/taskdashboard.model';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //public taskAPIUrl : string="http://localhost:51527/api/Task";
  constructor(private http:HttpClient) { }
  postTask(data:any)
  {
    return this.http.post<any>("http://localhost:51527/api/Task/addtask",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getTask()
  {
    return this.http.get<Array<TaskModels>>("http://localhost:51527/api/Task/getalltask")
    .pipe(map((res:Array<TaskModels>)=>{
      console.log("get"+res);
      return res;
    }))
  }
  updateTask(data :any)
  {
    return this.http.put<any>("http://localhost:51527/api/Task/update/",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  DeleteTask(id :number)
  {
    return this.http.delete<any>("http://localhost:51527/api/Task/deletetask/" + id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  signUp(empObj : any){
    //return this._http.post<any>(this.loginAPIUrl+"signup",empObj)
    return this.http.post<User>("http://localhost:51527/api/Login/signup",empObj)
  }
  login(empObj:any){
    return this.http.post<any>("http://localhost:51527/api/Login/login",empObj)
  }
  getAllUsers(){
    return this.http.get<any>("http://localhost:51527/api/Login/users")
  }
}
