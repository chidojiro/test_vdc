import React from 'react';
import { IWeatherForecastByLocation } from '../../../types';
import { WeatherForecastItem } from './WeatherForecastItem';
import Styled from './WeatherForecastListByLocation.styled';

interface IProps {
  weatherForecastsByLocation: IWeatherForecastByLocation;
}

const SHOW_LIMIT = 5;

export const WeatherForecastListByLocation: React.FC<IProps> = ({
  weatherForecastsByLocation,
}) => {
  const { consolidated_weather } = weatherForecastsByLocation;

  return (
    <>
      <h2>{weatherForecastsByLocation.title}</h2>
      <Styled.WeatherForecastGroup>
        {consolidated_weather.slice(0, SHOW_LIMIT).map((weather) => (
          <WeatherForecastItem key={weather.id} consolidatedWeather={weather} />
        ))}
      </Styled.WeatherForecastGroup>
    </>
  );
};
