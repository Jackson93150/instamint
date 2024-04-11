import { useNavigate } from 'react-router-dom';

import { useAlert } from '@/context';
import { deleteMinter } from '@/services';
import { Button } from '@/ui';

const DeleteMinterComponent = () => {
  const navigate = useNavigate();
  const { toggleModal } = useAlert();

  const handleDeleteMinter = async () => {
    try {
      await deleteMinter();
      toggleModal({
        alertType: 'success',
        content: 'Your account has been successfully deleted.',
      });
      navigate('/login');
    } catch (error) {
      toggleModal({
        alertType: 'error',
        content: 'There was an error deleting your account. Please try again.',
      });
    }
  };

  return (
    <div className="z-10 flex w-full flex-col">
      <div className="flex w-full items-center justify-between rounded-lg bg-gray-400 p-4 shadow-xl sm:p-6">
        <p className="mb-4 text-center text-lg">Pay attention ! Deleting your account cannot be undone.</p>
        <div className="flex w-2/5 items-center justify-center">
          <Button size="large" color="red" content="Delete Account" onClick={handleDeleteMinter} />
        </div>
      </div>
    </div>
  );
};

export { DeleteMinterComponent };
