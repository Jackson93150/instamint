import cx from 'classnames';
import gsap from 'gsap';
import { useEffect } from 'react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { HomeNftCard } from '../card/home-nft-card';
import { PopularNftCard } from '../card/popular-nft-card';
import Nft1 from '@/assets/mock/nft1.png';
import Nft2 from '@/assets/mock/nft2.png';
import Nft3 from '@/assets/mock/nft3.png';
import { POPULAR_NFT } from '@/constants';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/swiper-bundle.css';

export const HomeHeaderSection = () => {
  useEffect(() => {
    gsap.to('.gsapHeaderText', {
      y: '0%',
      opacity: 1,
      duration: 1,
      delay: 0.3,
    });
    gsap.to('.gsapHeaderSwiper', {
      y: '0%',
      opacity: 1,
      duration: 1,
      delay: 0.3,
    });
    gsap.to('.gsapHeaderCard', {
      x: '0%',
      rotate: '0%',
      opacity: 1,
      duration: 1,
      delay: 0.3,
    });
  });
  return (
    <div className="tablet:items-center z-10 flex h-screen w-screen overflow-hidden px-[5%]">
      <div className="tablet:flex-row tablet:mt-[-10%] tablet:justify-between tablet:gap-5U mt-[60px] flex w-full flex-col items-center gap-[30vh]">
        <div
          className={cx(
            'gsapHeaderText',
            'tablet:items-start flex size-fit translate-y-[-100%] flex-col items-center opacity-0'
          )}
        >
          <span className="tablet:text-[96px] mobile:text-[8vw] text-[10vw] font-bold leading-none text-white">
            Welcome To
          </span>
          <span className="bg-green-gradient tablet:text-[96px] mobile:text-[12vw] bg-clip-text text-[15vw] font-bold leading-none text-transparent">
            Instamint
          </span>
          <p className="tablet:text-[24px] text-[2vw] text-white/40">
            The platform for minting, buying, and selling NFTs
          </p>
          <span className="tablet:size-[500px] absolute left-[-450px] top-[-400px] size-[300px] rounded-full bg-green-400 blur-[450px]" />
        </div>
        <div
          className={cx(
            'gsapHeaderCard',
            'mobile:w-[410px] relative flex h-fit w-[95vw] items-center translate-x-[200%] rotate-[50deg]'
          )}
        >
          <HomeNftCard picture={Nft1} size="large" classname="absolute z-[3]" />
          <HomeNftCard picture={Nft2} size="medium" classname="absolute ml-[15%] z-[2]" />
          <HomeNftCard picture={Nft3} size="small" classname="absolute ml-[50%] z-[1]" />
          <span className="mobile:flex absolute hidden size-[200px] translate-x-1/2 rounded-full bg-green-400 blur-[150px]" />
        </div>
      </div>
      <div className={cx('gsapHeaderSwiper', 'translate-y-[100%] opacity-0 bottom-5U absolute left-0 w-full')}>
        <Swiper
          id="home-header-swiper"
          modules={[Autoplay, FreeMode]}
          spaceBetween={30}
          slidesPerView="auto"
          speed={7500}
          autoplay={{ delay: 0 }}
          freeMode
          loop
        >
          {POPULAR_NFT.map((nft, key) => (
            <SwiperSlide key={key}>
              <PopularNftCard picture={nft.picture} name={nft.name} minter={nft.minter} like={nft.like} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
