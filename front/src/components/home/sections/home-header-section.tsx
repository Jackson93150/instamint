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
  return (
    <div className="tablet:items-center flex h-screen w-screen overflow-hidden bg-green-100 px-[5%]">
      <div className="tablet:flex-row tablet:mt-[-10%] tablet:justify-between mobile:gap-5U mt-[5%] flex w-full flex-col items-center gap-[20vw]">
        <div className="tablet:items-start flex size-fit flex-col items-center">
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
        <div className="mobile:w-[410px] relative flex h-[420px] w-[95vw] items-center">
          <HomeNftCard picture={Nft1} size="large" classname="absolute z-[3]" />
          <HomeNftCard picture={Nft2} size="medium" classname="absolute ml-[15%] z-[2]" />
          <HomeNftCard picture={Nft3} size="small" classname="absolute ml-[50%] z-[1]" />
          <span className="absolute size-[200px] translate-x-[50%] rounded-full bg-green-400 blur-[150px]" />
        </div>
      </div>
      <div className="bottom-5U absolute left-0 w-full">
        <Swiper
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
