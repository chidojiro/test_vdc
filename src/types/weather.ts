import { ILocation, ILocationType } from '.';

export interface IConsolidatedWeather {
  id: number;
  applicable_date: string;
  weather_state_name: string;
  weather_state_abbr: string;
  wind_speed: number;
  wind_direction: number;
  wind_direction_compass: string;
  min_temp: number;
  max_temp: number;
  the_temp: number;
  air_pressure: number;
  humidity: number;
  visibility: number;
  predictability: number;
}

export interface IWeatherForecastByLocation {
  title: string;
  location_type: ILocationType;
  latt_long: string;
  time: string;
  sun_rise: string;
  sun_set: string;
  timezone_name: string;
  parent: ILocation;
  consolidated_weather: IConsolidatedWeather[];
  sources: {
    title: string;
    url: string;
  }[];
}
