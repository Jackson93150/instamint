import { useNavigate } from 'react-router-dom';

import { useAlert } from '@/context';
import { deleteMinter } from '@/services';
import { Button } from '@/ui';

const DeleteMinterComponent = () => {
  const navigate = useNavigate();
  const { toggleAlert } = useAlert();

  const handleDeleteMinter = async () => {
    try {
      await deleteMinter();
      toggleAlert({
        alertType: 'success',
        content: 'Your account has been successfully deleted.',
      });
      navigate('/login');
    } catch (error) {
      toggleAlert({
        alertType: 'error',
        content: 'There was an error deleting your account. Please try again.',
      });
    }
  };

  return (
    <div className="z-10 flex w-full flex-col">
      <div className="flex w-full flex-col items-center justify-between rounded-lg bg-gray-400 p-4 shadow-xl sm:flex-row sm:p-6">
        <h4 className="text-md mb-4 text-center font-semibold md:mb-0">
          Pay attention! Deleting your account cannot be undone.
        </h4>
        <Button size="large" color="red" content="Delete Account" onClick={handleDeleteMinter} />
      </div>
    </div>
  );
};

export { DeleteMinterComponent };
