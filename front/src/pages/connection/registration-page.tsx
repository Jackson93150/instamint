import { BubbleParticle } from '@/components';

export const RegistrationPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-green-100">
      <BubbleParticle />
      <div className="p-1.5U flex bg-white">
        <p className="text-title">Registration</p>
      </div>
    </div>
  );
};
