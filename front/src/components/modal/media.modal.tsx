import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinearProgress from '@mui/material/LinearProgress';
import { ChangeEvent, useContext, useState } from 'react';

import Close from '@/assets/icons/close.svg?react';
import { ModalContext } from '@/context';
import { uploadFileToFirebase, createContent, connectedMinter } from '@/services';
import { Button } from '@/ui';

const allowedFileTypes = ['image/png', 'image/webp', 'audio/ogg', 'audio/flac', 'video/mp4'];

export const MediaModal = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | ArrayBuffer | null>(null);
  const modalContext = useContext(ModalContext);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0];
    if (selectedFile && allowedFileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setName(selectedFile.name);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (file) {
      setIsLoading(true);
      const fileUrl = await uploadFileToFirebase(file);
      const minter = await connectedMinter();
      const content = {
        name: name,
        url: fileUrl,
        type: file.type,
        minter: minter.id,
      };
      await createContent(content);
      setIsLoading(false);
      modalContext.toggleModal();
    }
  };

  return (
    <div className="gsapMediaModal z-modal fixed inset-0 hidden items-center justify-center">
      <div className="px-5U py-3U relative rounded-[10px] border border-white/25 bg-black/70 backdrop-blur-[15px]">
        <Close
          className="top-2U right-2U size-3U absolute cursor-pointer"
          onClick={() => {
            modalContext.toggleModal();
          }}
        />
        <div className="flex flex-col gap-2">
          <label className="text-body text-white/50">Name</label>
          <input
            type="text"
            name="name"
            className="p-1U rounded-[4px] bg-white/90 outline-none backdrop-blur-[10px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
      </div>
    </div>
  );
};
