import React          from 'react';
import ReactDOM       from 'react-dom';
import { AppRoter }   from './router/AppRoter';
import './styles/normalize.css';
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <AppRoter />
  </React.StrictMode>,
  document.getElementById('root')
)
