import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';  // ← THIS IS THE CORRECT PATH

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);