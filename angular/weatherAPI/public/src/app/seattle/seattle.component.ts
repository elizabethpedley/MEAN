import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-seattle',
  templateUrl: './seattle.component.html',
  styleUrls: ['./seattle.component.css']
})
export class SeattleComponent implements OnInit {

  weather = {};
  zipCode;
  constructor(private _httpService: HttpService) { 
    this.zipCode = 98101;
    this.getWeather();
  }

  ngOnInit() {

  }
  getWeather(){
    let weatherResponse = this._httpService.getWeather(this.zipCode);
    weatherResponse.subscribe(data =>{
      this.weather['humidity'] = data['main']['humidity'];
      this.weather['temp'] = data['main']['temp'];
      this.weather['temp_max'] = data['main']['temp_max'];
      this.weather['temp_min'] = data['main']['temp_min'];
      this.weather['status'] = data['weather'][0]['description'];
      console.log(this.weather);
    });
  }

}
