import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authors;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors(){
    let authorsReturn = this._httpService.getAuthors();
    authorsReturn.subscribe(data =>{
      if(data['err']){return console.log(data['error'])}
      this.authors = data['authors'];
    })
  }
  deleteAuthor(id){
    let authorDelete = this._httpService.deleteAuthor(id);
    authorDelete.subscribe(data =>{
      if(data['err']){return console.log(data['error'])}
      for(let i=0; i<this.authors.length; i++){
        if(this.authors[i]['_id'] == id){
          this.authors.splice(i,1);
          return;
        }
      }
    })
  }
}
