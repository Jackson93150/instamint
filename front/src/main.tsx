import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';

import App from './App';
import { SidebarProvider, ModalProvider, AlertProvider } from './context';

import '@rainbow-me/rainbowkit/styles.css';
import './index.css';

const config = getDefaultConfig({
  appName: 'Instamint',
  projectId: import.meta.env.VITE_PROJECT_ID,
  chains: [sepolia],
  ssr: false,
});

const rootDiv = document.getElementById('root');
const root = createRoot(rootDiv as Element);
const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <BrowserRouter>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <SidebarProvider>
              <AlertProvider>
                <ModalProvider>
                  <App />
                </ModalProvider>
              </AlertProvider>
            </SidebarProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  </StrictMode>
);
