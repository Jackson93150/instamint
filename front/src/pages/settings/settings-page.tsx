import { ChangeLinkComponent } from '@/components/settings/change-unique-link';

export const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-4 text-white sm:p-8">
      <header className="mb-12 rounded-lg bg-gray-800 p-4 shadow sm:mb-16">
        <h1 className="text-center text-3xl font-bold sm:text-4xl">Settings</h1>
      </header>
      <ChangeLinkComponent></ChangeLinkComponent>
    </div>
  );
};
