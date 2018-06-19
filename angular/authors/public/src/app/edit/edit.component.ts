import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  author;
  id;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params =>{
      this.id = params['id'];
      this.getAuthor();
    });
    // this.getAuthor();
  }
  getAuthor(){
    let authorResponse = this._httpService.getAuthor(this.id);
    authorResponse.subscribe(data =>{
      if(!data['author']){
        this._router.navigate(['/notFound']);
      }
      this.author = data['author'];
    })
  }
  onSubmit(){
    let authorUpdate = this._httpService.updateAuthor(this.id,this.author);
    authorUpdate.subscribe(data =>{
      if(data['err']){ return console.log(data['error'])}
      this._router.navigate(['/']);
    })
  }
}
