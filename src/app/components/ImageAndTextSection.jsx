import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useScrollTrigger from './hooks/useScrollTrigger';
import gsap from 'gsap';
import useIsMobile from './hooks/useIsMobile';
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import PrimaryButton from './primaryButton';

export default function ImageAndTextSection({ icon, reverse, imgClass, className, title, src, link, href, width, height, text, priceDescription }) {
  const [sectionRef, childrenSelector] = useScrollTrigger();
  const isMobile = useIsMobile(768);
  const preScroll = useRef(null);
  const elemRef = useRef(null);
  const [scale, setScale] = useState(1.05);

  useLayoutEffect(() => {
    const botPos = (element) => element.getBoundingClientRect().bottom;
    const onScroll = () => {
      const divBotPos = botPos(elemRef.current);
      const scrollPos = preScroll.current > window.scrollY;
      preScroll.current = window.scrollY;
      if (scrollPos && divBotPos > window.innerHeight) {
        setScale(1);
        return;
      }
      if (divBotPos < window.innerHeight) {
        setScale(1.1);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!sectionRef || !sectionRef.current) return;
    const animateItems = childrenSelector('[data-animation="animate-item"]');
    const direction = (index) => {
      let number = isMobile ? 30 : 150;
      return index % 2 ? number : -number;
    };

    animateItems.forEach((card, index) => {
      gsap
        .timeline({ scrollTrigger: { trigger: card, start: '0% 100%' } })
        .fromTo(
          card,
          { x: direction(index), transformOrigin: '50% 20%', opacity: 0 },
          { duration: 0.40, x: 0, ease: 'Power4.InOut', opacity: 1 },
        );
    });
  }, [isMobile]);

  return (
    <div className={className ? className + "grid lg:grid-cols-2 gap-16 place-items-center" : "grid lg:grid-cols-2 gap-16 place-items-center text-gray-700"} ref={sectionRef}>
      <div className={reverse ? 'order-2 lg:order-none' : 'order-2'} data-animation="animate-item">
          {title && (<div className="text-3xl my-6 lg:my-10 lg:text-4xl text-gray-700">{title}</div>)}
          <div className="text-gray-700 text-lg lg:text-xl">
            {text && (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
            )}
            {(link && icon) && (<p className="my-2 lg:my-6">
              <PrimaryButton

                className="w-full lg:w-auto"
                >
                    <Link
                        href={href}
                    >
                        {link}
                    </Link>
                </PrimaryButton>
              </p>)}
          </div>
          {priceDescription && (<div className="my-6 lg:w-5/6 rounded-3xl bg-green-550 px-4 lg:px-8 py-6">{priceDescription}</div>)}
      </div>
      <div ref={elemRef}
        style={{ overflow: "hidden", maxHeight: '650px', maxWidth: '650px' }} data-animation="animate-item" className={reverse ? 'order-2 rounded-xl shadow w-auto justify-self-end' : 'justify-self-start shadow rounded-xl order-2 lg:order-none w-auto'}>
        <img className="rounded-xl w-full" alt="Image and text section" src={src} style={{
            transition: "transform 1000ms ease-in-out",
            transform: `scale(${scale})`
          }} width={width} height={height}/>
      </div>
    </div>
  )
}
