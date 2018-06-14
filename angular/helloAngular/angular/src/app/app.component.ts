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
  task;
  constructor(private _httpService: HttpService){}
  ngOnInit() {
    
  }
  getTasks(){
    let tasksResponse = this._httpService.getTasks();

    tasksResponse.subscribe(data =>{
       console.log(data['tasks']);
        this.tasks = data['tasks']
    })
  }
  getTask(id){
    let tasksResponse = this._httpService.getTask(id);

    tasksResponse.subscribe(data => this.task = data['task'])
  }
}
