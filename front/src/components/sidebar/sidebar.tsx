import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { useContext } from 'react';

import { NavItem } from './nav-item';
import Close from '@/assets/icons/close.svg?react';
import { SidebarContext } from '@/context';
import { Button } from '@/ui';

export const Sidebar = () => {
  const sidebarContext = useContext(SidebarContext);
  const minterData = sidebarContext.minterData;

  return (
    <div className="z-sidebar py-10U px-5U gap-10U mobile:w-[450px] fixed right-0 top-0 flex h-screen w-full flex-col bg-green-100">
      <Close
        className="top-5U right-5U size-5U absolute cursor-pointer"
        onClick={() => {
          sidebarContext.toggleSidebar();
        }}
      />
      <div className="gap-3U flex h-fit w-full">
        <div className="size-13U rounded-full bg-green-400" />
        <div className="flex flex-col justify-center">
          <span className="text-subheading text-white">{minterData?.username}</span>
          <span className="text-body text-white/50">{minterData?.email}</span>
        </div>
      </div>
      <div className="flex size-full flex-col justify-between">
        <div className="flex flex-col">
          <NavItem icon={<HomeIcon fontSize="large" />} title="Home" path="/" />
          <NavItem icon={<PersonIcon fontSize="large" />} title="Profile" path="/profile" />
          <NavItem icon={<GroupsIcon fontSize="large" />} title="Tea Bag" path="/minter/tea-bag" />
          <NavItem icon={<ChatIcon fontSize="large" />} title="Message" path="/messages" />
          <NavItem icon={<SettingsIcon fontSize="large" />} title="Settings" path="/settings" />
        </div>
        <div className="gap-5U flex h-fit w-full flex-col items-center justify-center">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
          <Button color="green" content="Connect Wallet" fullWidth />
        </div>
      </div>
    </div>
  );
};
