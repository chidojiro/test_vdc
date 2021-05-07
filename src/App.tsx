import React from 'react';
import { WeatherForecastBrowser } from './components';
import { QueryClientProvider, QueryClient } from 'react-query';

import 'antd/dist/antd.css';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <WeatherForecastBrowser />
      </div>
    </QueryClientProvider>
  );
};
