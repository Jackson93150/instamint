import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { ModalDataMap } from '@/components/modal/modal-layout';
import type { MODAL_TYPE } from '@/components/modal/modal-types';
import { gsapOpacityAnimation, gsapTranslateYAnimation } from '@/utils';

interface ModalState {
  type?: MODAL_TYPE;
  data?: ModalDataMap[keyof ModalDataMap];
}

const initialState: ModalState = {};

export const modal = createSlice({
  name: 'modal-slice',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        type: MODAL_TYPE;
        data?: ModalDataMap[keyof ModalDataMap];
      }>
    ) => {
      state.type = action.payload.type;
      state.data = action.payload.data;
      gsapOpacityAnimation('.gsapModalBlur', 1, 'block');
      gsapTranslateYAnimation('.gsapModal', '0', 'flex');
    },
    closeModal: (state) => {
      gsapOpacityAnimation('.gsapModalBlur', 0, 'none');
      gsapTranslateYAnimation('.gsapModal', '100vh', 'none');
      state.type = undefined;
    },
  },
});

export const { openModal, closeModal } = modal.actions;

export default modal;
