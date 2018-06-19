import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }
  
  getAuthors(){
    return this._http.get('/api/authors');
  }
  deleteAuthor(id){
    return this._http.delete('/api/authors/delete/'+id);
  }
  createAuthor(author){
    return this._http.post('/api/authors', author);
  }
  getAuthor(id){
    return this._http.get('/api/authors/'+id);
  }
  updateAuthor(id,author){
    return this._http.put('/api/authors/update/'+id,author);
  }
}
