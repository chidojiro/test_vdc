import React from 'react';
import useSwr from 'swr';
import {
  getLocationsByQuery,
  getWeatherForecastsByWoeid,
} from '../../services';
import { WeatherForecastBrowserContext } from './WeatherForecastBrowser.context';

export const useWeatherForecastBrowser = () => {
  const { locationQuery, setLocationQuery } = React.useContext(
    WeatherForecastBrowserContext
  );

  const swr = useSwr(
    locationQuery && ['getWeatherForecastByLocation', locationQuery],
    async () => {
      const locations = await getLocationsByQuery(locationQuery);

      const firstFoundLocation = locations[0];

      if (!firstFoundLocation) return null;

      return getWeatherForecastsByWoeid(firstFoundLocation.woeid);
    }
  );

  return React.useMemo(
    () => ({
      ...swr,
      searchWeatherForecastByLocation: setLocationQuery,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setLocationQuery, ...Object.values(swr)]
  );
};
