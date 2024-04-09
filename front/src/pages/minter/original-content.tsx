import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';

import Music from '@/assets/mock/music.jpeg';
import { useModal } from '@/context';
import { ContentInterface } from '@/interfaces';
import { getContents } from '@/services';

export const OriginalContentPage = () => {
  const isMobile = useMediaQuery('(max-width:480px)');
  const [isContent, setIsContent] = useState(true);
  const [minterContents, setMinterContents] = useState<ContentInterface[]>([]);

  const { toggleModal } = useModal();

  useEffect(() => {
    const fetchContents = async () => {
      const contents = await getContents();
      if (Array.isArray(contents)) {
        setMinterContents(contents);
      } else {
        setIsContent(false);
      }
    };
    fetchContents();
  }, []);

  const handleClick = (url: string, mediaType: 'video' | 'image' | 'audio') => {
    toggleModal({
      modalType: 'media-viewer',
      data: { url, mediaType },
    });
  };

  return (
    <div className="bg-green-bg-gradient relative flex h-fit min-h-screen w-full items-center justify-center">
      <div className="p-5U gap-2U z-10 flex h-[85vh] w-[90vw] flex-col rounded-[15px] border border-white/25 bg-black/50 backdrop-blur-2xl">
        {isContent ? (
          <ImageList variant="masonry" cols={isMobile ? 2 : 4} gap={8}>
            {minterContents.map((item) => (
              <ImageListItem key={item.url} className="group cursor-pointer">
                {item.type.startsWith('audio/') ? (
                  <img src={Music} alt={item.url} loading="lazy" onClick={() => handleClick(item.url, 'audio')} />
                ) : item.type.startsWith('video/') ? (
                  <video preload="metadata" onClick={() => handleClick(item.url, 'video')}>
                    <source src={`${item.url}`} type={item.type} />
                  </video>
                ) : (
                  <img
                    src={`${item.url}`}
                    alt={item.url}
                    loading="lazy"
                    onClick={() => handleClick(item.url, 'image')}
                  />
                )}
                <div className="top-3U right-3U p-2U absolute hidden rounded-[10px] border border-white/25 bg-black/25 backdrop-blur-[10px] group-hover:flex">
                  <DeleteIcon
                    sx={{ color: '#e8e8e8' }}
                    onClick={() => {
                      toggleModal({
                        modalType: 'media-delete',
                        data: { name: item.name },
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
      </div>
      <div
        className="absolute bottom-[50px] z-10"
        onClick={() => {
          toggleModal({
            modalType: 'media-upload',
          });
        }}
      >
        <Fab size="large" color="success" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};
