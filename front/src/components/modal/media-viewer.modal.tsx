import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { NftCardScene } from '../threejs/nft-card';
import Close from '@/assets/icons/close.svg?react';
import { gsapOpacityAnimation, gsapTranslateYAnimation } from '@/utils';

interface Props {
  picture: string;
}

gsap.registerPlugin(useGSAP);

export const MediaViewerModal = ({ picture }: Props) => {
  const { contextSafe } = useGSAP();

  const handleClick = contextSafe(() => {
    gsapOpacityAnimation('.gsapModalBlur', 0, 'none');
    gsapTranslateYAnimation('.gsapMediaViewerModal', '100vh', 'none');
  });

  return (
    <div className="gsapMediaViewerModal z-modal absolute hidden items-center justify-center">
      <div className="p-5U relative flex w-[80vw] rounded-[10px] border border-white/25 bg-white/10 backdrop-blur-[15px]">
        <Close className="top-2U right-2U size-3U absolute cursor-pointer" onClick={handleClick} />
        <div className="h-[70vh] w-[40vw]">
          <NftCardScene picture={picture} />
        </div>
      </div>
    </div>
  );
};
