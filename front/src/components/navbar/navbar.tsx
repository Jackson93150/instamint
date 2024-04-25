import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SearchBar } from '../search/search-bar';
import BurgerMenu from '@/assets/icons/burger-menu.svg?react';
import Notification from '@/assets/icons/notification.svg?react';
import ProfilePicture from '@/assets/icons/pp.svg?react';
import Logo from '@/assets/logo.png';
import { SidebarContext } from '@/context';
import { MinterInterface } from '@/interfaces';
import { searchMinters } from '@/services';
import { Button } from '@/ui';

export const Navbar = () => {
  const navigate = useNavigate();
  const sidebarContext = useContext(SidebarContext);
  const [minters, setMinters] = useState<MinterInterface[]>([]);

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
  //pour rendre les minters en cas de chngement de valeur seulement
  useEffect(() => {}, [minters]);

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
      <div className="flex w-3/5 flex-1 justify-center px-1 sm:px-6 md:px-8">
        <SearchBar onSearch={handleSearch} />
      </div>
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
