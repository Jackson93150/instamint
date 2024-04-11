import { ImageList, ImageListItem, useMediaQuery } from '@mui/material';

import Music from '@/assets/mock/music.jpeg';
import { useModal } from '@/context';
import { DraftInterface } from '@/interfaces';

interface Props {
  isContent: boolean;
  minterDraft: DraftInterface[] | [];
}

export const DraftContentView = ({ isContent, minterDraft }: Props) => {
  const isMobile = useMediaQuery('(max-width:480px)');
  const { toggleModal } = useModal();

  const handleVideoHover = (video: HTMLVideoElement) => {
    video.play();
  };

  const handleVideoLeave = (video: HTMLVideoElement) => {
    video.pause();
    video.currentTime = 0;
  };

  const handleClick = (url: string, mediaType: 'video' | 'image' | 'audio', content: number, data: DraftInterface) => {
    toggleModal({
      modalType: 'media-viewer',
      data: { url, mediaType, content, type: 'draft', data },
    });
  };

  return (
    <>
      {isContent ? (
        <ImageList variant="masonry" cols={isMobile ? 2 : 4} gap={8}>
          {minterDraft.map((item) => (
            <ImageListItem key={item.content.url} className="group cursor-pointer">
              {item.content.type.startsWith('audio/') ? (
                <img
                  src={Music}
                  alt={item.content.url}
                  loading="lazy"
                  onClick={() => handleClick(item.content.url, 'audio', item.id, item)}
                />
              ) : item.content.type.startsWith('video/') ? (
                <video
                  preload="metadata"
                  onMouseEnter={(e) => handleVideoHover(e.currentTarget)}
                  onMouseLeave={(e) => handleVideoLeave(e.currentTarget)}
                  onClick={() => handleClick(item.content.url, 'video', item.id, item)}
                >
                  <source src={`${item.content.url}`} type={item.content.type} />
                </video>
              ) : (
                <img
                  src={`${item.content.url}`}
                  alt={item.content.url}
                  loading="lazy"
                  onClick={() => handleClick(item.content.url, 'image', item.id, item)}
                />
              )}
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <div className="flex size-full items-center justify-center">
          <span className="text-title text-center text-white/50">You have no draft</span>
        </div>
      )}
    </>
  );
};
