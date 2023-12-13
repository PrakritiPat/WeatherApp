import { Component, Input, OnInit } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private weatherService: WeatherService){

  }
  cityName: string = "Pleasanton";
  weatherData? : WeatherData;

  ngOnInit(): void {  this.getWeatherData(this.cityName);
  }


  onSubmit(){
  this.getWeatherData(this.cityName);
  this.cityName = " ";
      }

      private getWeatherData(cityName: string) {
        this.weatherService.getWeatherData(cityName)
          .subscribe({
            next: (response) => {
              this.weatherData = response;
              console.log(response);
            }
          });
      }
}
