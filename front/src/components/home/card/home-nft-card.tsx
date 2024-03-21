import cx from 'classnames';
import Tilt from 'react-parallax-tilt';

interface Props {
  picture: string;
  size: 'large' | 'medium' | 'small';
  classname?: string;
}

export const HomeNftCard = ({ picture, size, classname }: Props) => {
  return (
    <Tilt
      perspective={3000}
      className={cx('p-2U size-fit rounded-[15px] border border-white/50 bg-white/10 backdrop-blur-[25px]', classname)}
    >
      <img
        className={cx(
          'rounded-[10px] object-cover',
          size === 'large' && 'h-[40vh] w-[75vw] tablet:h-[400px] mobile:h-[350px] mobile:w-[310px]',
          size === 'medium' && 'h-[37.5vh] w-[70vw] tablet:h-[365px] mobile:h-[320px] mobile:w-[290px]',
          size === 'small' && 'h-[35vh] w-[65vw] tablet:h-[335px] mobile:h-[280px] mobile:w-[260px]'
        )}
        src={picture}
        alt=""
      />
    </Tilt>
  );
};
