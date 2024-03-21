import { createContext, useState, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Sidebar } from '@/components';
import { MinterInterface } from '@/interfaces';
import { connectedMinter } from '@/services';

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
  const [minterData, setMinterData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (!minterData) {
      const fetchMinter = async () => {
        const result = await connectedMinter();
        setMinterData(result.data);
      };
      fetchMinter();
    }
  }, [location.pathname, minterData]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const contextValue: SidebarContextType = {
    isOpen,
    toggleSidebar,
    minterData,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {isOpen && <Sidebar />}
      {children}
    </SidebarContext.Provider>
  );
};
