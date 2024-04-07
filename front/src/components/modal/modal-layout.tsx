import type { ComponentProps } from 'react';
import { useDispatch } from 'react-redux';

import { MediaViewerModal } from './media-viewer.modal';
import { MediaModal } from './media.modal';
import { MODAL_TYPE } from './modal-types';
import Close from '@/assets/icons/close.svg?react';
import { closeModal } from '@/redux/reducer/modal-slice';
import type { AppDispatch } from '@/redux/store';

export interface ModalDataMap {
  'media-upload': ComponentProps<typeof MediaModal>;
  'media-viewer': ComponentProps<typeof MediaViewerModal>;
}

interface Props {
  modalType: MODAL_TYPE | undefined;
  data?: ModalDataMap[keyof ModalDataMap];
}

export default function ModalLayout({ modalType, data }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  let modalElement;

  switch (modalType) {
    case MODAL_TYPE.MEDIA_UPLOAD:
      modalElement = <MediaModal />;
      break;
    case MODAL_TYPE.MEDIA_VIEWER:
      modalElement = <MediaViewerModal {...(data as ModalDataMap['media-viewer'])} />;
      break;

    default:
      return null;
  }

  return (
    <div className="gsapModal z-modal fixed inset-0 hidden items-center justify-center">
      <div className="px-5U py-3U relative rounded-[10px] border border-white/25 bg-black/70 backdrop-blur-[15px]">
        <Close className="top-2U right-2U size-3U absolute cursor-pointer" onClick={() => dispatch(closeModal())} />
        {modalElement}
      </div>
    </div>
  );
}
