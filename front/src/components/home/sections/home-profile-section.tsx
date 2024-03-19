import { useGSAP } from '@gsap/react';
import cx from 'classnames';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useState, useRef } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Heart from '@/assets/icons/heart.png';
import { FEATURED_PROFILE } from '@/constants';
import { formatThousand } from '@/utils';

import 'swiper/css';
import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';
gsap.registerPlugin(useGSAP, ScrollTrigger);

export const HomeProfileSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const [activeMinter, setActiveMinter] = useState<{
    picture: string;
    minter: string;
  }>();
  const [swiperIndex, setSwiperIndex] = useState<number>();

  useGSAP(
    () => {
      gsap.fromTo(
        '.gsapTitle',
        {
          y: '-200%',
          opacity: 0,
          scrollTrigger: {
            trigger: container.current,
            start: 'bottom 0%',
            end: 'bottom 0%',
            scrub: true,
          },
        },
        {
          y: '0%',
          opacity: 1,
          scrollTrigger: {
            trigger: container.current,
            start: 'top 40%',
            end: 'bottom 100%',
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        '.gsapSwiper',
        {
          y: '200%',
          opacity: 0,
          scrollTrigger: {
            trigger: container.current,
            start: 'bottom 0%',
            end: 'bottom 0%',
            scrub: true,
          },
        },
        {
          y: '0%',
          opacity: 1,
          scrollTrigger: {
            trigger: container.current,
            start: 'top 40%',
            end: 'bottom 100%',
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        '.gsapGlow',
        {
          opacity: 0,
          scrollTrigger: {
            trigger: container.current,
            start: 'bottom 0%',
            end: 'bottom 0%',
            scrub: true,
          },
        },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: container.current,
            start: 'top 40%',
            end: 'bottom 100%',
            scrub: true,
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <div ref={container} className="py-10U relative flex h-screen w-full flex-col items-center justify-center">
      <span
        className={cx(
          'gsapTitle',
          'mobile:top-15U top-12U bg-green-gradient tablet-l:text-[60px] mobile:text-[50px] absolute bg-clip-text text-center text-[40px] font-bold leading-none text-transparent'
        )}
      >
        Featured Profile
      </span>
      <div className={cx('gsapSwiper', 'w-full z-10 mt-[75px]')}>
        <Swiper
          id="home-profile-swiper"
          spaceBetween={20}
          slidesPerView="auto"
          speed={1000}
          modules={[Pagination]}
          loopAdditionalSlides={2}
          pagination
          navigation
          centeredSlides
          loop
          onSlideChange={(swiperCore) => {
            const { realIndex } = swiperCore;
            setSwiperIndex(realIndex);
            setActiveMinter(FEATURED_PROFILE[realIndex]);
          }}
        >
          {FEATURED_PROFILE.map((nft, key) => (
            <>
              <SwiperSlide key={key} className="relative">
                {key === swiperIndex ? (
                  <div className="p-2U gap-2U flex h-full flex-col items-center justify-between rounded-[20px] border border-white/40 bg-black/20 backdrop-blur-[25px]">
                    <img
                      className="tablet:w-[350px] mobile:w-[280px] h-full w-[200px] rounded-[20px] object-cover"
                      src={nft.picture}
                      alt="active slide"
                    />
                    <>
                      <div className="px-3U py-1.5U absolute left-[4%] top-[3%] rounded-full border border-white/40 bg-black/30 text-white backdrop-blur-[25px]">
                        #{nft?.rank}
                      </div>
                      <div className="p-2U gap-2U absolute bottom-[3.5%] left-[5%] flex h-fit w-[90%] flex-col items-center justify-around rounded-[20px] border border-white/40 bg-black/10 backdrop-blur-[25px]">
                        <span className="bg-gray-gradient mobile:text-[25px] text-body w-full bg-clip-text text-center leading-none text-transparent/10">
                          {activeMinter?.minter}
                        </span>
                        <div className="flex w-full items-center justify-around">
                          <div className="flex flex-col items-center justify-center">
                            <span className="bg-gray-gradient text-body mobile:text-subheading bg-clip-text font-bold text-transparent">
                              NFT
                            </span>
                            <span className="text-small mobile:text-body text-white">{formatThousand(nft.nft)}</span>
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <span className="bg-gray-gradient text-body mobile:text-subheading bg-clip-text font-bold text-transparent">
                              Subscriber
                            </span>
                            <span className="text-small mobile:text-body text-white">
                              {formatThousand(nft.subscriber)}
                            </span>
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <span className="bg-gray-gradient text-body mobile:text-subheading bg-clip-text font-bold text-transparent">
                              Like
                            </span>
                            <div className="flex items-center justify-center">
                              <span className="text-small mobile:text-body text-white">{formatThousand(nft.nft)}</span>
                              <img className="size-3U" src={Heart} alt="heart" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                ) : (
                  <img
                    className="tablet:w-[350px] mobile:w-[280px] h-full w-[200px] rounded-[10px] object-cover"
                    src={nft.picture}
                    alt="slide"
                  />
                )}
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
      <img
        className={cx(
          'gsapGlow',
          'mobile:size-[300px] mobile:blur-[150px] absolute top-[calc(50vh-100px)] size-[180px] object-cover blur-[120px] brightness-200'
        )}
        src={activeMinter?.picture}
        alt="slide"
      />
    </div>
  );
};
