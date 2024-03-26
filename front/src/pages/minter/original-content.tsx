import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useContext, useEffect, useState } from 'react';

import Music from '@/assets/mock/music.jpeg';
import { ModalContext } from '@/context';
import { ContentInterface } from '@/interfaces';
import { getContents } from '@/services';

export const OriginalContentPage = () => {
  const modalContext = useContext(ModalContext);
  const isMobile = useMediaQuery('(max-width:480px)');
  const [isContent, setIsContent] = useState(true);
  const [minterContents, setMinterContents] = useState<ContentInterface[]>([]);

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

  return (
    <div className="bg-green-bg-gradient relative flex h-fit min-h-screen w-full items-center justify-center">
      <div className="p-5U gap-2U z-10 flex h-[85vh] w-[90vw] flex-col rounded-[15px] border border-white/25 bg-black/50 backdrop-blur-2xl">
        {isContent ? (
          <ImageList variant="masonry" cols={isMobile ? 2 : 4} gap={8}>
            {minterContents.map((item) => (
              <ImageListItem key={item.url} className="cursor-pointer">
                {item.type.startsWith('audio/') ? (
                  <img src={Music} alt={item.url} loading="lazy" />
                ) : item.type.startsWith('video/') ? (
                  <video preload="metadata">
                    <source src={`${item.url}`} type={item.type} />
                  </video>
                ) : (
                  <img src={`${item.url}`} alt={item.url} loading="lazy" />
                )}
              </ImageListItem>
            ))}
          </ImageList>
        ) : (
          <div className="flex size-full items-center justify-center">
            <span className="text-title text-center text-white/50">You have no content</span>
          </div>
        )}
      </div>
      <div className="absolute bottom-[50px] z-10" onClick={() => modalContext.toggleModal()}>
        <Fab size="large" color="success" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};
