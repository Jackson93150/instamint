import { useGSAP } from '@gsap/react';
import cx from 'classnames';
import gsap from 'gsap';
import { createContext, useState, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { MediaModal } from '@/components';
import { gsapOpacityAnimation, gsapTranslateYAnimation } from '@/utils';

gsap.registerPlugin(useGSAP);

interface ModalContextType {
  isOpen: boolean;
  toggleModal: () => void;
}

interface Props {
  children?: ReactNode;
}

const defaultContextValue: ModalContextType = {
  isOpen: false,
  toggleModal: () => {},
};

export const ModalContext = createContext<ModalContextType>(defaultContextValue);

export const ModalProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const { contextSafe } = useGSAP();

  const closeModal = contextSafe(() => {
    gsapOpacityAnimation('.gsapModalBlur', 0, 'none');
    gsapTranslateYAnimation('.gsapMediaModal', '100vh', 'none');
  });

  const openModal = contextSafe(() => {
    gsapOpacityAnimation('.gsapModalBlur', 1, 'block');
    gsapTranslateYAnimation('.gsapMediaModal', '0', 'flex');
  });

  useEffect(() => {
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      closeModal();
    } else {
      openModal();
    }
  };

  const contextValue: ModalContextType = {
    isOpen,
    toggleModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      <span
        className={cx(
          'gsapModalBlur',
          'left-O z-navbar hidden fixed top-0 h-screen w-full bg-black/30 backdrop-blur-[15px]'
        )}
      />
      <MediaModal />
      {children}
    </ModalContext.Provider>
  );
};
