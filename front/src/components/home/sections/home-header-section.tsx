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
    <div className="flex h-screen w-screen items-center bg-green-100 px-[5%]">
      <div className="mt-[-10%] flex w-full justify-between">
        <div className="flex size-fit flex-col">
          <span className="text-[96px] font-bold leading-none text-white">Welcome To</span>
          <span className="bg-green-gradient bg-clip-text text-[96px] font-bold leading-none text-transparent">
            Instamint
          </span>
          <p className="text-[24px] text-white/40">The platform for minting, buying, and selling NFTs</p>
          <span className="absolute left-[-450px] top-[-400px] size-[500px] rounded-full bg-green-400 blur-[450px]" />
        </div>
        <div className="relative flex w-[410px] items-center">
          <HomeNftCard picture={Nft1} size="large" classname="absolute z-[3]" />
          <HomeNftCard picture={Nft2} size="medium" classname="absolute translate-x-[22%] z-[2]" />
          <HomeNftCard picture={Nft3} size="small" classname="absolute translate-x-[50%] z-[1]" />
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
          {POPULAR_NFT.map((nft) => (
            <SwiperSlide key={nft.name}>
              <PopularNftCard picture={nft.picture} name={nft.name} minter={nft.minter} like={nft.like} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
