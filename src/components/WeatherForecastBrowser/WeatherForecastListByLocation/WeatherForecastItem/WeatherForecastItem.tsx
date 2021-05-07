import { Card } from 'antd';
import React from 'react';
import moment from 'moment';
import { IConsolidatedWeather } from '../../../../types';

interface IProps {
  consolidatedWeather: IConsolidatedWeather;
}

export const WeatherForecastItem: React.FC<IProps> = ({
  consolidatedWeather: { applicable_date, min_temp, max_temp },
}) => {
  return (
    <Card
      title={moment(applicable_date).format('dddd')}
      style={{ width: 200 }}
      data-testid='weather-forecast-item'
    >
      <p>Lowest: {min_temp.toFixed(2)}</p>
      <p>Highest: {max_temp.toFixed(2)}</p>
    </Card>
  );
};
