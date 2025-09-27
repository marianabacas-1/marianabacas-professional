import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const useScrollTrigger = () => {
  const sectionRef = useRef(null);
  const childrenSelector = gsap.utils.selector(sectionRef);
  let tl = null;

  const createTL = (props) => {
    return (tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: '20% 50%',
        flag: true,
        ...props,
      },
    }));
  };
  return [sectionRef, childrenSelector, createTL];
};

export default useScrollTrigger;
