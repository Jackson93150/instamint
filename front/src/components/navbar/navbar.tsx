import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import BurgerMenu from '@/assets/icons/burger-menu.svg?react';
import Notification from '@/assets/icons/notification.svg?react';
import ProfilePicture from '@/assets/icons/pp.svg?react';
import Logo from '@/assets/logo.png';
import { SidebarContext } from '@/context';
import { Button } from '@/ui';

export const Navbar = () => {
  const navigate = useNavigate();
  const sidebarContext = useContext(SidebarContext);

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
        {sidebarContext.minterData ? (
          <div className="gap-5U flex items-center justify-center">
            <Notification />
            {sidebarContext.minterData && sidebarContext.minterData.pictureUrl ? (
              <img
                className="h-10U cursor-pointer rounded-full"
                src={sidebarContext.minterData.pictureUrl}
                alt="logo"
                onClick={() => {
                  navigate('/me');
                }}
              />
            ) : (
              <ProfilePicture
                className="cursor-pointer"
                onClick={() => {
                  navigate('/me');
                }}
              />
            )}
            <BurgerMenu className="cursor-pointer" onClick={() => sidebarContext.toggleSidebar()} />
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};
