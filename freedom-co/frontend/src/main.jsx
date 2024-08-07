import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import theme from './theme.js';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { Notifications } from '@mantine/notifications';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <AuthProvider>
            <Notifications/>
            <App/>
        </AuthProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
)
