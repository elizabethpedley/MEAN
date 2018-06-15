import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { 
  
  }
  getTasks(){
    return this._http.get('/tasks');
 }
  getTask(id){
    return this._http.get('/tasks/'+ id);
  }
  addTask(newtask){
    return this._http.post('/tasks', newtask)
  }
  editTask(id,task){
    return this._http.put('/tasks/update/'+id, task)
  }
  deleteTask(id){
    return this._http.delete('/tasks/delete/'+id)
  }
}
