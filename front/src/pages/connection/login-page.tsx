import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EyeHide from '@/assets/icons/eye-hide.svg?react';
import Eye from '@/assets/icons/eye.svg?react';
import { BubbleParticle } from '@/components';
import { login } from '@/services';
import { Button } from '@/ui';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isError, setIsError] = useState(false);
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
      navigate('/');
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-green-100">
      <BubbleParticle />
      <div className="py-6U px-8U mobile:py-8U mobile:px-10U mobile:w-fit z-10 flex w-[90%] flex-col rounded-[8px] bg-white">
        <p className="text-heading mobile:text-title text-center">Login</p>
        <div className="gap-4U mt-8U flex flex-col">
          <div className="gap-1U flex w-full flex-col">
            <label className="text-body text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              className="border-b-1/4U py-1U border-black outline-none focus:border-green-300"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="gap-1U flex w-full flex-col">
            <label className="text-body text-gray-400">Password</label>
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="border-b-1/4U py-1U w-full border-black outline-none focus:border-green-300"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {showPassword ? (
                <Eye className="absolute right-0 top-0 cursor-pointer" onClick={() => setShowPassword(false)} />
              ) : (
                <EyeHide className="absolute right-0 top-0 cursor-pointer" onClick={() => setShowPassword(true)} />
              )}
            </div>
          </div>

          {isError && <span className="text-small text-red-500">Email or Password is incorrect</span>}

          <div className="mt-8U flex items-center justify-center">
            <Button color="green" content="Sign Up" onClick={handleSubmit} />
          </div>

          <div className="gap-1U mt-8U flex w-full justify-center">
            <span className="text-body text-gray-400">Don&apos;t have an account?</span>
            <span
              className="text-body cursor-pointer font-bold text-black"
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
