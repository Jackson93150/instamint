import { t } from 'i18next';
import { ChangeEvent, memo, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EyeHide from '@/assets/icons/eye-hide.svg?react';
import Eye from '@/assets/icons/eye.svg?react';
import { Bubbles } from '@/components';
import { PASSWORD_REGEX } from '@/constants';
import { createMinter, sendVerificationMail } from '@/services';
import { Button } from '@/ui';

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    termsAccepted: false,
  });

  const [isValidate, setIsValidate] = useState(false);
  const [isError, setIsError] = useState(false);
  const [textError, setTextError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const handleSubmit = async () => {
    if (!formData.termsAccepted) {
      setTextError('Please accept the terms & conditions');
      setIsError(true);
      return;
    }

    setIsError(true);
    const minterData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    if (!PASSWORD_REGEX.test(formData.password)) {
      setTextError('Password must contain at least 8 characters and one number');
      return;
    }

    try {
      const minter = await createMinter(minterData);
      await sendVerificationMail({ email: minter.email });
      setIsValidate(true);
    } catch (error) {
      setTextError('Email is invalid or already taken');
    }
  };

  const MemoizedBubbles = useMemo(() => memo(Bubbles), []);

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-green-100">
      <MemoizedBubbles />
      <div className="py-6U px-8U mobile:py-8U mobile:px-10U mobile:w-fit z-10 flex w-[90%] flex-col rounded-[8px] border border-white/25 bg-white/10 backdrop-blur-[40px]">
        <p className="text-heading mobile:text-title text-center text-white">
          {t('registration-page.Title1')}
          <br />
          {t('registration-page.Title2')}
        </p>

        <div className="gap-4U mt-8U flex flex-col">
          <div className="gap-1U flex w-full flex-col">
            <label className="text-body text-white/50">{t('connection.Username')}</label>
            <input
              type="text"
              name="username"
              className="border-b-1/4U py-1U rounded-[4px] border-black outline-none focus:border-green-300"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="gap-1U flex w-full flex-col">
            <label className="text-body text-white/50">{t('connection.Email')}</label>
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
            <label className="text-body text-white/50">{t('connection.Password')}</label>
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

          {isError && !isValidate && <span className="text-small text-red-500">{textError}</span>}
          {isValidate && <span className="text-small text-green-300"> {t('registration-page.EmailSend')}</span>}

          <div className="mt-8U gap-4U mobile:flex-row flex flex-col items-center justify-between">
            <div className="gap-1U flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                className="cursor-pointer"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              <label className="text-small flex leading-none text-white">{t('connection.AcceptTerms')}</label>
            </div>
            <Button
              color={formData.termsAccepted ? 'green' : 'gray'}
              content={t('connection.SignUp')}
              onClick={handleSubmit}
            />
          </div>

          <div className="gap-1U mt-8U flex w-full justify-center">
            <span className="text-body text-white/50">{t('connection.OwnAccount')}</span>
            <span
              className="text-body cursor-pointer font-bold text-white"
              onClick={() => {
                navigate('/login');
              }}
            >
              {t('connection.SignIn')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
