import { ChangeEvent, useState } from 'react';

import { BubbleParticle } from '@/components';
import { Button } from '@/ui';

export const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    termsAccepted: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: val,
    });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-green-100">
      <BubbleParticle />
      <div className="py-6U px-8U mobile:py-8U mobile:px-10U mobile:w-fit z-10 flex w-[90%] flex-col rounded-[8px] bg-white">
        <p className="text-heading mobile:text-title text-center">
          Welcome To Instamint!
          <br />
          Let’s Create An Account
        </p>

        <form className="gap-4U mt-8U flex flex-col">
          <div className="gap-1U flex w-full flex-col">
            <label className="text-body text-gray-400">Username</label>
            <input
              type="text"
              name="username"
              className="border-b-1/4U border-black outline-none focus:border-green-300"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="gap-1U flex w-full flex-col">
            <label className="text-body text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              className="border-b-1/4U border-black outline-none focus:border-green-300"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="gap-1U flex w-full flex-col">
            <label className="text-body text-gray-400">Password</label>
            <input
              type="password"
              name="password"
              className="border-b-1/4U border-black outline-none focus:border-green-300"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-8U gap-4U mobile:flex-row flex flex-col items-center justify-between">
            <div className="gap-1U flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                className="cursor-pointer"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              <label className="text-small flex leading-none">I accept the terms & conditions</label>
            </div>
            <Button color="green" content="Sign Up" />
          </div>

          <div className="gap-1U mt-8U flex w-full justify-center">
            <span className="text-body text-gray-400">Own an account?</span>
            <span className="text-body font-bold text-black">Sign In</span>
          </div>
        </form>
      </div>
    </div>
  );
};
