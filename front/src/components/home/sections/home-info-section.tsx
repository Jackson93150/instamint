import { useGSAP } from '@gsap/react';
import cx from 'classnames';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

import Emoji from '@/assets/icons/emoji.png';
import Heart from '@/assets/icons/heart.png';
import Thumbs from '@/assets/icons/thumbs.png';
import Nft from '@/assets/mock/info-nft.png';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const HomeInfoSection = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.gsapNFT',
        {
          y: '-100%',
          opacity: 0,
          rotate: -50,
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
          rotate: 0,
          scrollTrigger: {
            trigger: container.current,
            start: 'top 50%',
            end: 'top 0%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        '.gsapEmoji',
        {
          y: '-500px',
          opacity: 0,
          rotate: -120,
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
          rotate: 0,
          scrollTrigger: {
            trigger: container.current,
            start: 'top 40%',
            end: 'bottom 100%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        '.gsapText',
        {
          y: '-100%',
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
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="gap-10U tablet:flex-row tablet:justify-between tablet:px-[10vw] flex h-screen w-full flex-col items-center justify-center px-[5vw]"
    >
      <div className="relative size-fit">
        <img
          className={cx('gsapNFT', 'tablet-l:size-[380px] mobile:size-[300px] size-[70vw] rotate-6 rounded-[100px]')}
          src={Nft}
          alt="NFT"
        />
        <div
          className={cx(
            'gsapEmoji',
            'h-15U w-15U absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-white'
          )}
        >
          <img className="h-10U w-10U" src={Emoji} />
        </div>
        <div
          className={cx(
            'gsapEmoji',
            'h-15U w-15U absolute right-0 top-0 flex rotate-6 items-center justify-center rounded-[15px] bg-white'
          )}
        >
          <img className="h-10U w-10U" src={Heart} />
        </div>
        <div
          className={cx(
            'gsapEmoji',
            'h-15U w-15U absolute left-[-5%] top-[30%] flex rotate-[-15deg] items-center justify-center rounded-[15px] bg-white'
          )}
        >
          <img className="h-10U w-10U" src={Thumbs} />
        </div>
      </div>
      <div
        className={cx('gsapText', 'gap-5U tablet:w-[45vw] tablet:min-w-[30vw] flex h-fit w-full flex-col text-center')}
      >
        <span className="bg-green-gradient pb-2U tablet-l:text-[50px] mobile:text-[40px] bg-clip-text text-[30px] font-bold leading-none text-transparent">
          Explore the Future Of
          <br /> Digital Expression
        </span>
        <p className="tablet-l:text-subheading text-body font-normal leading-none text-white">
          Introducing our platform, a fusion of contemporary social interaction and advanced Web3 tech. Designed for
          seamless NFT sharing. Dive into a realm where discovering, sharing, and connecting with NFT is effortless.
          Welcome to the future of digital expression.
        </p>
      </div>
    </div>
  );
};
