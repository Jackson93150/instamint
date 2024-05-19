import { ChangeEvent, memo, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EyeHide from '@/assets/icons/eye-hide.svg?react';
import Eye from '@/assets/icons/eye.svg?react';
import { Bubbles } from '@/components';
import { connectedMinter, login, sendVerificationMail } from '@/services';
import { Button } from '@/ui';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isError, setIsError] = useState(false);
  const [isConfirm, setIsConfirm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const loginData = {
      email: formData.email,
      password: formData.password,
    };
    try {
      await login(loginData);
      const minter = await connectedMinter();
      if (minter.isValidate) {
        navigate('/');
        window.location.reload();
      } else {
        await sendVerificationMail({ email: minter.email });
        setIsConfirm(false);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  const MemoizedBubbles = useMemo(() => memo(Bubbles), []);

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-green-100">
      <MemoizedBubbles />
      <div className="py-6U px-8U mobile:py-8U mobile:px-10U mobile:w-fit z-10 flex w-[90%] flex-col rounded-[8px] border border-white/25 bg-white/10 backdrop-blur-2xl">
        <p className="text-heading mobile:text-title text-center text-white">Login</p>
        <div className="gap-4U mt-8U flex flex-col">
          <div className="gap-1U flex w-full flex-col">
            <label className="text-body text-white/50">Email</label>
            <input
              type="email"
              name="email"
              className="border-b-1/4U py-1U rounded-[4px] border-black outline-none focus:border-green-300"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="gap-1U flex w-full flex-col">
            <label className="text-body text-white/50">Password</label>
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="border-b-1/4U py-1U w-full rounded-[4px] border-black outline-none focus:border-green-300"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {showPassword ? (
                <Eye className="right-1U top-1U absolute cursor-pointer" onClick={() => setShowPassword(false)} />
              ) : (
                <EyeHide className="right-1U top-1U absolute cursor-pointer" onClick={() => setShowPassword(true)} />
              )}
            </div>
          </div>

          {isError && isConfirm && <span className="text-small text-red-500">Email or Password is incorrect</span>}
          {!isConfirm && (
            <span className="text-small word-break w-full text-center text-red-500">
              You didn&apos;t activate your account. <br /> An activation link will be send to your email{' '}
            </span>
          )}

          <div className="mt-8U flex items-center justify-center">
            <Button color="green" content="Sign In" onClick={handleSubmit} />
          </div>

          <div className="gap-1U mt-8U flex w-full justify-center">
            <span className="text-body text-white/50">Don&apos;t have an account?</span>
            <span
              className="text-body cursor-pointer font-bold text-white"
              onClick={() => {
                navigate('/register');
              }}
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
