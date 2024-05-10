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
  const switchButtonClass = cx('relative inline-flex items-center cursor-pointer rounded-full', className, 'w-14 h-7');

  const switchKnobClass = cx(
    'absolute transform transition-transform ease-in-out duration-200',
    {
      'translate-x-6': isOn,
      'translate-x-0': !isOn,
      [onColor]: isOn,
      [offColor]: !isOn,
    },
    'w-6 h-6 rounded-full shadow border border-gray-300',
    'left-1'
  );

  return (
    <div className="flex items-center rounded-full bg-gray-200 p-1 shadow">
      <div className={switchButtonClass} onClick={onToggle}>
        <div className={switchKnobClass} />
      </div>
    </div>
  );
};
