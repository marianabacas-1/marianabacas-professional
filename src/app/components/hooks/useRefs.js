import { createRef, useEffect, useState } from 'react';
import times from 'lodash/times';

const useRefs = (length) => {
  const [elementRefs, setElementRefs] = useState([]);

  useEffect(
    () => {
      const refs = times(length, i => elementRefs[i] || createRef());
      setElementRefs(refs);
    },
    [length],
  );

  return elementRefs;
};

export default useRefs;