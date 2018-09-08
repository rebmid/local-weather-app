import { Component, OnInit } from '@angular/core';
import { ICurrentWeather } from '../icurrent-weather';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather;
     // (private weatherService: WeatherService) //

    constructor() {
     this.current = {
       city: 'Bethasda',
       country: 'US',
       date: new Date(),
       image: '',
       temperature: 72,
       description: 'sunny',
     };
     }
         // this.weatherService.getCurrentWeather('Bethesda', 'US').subscribe((data) => this.current = data);//

  ngOnInit() {
  }
}



















