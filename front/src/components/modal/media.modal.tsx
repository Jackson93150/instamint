import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinearProgress from '@mui/material/LinearProgress';
import { ChangeEvent, useState } from 'react';

import { useAlert, useModal } from '@/context';
import { createContent, connectedMinter, uploadFirebase, updatePicture, updateBanner } from '@/services';
import { Button } from '@/ui';

const allowedFileTypes = ['image/png', 'image/webp', 'audio/ogg', 'audio/flac', 'video/mp4'];

interface Props {
  refreshData?: React.Dispatch<React.SetStateAction<string>>;
  type?: 'all' | 'picture' | 'banner';
}

export const MediaModal = ({ refreshData, type = 'all' }: Props) => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | ArrayBuffer | null>(null);
  const { closeModal } = useModal();
  const { toggleAlert } = useAlert();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0];
    if (
      selectedFile &&
      (type === 'all' ? allowedFileTypes.includes(selectedFile.type) : selectedFile.type === 'image/png')
    ) {
      setFile(selectedFile);
      setName(selectedFile.name);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      toggleAlert({
        alertType: 'error',
        content: type === 'all' ? 'We only support png, webp, ogg, flac and mp4 files.' : 'We only support png.',
      });
    }
  };

  const handleSubmit = async () => {
    if (file && type === 'all') {
      setIsLoading(true);
      const fileUrl = await uploadFirebase(file);
      const minter = await connectedMinter();
      const content = {
        name: name,
        url: fileUrl,
        type: file.type,
        minter: minter.id,
      };
      try {
        await createContent(content);
        setIsLoading(false);
        toggleAlert({
          alertType: 'success',
          content: 'Your content as been uploaded.',
        });
        refreshData && refreshData(fileUrl);
        closeModal();
      } catch (error) {
        setIsLoading(false);
        toggleAlert({
          alertType: 'error',
          content: 'Your content is already uploaded on our platform.',
        });
        closeModal();
      }
    } else if (file) {
      setIsLoading(true);
      const fileUrl = await uploadFirebase(file);
      try {
        if (type === 'banner') {
          const content = {
            bannerUrl: fileUrl,
          };
          await updateBanner(content);
          setIsLoading(false);
          toggleAlert({
            alertType: 'success',
            content: 'Your banner as been uploaded.',
          });
        } else {
          const content = {
            pictureUrl: fileUrl,
          };
          await updatePicture(content);
          setIsLoading(false);
          toggleAlert({
            alertType: 'success',
            content: 'Your profile picture as been uploaded.',
          });
        }
        refreshData && refreshData(fileUrl);
        closeModal();
      } catch (error) {
        setIsLoading(false);
        toggleAlert({
          alertType: 'error',
          content: error as string,
        });
        closeModal();
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {type === 'all' && (
        <>
          <label className="text-body text-white/50">Name</label>
          <input
            type="text"
            name="name"
            className="p-1U rounded-[4px] bg-white/90 outline-none backdrop-blur-[10px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </>
      )}
      {isLoading && <LinearProgress color="success" />}
      <div className="gap-5U mobile:w-[40vw] flex w-[80vw] flex-col items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="border-1/2U flex h-[300px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[5px] border-dashed border-white/50 bg-white/25 hover:bg-white/50"
        >
          {file && previewURL ? (
            <div>
              {file.type.startsWith('image/') && (
                <img src={previewURL as string} alt="File Preview" className="h-[300px] w-auto object-contain" />
              )}
              {file.type.startsWith('video/') && (
                <video controls className="h-auto max-w-full">
                  <source src={previewURL as string} type={file.type} />
                </video>
              )}
              {file.type.startsWith('audio/') && (
                <audio controls className="h-15U max-w-full">
                  <source src={previewURL as string} type={file.type} />
                </audio>
              )}
            </div>
          ) : (
            <div className="py-5U flex flex-col items-center justify-center">
              <CloudUploadIcon fontSize="large" />
              <p className="mb-2U text-body text-center text-black/50">Click to upload or drag and drop</p>
            </div>
          )}
          <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
        </label>
        <Button content="Submit" color="green" onClick={handleSubmit} />
      </div>
    </div>
  );
};
