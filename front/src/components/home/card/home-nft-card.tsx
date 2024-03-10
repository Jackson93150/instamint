import cx from 'classnames';

interface Props {
  picture: string;
  size: 'large' | 'medium' | 'small';
  classname?: string;
}

export const HomeNftCard = ({ picture, size, classname }: Props) => {
  return (
    <div
      className={cx('p-2U size-fit rounded-[15px] border border-white/50 bg-white/10 backdrop-blur-[25px]', classname)}
    >
      <img
        className={cx(
          'rounded-[10px] object-cover',
          size === 'large' && 'h-[400px] w-[310px]',
          size === 'medium' && 'h-[365px] w-[285px]',
          size === 'small' && 'h-[335px] w-[260px]'
        )}
        src={picture}
        alt=""
      />
    </div>
  );
};
