import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Check from '@/assets/icons/check.svg?react';
import Cross from '@/assets/icons/cross.svg?react';
import { BubbleParticle } from '@/components';
import { confirm } from '@/services';

export const ConfirmationPage = () => {
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const [isError, setIsError] = useState(true);

  const checkLink = async (token: string) => {
    try {
      await confirm(token);
      setIsError(false);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    const token = queryParameters.get('token');
    if (token) {
      checkLink(token);
    }
  });

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-green-100">
      <BubbleParticle />
      <div className="py-6U px-8U mobile:py-8U mobile:px-10U mobile:w-fit z-10 flex w-[90%] flex-col rounded-[8px] bg-white">
        <p className="text-heading mobile:text-title text-center"> {t('confirmation-page.Title')} </p>
        <div className="gap-4U mt-8U flex flex-col">
          {isError ? (
            <div className="gap-5U flex flex-col items-center justify-center">
              <Cross className="mobile:size-[300px] size-[200px]" />
              <span className="text-small text-center text-red-500">
                {t('confirmation-page.ErrorAccountActivated')}
              </span>
            </div>
          ) : (
            <div className="gap-5U flex flex-col items-center justify-center">
              <Check className="mobile:size-[300px] size-[200px]" />
              <span className="text-small text-center text-green-300">
                {t('confirmation-page.SuccessAccountActivated')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
