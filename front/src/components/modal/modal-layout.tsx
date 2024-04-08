import { ReactNode } from 'react';

import { MediaModal, MediaViewerModal } from '@/components';
import { ModalDataMap } from '@/context';
import { ModalType } from '@/interfaces/modals';

interface Props<T extends keyof ModalDataMap> {
  modalType: T | undefined;
  data?: ModalDataMap[T];
  closeModal: () => void;
}

export const Modal = <T extends keyof ModalDataMap>({ modalType, data }: Props<T>) => {
  if (modalType === undefined) return null;

  const modalComponents: Record<ModalType['modalType'], ReactNode> = {
    'media-upload': <MediaModal />,
    'media-viewer': <MediaViewerModal {...(data as ModalDataMap['media-viewer'])} />,
  };

  return <>{modalComponents[modalType]}</>;
};
