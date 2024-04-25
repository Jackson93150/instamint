import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import cx from 'classnames';
import { useEffect, useState } from 'react';

import { DraftContentView, OriginalContentView } from '@/components';
import { useModal } from '@/context';
import { ContentInterface, DraftInterface } from '@/interfaces';
import { getContents, getDrafts } from '@/services';

export const OriginalContentPage = () => {
  const [isContent, setIsContent] = useState(true);
  const [refresh, setIsRefresh] = useState('');
  const [contentType, setContentType] = useState<'content' | 'draft'>('content');
  const [minterContents, setMinterContents] = useState<ContentInterface[]>([]);
  const [draftContents, setDraftContents] = useState<DraftInterface[]>([]);

  const { toggleModal } = useModal();

  useEffect(() => {
    const fetchContents = async () => {
      const contents = await getContents();
      const draft = await getDrafts();
      if (Array.isArray(contents)) {
        setMinterContents(contents);
        setDraftContents(draft);
      } else {
        setIsContent(false);
      }
    };
    fetchContents();
  }, [refresh]);

  return (
    <div className="bg-page-gradient relative flex h-fit min-h-screen w-full items-center justify-center">
      <div className="p-5U gap-2U z-10 flex h-[85vh] w-[90vw] flex-col rounded-[15px] border border-white/25 bg-black/50 backdrop-blur-2xl">
        <div className="p-2U gap-2U flex h-fit w-full rounded-[10px] border border-white/25 bg-white/15 backdrop-blur-xl">
          <div
            className={cx(
              'p-2U ease flex h-fit w-full cursor-pointer justify-center rounded-[10px] border border-white/25 font-bold text-white backdrop-blur-xl transition-all duration-300 hover:bg-black',
              contentType === 'content' ? 'bg-black' : 'bg-black/70'
            )}
            onClick={() => {
              setContentType('content');
              setIsRefresh('content');
            }}
          >
            Content
          </div>
          <div
            className={cx(
              'p-2U ease flex h-fit w-full cursor-pointer justify-center rounded-[10px] border border-white/25 font-bold text-white backdrop-blur-xl transition-all duration-300 hover:bg-black',
              contentType === 'draft' ? 'bg-black' : 'bg-black/70'
            )}
            onClick={() => {
              setContentType('draft');
              setIsRefresh('draft');
            }}
          >
            Draft
          </div>
        </div>
        {contentType === 'content' ? (
          <OriginalContentView isContent={isContent} minterContents={minterContents} setIsRefresh={setIsRefresh} />
        ) : (
          <DraftContentView isContent={isContent} minterDraft={draftContents} />
        )}
      </div>
      <div
        className="absolute bottom-[50px] z-10"
        onClick={() => {
          toggleModal({
            modalType: 'media-upload',
            data: { refreshData: setIsRefresh },
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
