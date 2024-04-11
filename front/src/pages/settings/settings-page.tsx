import { ChangeLinkComponent } from '@/components/settings/change-unique-link';
import { DeleteMinterComponent } from '@/components/settings/delete-minter';

export const SettingsPage = () => {
  return (
    <div className="flex h-fit min-h-screen w-full flex-col items-center bg-green-100 p-4 text-white sm:p-8">
      <div className="flex h-fit w-[70vw] flex-col rounded-[20px] bg-gray-400 p-4 shadow-xl">
        <ChangeLinkComponent />
        <br />
        <DeleteMinterComponent />
      </div>
    </div>
  );
};
