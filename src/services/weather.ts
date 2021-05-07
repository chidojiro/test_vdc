import axios from 'axios';
import { IWeatherForecastByLocation } from '../types';

export const getWeatherForecastsByWoeid = (
  woeid: number
): Promise<IWeatherForecastByLocation> => {
  return axios
    .get(`/api/getWeatherForecastsByWoeid?woeid=${woeid}`)
    .then(({ data }) => data);
};
