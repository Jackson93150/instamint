import { cloneElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavItemProps {
  icon: JSX.Element;
  title: string;
  path: string;
}

export const NavItem = ({ icon, title, path }: NavItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === path;

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div
      className={`py-3U px-4U gap-5U ease group relative flex h-fit w-full cursor-pointer items-center rounded-[10px] transition-all duration-300 hover:bg-white ${isActive ? 'bg-white' : ''}`}
      onClick={handleClick}
    >
      {cloneElement(icon, { className: isActive ? 'text-green-300' : 'text-white group-hover:text-green-300' })}
      <span className={`text-body font-bold ${isActive ? 'text-green-300' : 'text-white group-hover:text-green-300'}`}>
        {title}
      </span>
    </div>
  );
};
