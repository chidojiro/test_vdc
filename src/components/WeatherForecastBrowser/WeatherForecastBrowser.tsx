import { Empty, Input, Spin, Typography } from 'antd';
import { AxiosError } from 'axios';
import React from 'react';
import { AppLayout } from '..';
import { useWeatherForecastBrowser } from './useWeatherForecastBrowser';
import { WeatherForecastBrowserProvider } from './WeatherForecastBrowser.context';
import Styled from './WeatherForecastBrowser.styled';
import { WeatherForecastListByLocation } from './WeatherForecastListByLocation';

const WrappedWeatherForecastBrowser: React.FC = () => {
  const [locationQuery, setLocationQuery] = React.useState('');

  const {
    searchWeatherForecastByLocation,
    data: weatherForecasts,
    error: weatherForecastsError,
    isValidating: isValidatingWeatherForecasts,
  } = useWeatherForecastBrowser();

  const handleLocationQueryKeydown: React.KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.code === 'Enter' && !!locationQuery) {
      searchWeatherForecastByLocation(locationQuery);
    }
  };

  const renderWeatherForecastListByLocation = () => {
    const statusCode = (weatherForecastsError as AxiosError)?.response?.status;

    if (isValidatingWeatherForecasts) return <Spin size='large' />;

    if (weatherForecastsError && statusCode !== 404)
      return (
        <Typography.Text type='danger'>Something went wrong</Typography.Text>
      );

    if (!weatherForecasts || statusCode === 404)
      return <Empty data-testid='empty-indicator' />;

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
        placeholder='Enter location'
      />
      <Styled.ResultContainer>
        {renderWeatherForecastListByLocation()}
      </Styled.ResultContainer>
    </AppLayout>
  );
};

export const WeatherForecastBrowser: React.FC = () => {
  return (
    <WeatherForecastBrowserProvider>
      <WrappedWeatherForecastBrowser />
    </WeatherForecastBrowserProvider>
  );
};
