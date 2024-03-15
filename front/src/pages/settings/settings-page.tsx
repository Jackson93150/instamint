import { ChangeLinkComponent } from '@/components/settings/change-unique-link';

export const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-green-100 p-4 text-white sm:p-8">
      <header className="mb-12 rounded-lg bg-gray-400 p-4 shadow sm:mb-16">
        <h1 className="text-heading sm:text-title text-center">Settings</h1>
      </header>
      <ChangeLinkComponent />
    </div>
  );
};
