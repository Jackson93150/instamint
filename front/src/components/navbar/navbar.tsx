import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SearchBar } from '../search/search-bar';
import BurgerMenu from '@/assets/icons/burger-menu.svg?react';
import Notification from '@/assets/icons/notification.svg?react';
import ProfilePicture from '@/assets/icons/pp.svg?react';
import LogoSmall from '@/assets/logo-small.png';
import Logo from '@/assets/logo.png';
import { SidebarContext } from '@/context';
import { SearchOutput } from '@/interfaces';
import { searchMinters, connectedMinter } from '@/services';
import { Button } from '@/ui';

export const Navbar = () => {
  const navigate = useNavigate();
  const sidebarContext = useContext(SidebarContext);
  const [minters, setMinters] = useState<SearchOutput[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await connectedMinter();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      if (minters.length > 0) {
        setMinters([]);
      }
    } else {
      const result = await searchMinters(query);
      if (JSON.stringify(result) !== JSON.stringify(minters)) {
        setMinters(result);
      }
    }
  };

  return (
    <div className="z-navbar px-5U py-2U desktop-s:gap-[150px] tablet:gap-[50px] fixed left-0 top-0 flex w-screen items-center gap-[16px] bg-transparent">
      <img
        className="h-10U tablet:flex hidden cursor-pointer"
        src={Logo}
        alt="logo"
        onClick={() => {
          navigate('/');
        }}
      />
      <img
        className="h-10U tablet:hidden flex cursor-pointer"
        src={LogoSmall}
        alt="logo"
        onClick={() => {
          navigate('/');
        }}
      />
      <div className="flex w-full flex-1">
        {isAuthenticated && <SearchBar onSearch={handleSearch} minters={minters} />}
      </div>
      <div className="gap-1U flex items-center">
        {sidebarContext.minterData ? (
          <div className="gap-5U flex items-center justify-center">
            <Notification className="tablet:flex hidden" />
            {sidebarContext.minterData && sidebarContext.minterData.pictureUrl ? (
              <img
                className="h-10U tablet:flex hidden cursor-pointer rounded-full"
                src={sidebarContext.minterData.pictureUrl}
                alt="logo"
                onClick={() => {
                  navigate('/me');
                }}
              />
            ) : (
              <ProfilePicture
                className="tablet:flex hidden cursor-pointer"
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
