import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient){}
  getWeather(location){
    var key = '3ba22e53d1b083efc876a9e864f313e8';
    return this._http.get('http://api.openweathermap.org/data/2.5/weather?zip='+location+'&units=imperial&&appid='+key);
  }
}
