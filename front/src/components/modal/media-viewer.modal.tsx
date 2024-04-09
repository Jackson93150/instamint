import { NftCardScene } from '../threejs/nft-card';

interface Props {
  url: string;
  mediaType: 'video' | 'image' | 'audio';
}

export const MediaViewerModal = ({ url, mediaType }: Props) => {
  return (
    <div className="relative flex h-[70vh] w-[40vw]">
      <NftCardScene url={url} mediaType={mediaType} />
      {mediaType === 'audio' && (
        <div className="p-2U bottom-5U absolute left-[5%] w-[90%] rounded-[10px] bg-white/30 backdrop-blur-[15px]">
          <audio controls className="w-full">
            <source src={url} type="audio/ogg" />
          </audio>
        </div>
      )}
    </div>
  );
};
