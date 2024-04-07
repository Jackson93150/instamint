import { configureStore } from '@reduxjs/toolkit';

import modal from './reducer/modal-slice';

const modalReducer = modal.reducer;

export const store = configureStore({
  reducer: {
    modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
