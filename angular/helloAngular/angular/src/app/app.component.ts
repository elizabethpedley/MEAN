import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  tasks = [];
  editTask;
  newTask;
  constructor(private _httpService: HttpService){}
  ngOnInit() {
    this.newTask = { title: "", description: "" , completed: false}
    this.getTasks();
  }
  onSubmit(){
    let submitTask = this._httpService.addTask(this.newTask);
    submitTask.subscribe(data =>{
      if(!data['err']){
        this.tasks.push(data['task']);
        this.newTask = { title: "", description: "" , completed: false}
      }else{
        console.log(data['err']);
      }
    })
    
  }
  getTasks(){
    let tasksResponse = this._httpService.getTasks();

    tasksResponse.subscribe(data => this.tasks = data['tasks'])
  }
  editForm(id){
    for(var task of this.tasks){
      if(task._id == id ){
        this.editTask = {...task};
        return;
      }
    }
  }
  editOneTask(){
    console.log('in edit')
    let editResponse = this._httpService.editTask(this.editTask['_id'],this.editTask);
    editResponse.subscribe(data =>{
      if(data['err']){ return console.log(data['error']); }
      
      for(let i = 0; i<this.tasks.length; i+=1){
        if(this.tasks[i]._id == this.editTask._id ){
          console.log('found match');
          this.tasks[i] = this.editTask;
          this.editTask = false;
          return;
        }
      }

    })
  }
  deleteTask(id){
    let deleteResponse = this._httpService.deleteTask(id);
    deleteResponse.subscribe(data =>{
      if(data['err']){
        console.log(data['err']);
        return;
      }
      for(let i = 0; i<this.tasks.length; i+=1){
        if(this.tasks[i]._id == id ){
          this.tasks.splice(i,1);
          return;
        }
      }
    })
  }
}
