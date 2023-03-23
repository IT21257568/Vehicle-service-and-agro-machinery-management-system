import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { VacancyContextProvider } from './context/VacancyContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <VacancyContextProvider>
      <App />
    </VacancyContextProvider>
  </React.StrictMode>
);

