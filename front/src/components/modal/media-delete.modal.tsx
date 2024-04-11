import { useAlert, useModal } from '@/context';
import { deleteContent } from '@/services';
import { Button } from '@/ui';

interface Props {
  name: string;
  refreshData?: React.Dispatch<React.SetStateAction<string>>;
}

export const MediaDeleteModal = ({ name, refreshData }: Props) => {
  const { toggleModal } = useAlert();
  const { closeModal } = useModal();
  const handleSubmit = async () => {
    try {
      await deleteContent(name);
      toggleModal({
        alertType: 'success',
        content: 'Your content as been deleted.',
      });
      refreshData && refreshData(name);
      closeModal();
    } catch (error) {
      toggleModal({
        alertType: 'error',
        content: error as string,
      });
      closeModal();
    }
  };
  return (
    <div className="p-3U gap-4U relative flex size-fit flex-col items-center justify-center">
      <span className="text-body text-white">Do you really want to delete your content ?</span>
      <Button color="green" size="large" content="Delete" onClick={handleSubmit} />
    </div>
  );
};
