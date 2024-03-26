import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { firebase } from '@/firebase';

const storage = getStorage(firebase);

export const uploadFileToFirebase = async (file: File) => {
  const storageRef = ref(storage, `files/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};
