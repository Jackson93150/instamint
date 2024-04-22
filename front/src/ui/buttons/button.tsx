import cx from 'classnames';

interface Props {
  size?: 'small' | 'regular' | 'large';
  color: 'green' | 'gray' | 'transparent' | 'red';
  content?: string;
  className?: string;
  fullWidth?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

export const Button = ({ size = 'regular', color, content, className, fullWidth, onClick, isDisabled }: Props) => {
  const sizeClass = cx({
    'px-6U py-1.5U text-small': size === 'small',
    'px-8U py-2U text-body': size === 'regular',
    'px-8U py-3U text-body': size === 'large',
  });

  const getBgAndBorderClass = cx({
    'bg-gray-100/50 border-1/4U text-white cursor-default': color === 'gray' || isDisabled,
    'bg-green-300 border-1/4U border-green-400 text-white hover:border-green-200': color === 'green' && !isDisabled,
    'bg-transparent border-1/2U border-green-400 text-green-400 hover:border-green-300 hover:text-green-300':
      color === 'transparent' && !isDisabled,
    'bg-red-500 border-1/4U border-red-600 text-white hover:border-red-300': color === 'red' && !isDisabled,
  });

  const buttonClassName = cx(
    className,
    sizeClass,
    getBgAndBorderClass,
    isDisabled && 'pointer-events-none',
    fullWidth ? 'w-full' : 'w-fit',
    'relative flex items-center justify-center rounded-full transition duration-200 ease-in-out'
  );

  return (
    <button
      className={buttonClassName}
      onClick={() => {
        if (!isDisabled) onClick?.();
      }}
    >
      {content}
    </button>
  );
};
