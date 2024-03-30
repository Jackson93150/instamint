import gsap from 'gsap';

export const gsapOpacityAnimation = (classname: string, opacity: number, display: string) => {
  gsap.to(classname, { opacity: opacity, display: display });
};

export const gsapTranslateYAnimation = (classname: string, y: string, display: string) => {
  gsap.to(classname, { y: y, display: display });
};
