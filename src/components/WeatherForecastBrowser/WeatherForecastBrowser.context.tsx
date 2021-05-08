import React from 'react';

interface IWeatherForecastBrowserContext {
  locationQuery: string;
  setLocationQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const WeatherForecastBrowserContext = React.createContext<IWeatherForecastBrowserContext>(
  {
    locationQuery: '',
    setLocationQuery: () => null,
  }
);

export const WeatherForecastBrowserProvider: React.FC = ({ children }) => {
  const [locationQuery, setLocationQuery] = React.useState('');

  const contextValue = React.useMemo(
    () => ({
      locationQuery,
      setLocationQuery,
    }),
    [locationQuery]
  );

  return (
    <WeatherForecastBrowserContext.Provider value={contextValue}>
      {children}
    </WeatherForecastBrowserContext.Provider>
  );
};
