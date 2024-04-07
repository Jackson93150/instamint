import type { ReactNode } from 'react';
import { Provider } from 'react-redux';

import ModalProvider from './modal-provider';
import { store } from '../store';

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ModalProvider>{children}</ModalProvider>
    </Provider>
  );
}
