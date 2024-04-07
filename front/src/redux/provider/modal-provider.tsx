import { type PropsWithChildren, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal } from '../reducer/modal-slice';
import type { AppDispatch, RootState } from '../store';
import ModalLayout from '@/components/modal/modal-layout';
import type { MODAL_TYPE } from '@/components/modal/modal-types';

export default function ModalProvider({ children }: PropsWithChildren) {
  const modalType = useSelector((state: RootState) => state.modalReducer.type);
  const modalData = useSelector((state: RootState) => state.modalReducer.data);

  const dispatch = useDispatch<AppDispatch>();

  function handleCloseModal() {
    dispatch(closeModal());
  }

  const modalRef = useRef<MODAL_TYPE>();
  useEffect(() => {
    if (modalType === undefined) return;
    modalRef.current = modalType;
  }, [modalType]);

  return (
    <>
      {children}
      <span
        className="gsapModalBlur left-O z-navbar fixed top-0 hidden h-screen w-full bg-black/30 backdrop-blur-[15px]"
        onClick={handleCloseModal}
      />
      <ModalLayout modalType={modalType ?? modalRef.current} data={modalData} />
    </>
  );
}
