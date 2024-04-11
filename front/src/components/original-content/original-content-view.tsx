import DeleteIcon from '@mui/icons-material/Delete';
import { ImageList, ImageListItem, useMediaQuery } from '@mui/material';

import Music from '@/assets/mock/music.jpeg';
import { useModal } from '@/context';
import { ContentInterface } from '@/interfaces';

interface Props {
  isContent: boolean;
  minterContents: ContentInterface[] | [];
  setIsRefresh: React.Dispatch<React.SetStateAction<string>>;
}

export const OriginalContentView = ({ isContent, minterContents, setIsRefresh }: Props) => {
  const isMobile = useMediaQuery('(max-width:480px)');
  const { toggleModal } = useModal();

  const handleVideoHover = (video: HTMLVideoElement) => {
    video.play();
  };

  const handleVideoLeave = (video: HTMLVideoElement) => {
    video.pause();
    video.currentTime = 0;
  };

  const handleClick = (url: string, mediaType: 'video' | 'image' | 'audio', content: number) => {
    toggleModal({
      modalType: 'media-viewer',
      data: { url, mediaType, content },
    });
  };

  return (
    <>
      {isContent ? (
        <ImageList variant="masonry" cols={isMobile ? 2 : 4} gap={8}>
          {minterContents.map((item) => (
            <ImageListItem key={item.url} className="group cursor-pointer">
              {item.type.startsWith('audio/') ? (
                <img
                  src={Music}
                  alt={item.url}
                  loading="lazy"
                  onClick={() => handleClick(item.url, 'audio', item.id)}
                />
              ) : item.type.startsWith('video/') ? (
                <video
                  preload="metadata"
                  onMouseEnter={(e) => handleVideoHover(e.currentTarget)}
                  onMouseLeave={(e) => handleVideoLeave(e.currentTarget)}
                  onClick={() => handleClick(item.url, 'video', item.id)}
                >
                  <source src={`${item.url}`} type={item.type} />
                </video>
              ) : (
                <img
                  src={`${item.url}`}
                  alt={item.url}
                  loading="lazy"
                  onClick={() => handleClick(item.url, 'image', item.id)}
                />
              )}
              <div className="top-3U right-3U p-2U absolute hidden rounded-[10px] border border-white/25 bg-black/25 backdrop-blur-[10px] group-hover:flex">
                <DeleteIcon
                  sx={{ color: '#e8e8e8' }}
                  onClick={() => {
                    toggleModal({
                      modalType: 'media-delete',
                      data: { name: item.name, refreshData: setIsRefresh },
                    });
                  }}
                />
              </div>
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <div className="flex size-full items-center justify-center">
          <span className="text-title text-center text-white/50">You have no content</span>
        </div>
      )}
    </>
  );
};
