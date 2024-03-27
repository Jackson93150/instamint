import { useGSAP } from '@gsap/react';
import cx from 'classnames';
import gsap from 'gsap';
import { createContext, useState, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Sidebar } from '@/components';
import { MinterInterface } from '@/interfaces';
import { connectedMinter } from '@/services';

gsap.registerPlugin(useGSAP);

interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
  minterData: MinterInterface | null;
}

interface Props {
  children?: ReactNode;
}

const defaultContextValue: SidebarContextType = {
  isOpen: false,
  toggleSidebar: () => {},
  minterData: null,
};

export const SidebarContext = createContext<SidebarContextType>(defaultContextValue);

export const SidebarProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minterData, setMinterData] = useState<MinterInterface | null>(null);
  const location = useLocation();

  const { contextSafe } = useGSAP();

  const closeSidebar = contextSafe(() => {
    gsap.to('.gsapSidebarBlur', { opacity: 0, display: 'none' });
    gsap.to('.gsapSidebar', { x: '100%', display: 'none' });
  });

  const openSidebar = contextSafe(() => {
    gsap.to('.gsapSidebarBlur', { opacity: 1, display: 'block' });
    gsap.to('.gsapSidebar', { x: '0%', display: 'flex' });
  });

  useEffect(() => {
    closeSidebar();
    if (!minterData) {
      const fetchMinter = async () => {
        const result = await connectedMinter();
        setMinterData(result);
      };
      fetchMinter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, minterData]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  };

  const contextValue: SidebarContextType = {
    isOpen,
    toggleSidebar,
    minterData,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      <span
        className={cx(
          'gsapSidebarBlur',
          'left-O z-navbar fixed top-0 h-screen w-full bg-black/30 backdrop-blur-[15px]'
        )}
      />
      <Sidebar />
      {children}
    </SidebarContext.Provider>
  );
};
