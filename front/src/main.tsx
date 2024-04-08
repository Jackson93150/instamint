import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { SidebarProvider, ModalProvider, AlertProvider } from './context';

import './index.css';

const rootDiv = document.getElementById('root');
const root = createRoot(rootDiv as Element);

root.render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <AlertProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </AlertProvider>
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>
);
