import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { SidebarProvider, ModalProvider } from './context';

import './index.css';
const rootDiv = document.getElementById('root');
const root = createRoot(rootDiv as Element);

root.render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>
);
