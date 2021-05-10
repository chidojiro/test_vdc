import React from 'react';
import { WeatherForecastBrowser } from './components';

import 'antd/dist/antd.css';

export const App: React.FC = () => {
  return (
    <div className='App'>
      <WeatherForecastBrowser />
    </div>
  );
};
