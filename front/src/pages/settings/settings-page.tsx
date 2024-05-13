import { ChangeBioComponent } from '@/components/settings/change-bio';
import { ChangeLinkComponent } from '@/components/settings/change-unique-link';
import { ChangeUsernameComponent } from '@/components/settings/change-username';
import { DeleteMinterComponent } from '@/components/settings/delete-minter';

export const SettingsPage = () => {
  return (
    <div className="flex h-fit min-h-screen w-full flex-col items-center bg-green-100 p-4 text-white sm:p-8">
      <div className="flex h-fit w-[70vw] flex-col gap-y-4 rounded-[20px] bg-gray-400 p-4 shadow-xl">
        <ChangeUsernameComponent />
        <ChangeLinkComponent />
        <ChangeBioComponent />
        <DeleteMinterComponent />
      </div>
    </div>
  );
};
