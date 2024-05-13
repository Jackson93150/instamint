import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { useAlert } from '@/context';
import { logout } from '@/services';

const LogoutButton = () => {
  const { toggleAlert } = useAlert();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      toggleAlert({
        alertType: 'error',
        content: 'Logout failed !',
      });
    }
  };
  return (
    <button
      className="w-full rounded-full bg-red-400 px-4 py-2 font-bold text-white hover:bg-red-500"
      onClick={handleLogout}
    >
      <LogoutOutlinedIcon /> Logout
    </button>
  );
};

export default LogoutButton;
