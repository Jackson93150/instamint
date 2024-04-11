import { ReactNode } from 'react';

import { MediaDeleteModal } from './media-delete.modal';
import { MediaModal, MediaViewerModal } from '@/components';
import { ModalDataMap } from '@/context';
import { ModalType } from '@/interfaces';

interface Props<T extends keyof ModalDataMap> {
  modalType: T | undefined;
  data?: ModalDataMap[T];
  closeModal: () => void;
}

export const Modal = <T extends keyof ModalDataMap>({ modalType, data }: Props<T>) => {
  if (modalType === undefined) return null;

  const modalComponents: Record<ModalType['modalType'], ReactNode> = {
    'media-upload': <MediaModal {...(data as ModalDataMap['media-upload'])} />,
    'media-viewer': <MediaViewerModal {...(data as ModalDataMap['media-viewer'])} />,
    'media-delete': <MediaDeleteModal {...(data as ModalDataMap['media-delete'])} />,
  };

  return <>{modalComponents[modalType]}</>;
};
