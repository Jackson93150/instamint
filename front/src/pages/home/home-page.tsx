import { HomeHeaderSection, HomeInfoSection, HomeProfileSection } from '@/components';

export const HomePage = () => {
  return (
    <div className="bg-green-bg-gradient flex h-fit w-full flex-col">
      <HomeHeaderSection />
      <HomeInfoSection />
      <HomeProfileSection />
    </div>
  );
};
