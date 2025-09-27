import { useEffect, useState } from 'react';

const useIsMobile = (breakpoint) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => { setIsMobile(window.innerWidth <= breakpoint) }, []);

  useEffect(
    () => {
      const setWidth = () => {
        const _isMobile = window.innerWidth <= breakpoint;
        _isMobile !== isMobile && setIsMobile(_isMobile);
      };

      window.addEventListener('resize', setWidth);
      return () => window.removeEventListener('resize', setWidth);
    },
    [isMobile, setIsMobile],
  );

  return isMobile;
};

export default useIsMobile;