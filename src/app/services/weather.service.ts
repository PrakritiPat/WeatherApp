import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.development';
import { WeatherData } from 'src/app/models/weather.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherData(cityName: string): Observable<WeatherData> {
    return this.http.get<WeatherData> (environment.weatherApiBaseUrl, {
      headers: new HttpHeaders()
      .set(environment.XRapidAPIHostHeaderName, environment. XRapidAPIHostHeaderValue)
      .set(environment.XRapidAPIKeyHeaderName, environment.XRapidAPIKeyHeaderValue),
      params: new HttpParams()
      .set('city', cityName)
      .set('mode', 'json')
    }).pipe(map(res => {
      res.main.temp = (res.main.temp - 273.15) * 9 / 5 +32;
      res.main.temp_max = (res.main.temp_max - 273.15) * 9 / 5 +32;
      res.main.temp_min = (res.main.temp_min - 273.15) * 9 / 5 +32;
      return res;
      }
      ))
  }
} 

function kelvinToFahrenheit(kelvin: number): number {
  return (kelvin - 273.15) * 1.8 + 32;
}
