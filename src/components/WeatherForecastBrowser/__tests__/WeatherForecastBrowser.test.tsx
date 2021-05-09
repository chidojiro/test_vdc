jest.mock('../../../services', () => ({
  getWeatherForecastsByWoeid: () => {
    return Promise.resolve({
      title: 'London',
      consolidated_weather: [
        {
          id: '1',
          applicable_date: '2021-05-07',
          min_temp: 10,
          max_temp: 20,
        },
        {
          id: '2',
          applicable_date: '2021-05-08',
          min_temp: 10,
          max_temp: 20,
        },
        {
          id: '3',
          applicable_date: '2021-05-09',
          min_temp: 10,
          max_temp: 20,
        },
        {
          id: '4',
          applicable_date: '2021-05-10',
          min_temp: 10,
          max_temp: 20,
        },
        {
          id: '5',
          applicable_date: '2021-05-11',
          min_temp: 10,
          max_temp: 20,
        },
        {
          id: '6',
          applicable_date: '2021-05-12',
          min_temp: 10,
          max_temp: 20,
        },
      ],
    });
  },
  getLocationsByQuery: (query: string) => {
    if (query === 'london')
      return Promise.resolve([{ title: 'London', woeid: 44418 }]);
    if (query === 'empty') return Promise.resolve([]);
    if (query === 'error') throw { response: { status: 500 } };
  },
}));

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import * as Services from '../../../services';
import { App } from '../../../App';

const renderWeatherForecastBrowser = () => {
  const renderResult = render(<App />);

  return renderResult;
};

describe('WeatherForecastBrowser', () => {
  it('should initially shows empty indicator', async () => {
    renderWeatherForecastBrowser();

    await screen.findByTestId('empty-indicator');
  });

  it('should not call apis when search input is empty', async () => {
    jest.spyOn(Services, 'getLocationsByQuery');
    jest.spyOn(Services, 'getWeatherForecastsByWoeid');

    renderWeatherForecastBrowser();

    fireEvent.keyDown(screen.getByPlaceholderText('Enter location'), {
      code: 'Enter',
    });

    expect(Services.getLocationsByQuery).not.toBeCalled();
    expect(Services.getWeatherForecastsByWoeid).not.toBeCalled();
  });

  it('should show weather forecasts for London', async () => {
    renderWeatherForecastBrowser();

    fireEvent.change(screen.getByPlaceholderText('Enter location'), {
      target: { value: 'london' },
    });

    fireEvent.keyDown(screen.getByPlaceholderText('Enter location'), {
      code: 'Enter',
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('weather-forecast-item').length).toBe(5);
    });
  });

  it('should show empty indicator', async () => {
    renderWeatherForecastBrowser();

    fireEvent.change(screen.getByPlaceholderText('Enter location'), {
      target: { value: 'empty' },
    });

    fireEvent.keyDown(screen.getByPlaceholderText('Enter location'), {
      code: 'Enter',
    });

    await screen.findByTestId('empty-indicator');
  });

  it('should show error message', async () => {
    renderWeatherForecastBrowser();

    fireEvent.change(screen.getByPlaceholderText('Enter location'), {
      target: { value: 'error' },
    });

    fireEvent.keyDown(screen.getByPlaceholderText('Enter location'), {
      code: 'Enter',
    });

    await screen.findByText('Something went wrong');
  });
});
