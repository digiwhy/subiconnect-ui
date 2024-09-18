import App from './App';
import './globals.css';
import './sc-override.css';
import '@subifinancial/subi-connect/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
