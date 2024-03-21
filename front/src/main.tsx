import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { SidebarProvider } from './context';

import './index.css';
const rootDiv = document.getElementById('root');
const root = createRoot(rootDiv as Element);

root.render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>
);
