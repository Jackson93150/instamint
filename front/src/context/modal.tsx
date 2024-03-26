import { useGSAP } from '@gsap/react';
import cx from 'classnames';
import gsap from 'gsap';
import { createContext, useState, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { MediaModal } from '@/components';

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
    gsap.to('.gsapModalBlur', { opacity: 0, display: 'none' });
    gsap.to('.gsapMediaModal', { y: '100vh', display: 'none' });
  });

  const openModal = contextSafe(() => {
    gsap.to('.gsapModalBlur', { opacity: 1, display: 'block' });
    gsap.to('.gsapMediaModal', { y: '0', display: 'flex' });
  });

  useEffect(() => {
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      closeModal();
    } else {
      openModal();
    }
  };

  const contextValue: ModalContextType = {
    isOpen,
    toggleModal: toggleSidebar,
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
