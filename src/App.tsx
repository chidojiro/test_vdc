import React from 'react';
import { WeatherForecastBrowser } from './components';
import { QueryClientProvider, QueryClient } from 'react-query';

import './App.css';
import 'antd/dist/antd.css';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <WeatherForecastBrowser />
      </div>
    </QueryClientProvider>
  );
};

export default App;
