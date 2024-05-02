import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { createContext, useState, useEffect, ComponentProps, PropsWithChildren, Dispatch, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import Close from '@/assets/icons/close.svg?react';
import { MediaModal, MediaViewerModal, Modal } from '@/components';
import { ListBuyNftModal } from '@/components/modal/list-buy-nft.modal';
import { MediaDeleteModal } from '@/components/modal/media-delete.modal';
import { gsapOpacityAnimation, gsapTranslateYAnimation } from '@/utils';

gsap.registerPlugin(useGSAP);

export interface ModalDataMap {
  'media-upload': ComponentProps<typeof MediaModal>;
  'media-viewer': ComponentProps<typeof MediaViewerModal>;
  'media-delete': ComponentProps<typeof MediaDeleteModal>;
  'list-nft': ComponentProps<typeof ListBuyNftModal>;
}

export interface ToggleModalArgs<T extends keyof ModalDataMap> {
  modalType: T;
  data?: ModalDataMap[T];
}

export type ModalContextProps<T extends keyof ModalDataMap = keyof ModalDataMap> = {
  toggleModal: Dispatch<ToggleModalArgs<T>>;
  modalType: keyof ModalDataMap | undefined;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = <T extends keyof ModalDataMap>({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<T | undefined>();
  const [data, setData] = useState<ModalDataMap[T] | undefined>();
  const location = useLocation();

  const { contextSafe } = useGSAP();

  const closeModal = contextSafe(() => {
    gsapOpacityAnimation('.gsapModalBlur', 0, 'none');
    gsapTranslateYAnimation('.gsapModal', '100vh', 'none');
    setIsOpen(false);
  });

  const openModal = contextSafe(() => {
    setIsOpen(true);
    gsapOpacityAnimation('.gsapModalBlur', 1, 'block');
    gsapTranslateYAnimation('.gsapModal', '0', 'flex');
  });

  const toggleModal = (args: ToggleModalArgs<T>) => {
    const { modalType, data } = args;

    setData(data);
    setModalType(modalType);
    openModal();
  };

  useEffect(() => {
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <ModalContext.Provider
      value={{
        toggleModal: (args) => toggleModal(args as ToggleModalArgs<T>),
        modalType,
        closeModal,
      }}
    >
      <span className="gsapModalBlur left-O z-modal fixed top-0 hidden h-screen w-full bg-black/80 backdrop-blur-[15px]" />
      <div className="gsapModal z-modal fixed inset-0 hidden items-center justify-center">
        <div className="p-6U relative rounded-[10px] border border-white/25 bg-black/70 backdrop-blur-[15px]">
          <Close className="top-2U right-2U size-3U absolute cursor-pointer" onClick={() => closeModal()} />
          {isOpen && <Modal modalType={modalType} data={data} closeModal={closeModal} />}
        </div>
      </div>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a UserProvider');
  }
  return context;
};
