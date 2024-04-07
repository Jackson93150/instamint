import { NftCardScene } from '../threejs/nft-card';

interface Props {
  picture: string;
}

export const MediaViewerModal = ({ picture }: Props) => {
  return (
    <div className="flex h-[70vh] w-[40vw]">
      <NftCardScene picture={picture} />
    </div>
  );
};
