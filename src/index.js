import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthState from './authState';
import AvailibilityState from './AvailibilityState';
import AppointmentsState from './appointState';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthState>
        <AvailibilityState>
          <AppointmentsState>
            <App />
          </AppointmentsState>
        </AvailibilityState>
      </AuthState>
    </BrowserRouter>
  </React.StrictMode>
);

