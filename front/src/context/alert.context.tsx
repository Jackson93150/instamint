import Alert from '@mui/material/Alert';
import { createContext, useState, PropsWithChildren, Dispatch, useContext } from 'react';

export interface ToggleAlertArgs {
  alertType: 'success' | 'info' | 'warning' | 'error';
  content: string;
}

export type AlertContextProps = {
  toggleModal: Dispatch<ToggleAlertArgs>;
};

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [AlertType, setAlertType] = useState<'success' | 'info' | 'warning' | 'error' | undefined>();
  const [content, setContent] = useState<string | undefined>();

  const openModal = () => {
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 5000);
  };

  const toggleModal = (args: ToggleAlertArgs) => {
    const { alertType, content } = args;

    setContent(content);
    setAlertType(alertType);
    openModal();
  };

  return (
    <AlertContext.Provider
      value={{
        toggleModal: (args) => toggleModal(args as ToggleAlertArgs),
      }}
    >
      {isOpen && (
        <div className="right-3U z-modal bottom-3U fixed h-fit w-[260px]">
          <Alert severity={AlertType}>{content}</Alert>
        </div>
      )}
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within a UserProvider');
  }
  return context;
};
