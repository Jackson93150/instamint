import cx from 'classnames';
import React from 'react';

interface SwitchButtonProps {
  isOn: boolean;
  onColor?: string;
  offColor?: string;
  onToggle: () => void;
  className?: string;
}

export const SwitchButton = ({
  isOn,
  onColor = 'bg-green-400',
  offColor = 'bg-gray-200',
  onToggle,
  className,
}: SwitchButtonProps) => {
  const switchButtonClass = cx('relative inline-flex items-center cursor-pointer', className);

  const switchKnobClass = cx(
    'absolute transform transition-transform ease-in-out duration-200',
    {
      'translate-x-full': isOn,
      'translate-x-0': !isOn,
      [onColor]: isOn,
      [offColor]: !isOn,
    },
    'px-6U py-6U rounded-full shadow'
  );

  return (
    <div className={switchButtonClass} onClick={onToggle}>
      className={cx('px-12U py-6U rounded-full transition-colors duration-200 ease-in-out', { [offColor]: !isOn })}
      <div className={switchKnobClass} />
    </div>
  );
};
