import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import theme from './theme.js';
import { CartProvider } from './contexts/CartContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <CartProvider>
          <App/>
        </CartProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
)
