import React          from 'react';
import ReactDOM       from 'react-dom';
import { AppRouter }   from './router/AppRouter';
import './styles/normalize.css';
import './styles/index.css';
import { AppProvider } from './context/AppContext';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <AppRouter />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
