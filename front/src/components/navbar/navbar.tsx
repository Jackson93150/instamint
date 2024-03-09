import Logo from '@/assets/logo.png';
import { Button } from '@/ui';

export const Navbar = () => {
  return (
    <div className="px-5U py-2U fixed left-0 top-0 flex w-screen justify-between bg-green-100">
      <img className="h-10U" src={Logo} alt="logo" />
      <div className="gap-1U flex items-center">
        <Button size="small" color="green" content="Sign In" />
        <Button size="small" color="transparent" content="Sign Up" />
      </div>
    </div>
  );
};
