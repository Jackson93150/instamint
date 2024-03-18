import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import BurgerMenu from '@/assets/icons/burger-menu.svg?react';
import Notification from '@/assets/icons/notification.svg?react';
import ProfilePicture from '@/assets/icons/pp.svg?react';
import Logo from '@/assets/logo.png';
import { connectedMinter } from '@/services';
import { Button } from '@/ui';

export const Navbar = () => {
  const navigate = useNavigate();
  const [minterData, setMinterData] = useState(null);
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!minterData) {
      const fetchMinter = async () => {
        const result = await connectedMinter();
        setMinterData(result.data);
      };
      fetchMinter();
    }
  }, [location.pathname, minterData]);

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    window.location.reload();
  };

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
        {minterData ? (
          <div className="gap-5U flex items-center justify-center">
            <Notification />
            <ProfilePicture
              onClick={() => {
                navigate('/profile');
              }}
            />
            <BurgerMenu />
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
        <button
          className="mr-2 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
          onClick={() => switchLanguage('en')}
        >
          EN
        </button>
        <button
          className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
          onClick={() => switchLanguage('fr')}
        >
          FR
        </button>
      </div>
    </div>
  );
};
