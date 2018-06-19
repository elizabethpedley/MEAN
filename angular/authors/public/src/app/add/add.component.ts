import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  newAuthor;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    
   }

  ngOnInit() {
    this.newAuthor= {
      name: ""
    }
  }
  onSubmit(){
    let newAuthor = this._httpService.createAuthor(this.newAuthor);
    newAuthor.subscribe(data =>{
      if(data['author']){
        this.newAuthor= {
          name: ""
        }
        this._router.navigate(['/']);
      }
    })
  }

}
