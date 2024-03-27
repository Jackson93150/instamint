import LinearProgress from '@mui/material/LinearProgress';

import Logo from '@/assets/logo-title.png';

export const Loading = () => {
  return (
    <div className="z-sidebar bg-green-gradient fixed left-0 top-0 flex h-screen w-full items-center justify-center">
      <div className="absolute flex size-fit flex-col items-center justify-center">
        <img className="mobile:w-[50vw] h-auto w-[90vw]" src={Logo} alt="logo" />
        <LinearProgress color="success" className="mobile:w-[45vw] h-auto w-[80vw]" />
      </div>
    </div>
  );
};
