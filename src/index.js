import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    ),document.getElementById('root')
  );
});;
