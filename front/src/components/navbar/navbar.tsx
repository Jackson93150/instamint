import { useNavigate } from 'react-router-dom';

import Logo from '@/assets/logo.png';
import { Button } from '@/ui';

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="z-navbar px-5U py-2U fixed left-0 top-0 flex w-screen justify-between bg-transparent">
      <img
        className="h-10U cursor-pointer"
        src={Logo}
        alt="logo"
        onClick={() => {
          navigate('/');
        }}
      />
      <div className="gap-1U flex items-center">
        <Button
          size="small"
          color="green"
          content="Sign In"
          onClick={() => {
            navigate('/login');
          }}
        />
        <Button
          size="small"
          color="transparent"
          content="Sign Up"
          className="mobile:flex hidden"
          onClick={() => {
            navigate('/register');
          }}
        />
      </div>
    </div>
  );
};
