import { Empty, Input, Spin, Typography } from 'antd';
import { AxiosError } from 'axios';
import React from 'react';
import { useMutation } from 'react-query';
import { AppLayout } from '..';
import {
  getLocationsByQuery,
  getWeatherForecastsByWoeid,
} from '../../services';
import { WeatherForecastListByLocation } from './WeatherForecastListByLocation';

export const WeatherForecastBrowser: React.FC = () => {
  const [locationQuery, setLocationQuery] = React.useState('');

  const {
    data: weatherForecasts,
    error: weatherForecastsError,
    mutate: performGetWeatherForecastsByQuery,
    isLoading: isLoadingWeatherForecasts,
  } = useMutation(async (locationQuery: string) => {
    const locations = await getLocationsByQuery(locationQuery);

    const firstFoundLocation = locations[0];

    if (!firstFoundLocation) return null;

    return getWeatherForecastsByWoeid(firstFoundLocation.woeid);
  }, {});

  const handleLocationQueryKeydown: React.KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.code === 'Enter' && !!locationQuery) {
      performGetWeatherForecastsByQuery(locationQuery);
    }
  };

  const renderWeatherForecastListByLocation = () => {
    const statusCode = (weatherForecastsError as AxiosError)?.response?.status;

    if (isLoadingWeatherForecasts) return <Spin size='large' />;

    if (weatherForecastsError && statusCode !== 404)
      return (
        <Typography.Text type='danger'>Something went wrong</Typography.Text>
      );

    if (!weatherForecasts || statusCode === 404) return <Empty />;

    return (
      <WeatherForecastListByLocation
        weatherForecastsByLocation={weatherForecasts}
      />
    );
  };

  return (
    <AppLayout>
      <Input.Search
        value={locationQuery}
        onChange={(e) => setLocationQuery(e.target.value)}
        onKeyDown={handleLocationQueryKeydown}
        style={{ marginBottom: '20px' }}
      />
      {renderWeatherForecastListByLocation()}
    </AppLayout>
  );
};
