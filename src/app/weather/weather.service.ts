import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import { ICurrentWeather } from '../icurrent-weather';
import { IWeatherService } from './iweather-service';

interface ICurrentWeatherData {
  weather: [{
    description: string,
    icon: string
  }];
     main: {
     temp: number
   };
   sys: {
     country: string
   };
   dt: number;
   name: string;
  }

@Injectable({
  providedIn: 'root'
})

export class WeatherService implements IWeatherService {

  constructor(private httpClient: HttpClient) {}

   getCurrentWeather(search: string | number, country?: string) {
     let uriParams = '';

     if (typeof search === 'string') {
       uriParams = `q=${search}`;
     } else {
       uriParams = `zip=${search}`;
     }
    if (country) {
      uriParams = `$[uriParams],${country}`;
    }

    return this.httpClient.get<ICurrentWeatherData>(
      `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?${uriParams}&appid=${environment.appId}`).pipe(
        map(data => this.transformToICurrentWeather(data))
         );
       }

   private transformToICurrentWeather(data: ICurrentWeatherData):
   ICurrentWeather {
       return {
        city: data.name,
        country: data.sys.country,
        date: data.dt * 1000,
        image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
        temperature: this.convertKelvinToFahrenheit(data.main.temp),
        description: data.weather[0].description
       };
      }

   private convertKelvinToFahrenheit (kelvin: number): number {
         return kelvin * 9 / 5 - 459.67;
   }
}
