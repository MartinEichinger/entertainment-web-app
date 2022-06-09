import React, { useLayoutEffect } from 'react';
import useResizeObserver from './useResizeObserver';

function useMeasure<T extends HTMLElement>(target: React.RefObject<T> | T | null) {
  const [bounds, set] = React.useState<DOMRectReadOnly>(
    target && 'current' in target && target.current
      ? target.current.getBoundingClientRect()
      : new DOMRect()
  );
  /* const [size, setSize] = React.useState(() =>
    target && target.current
      ? target.current.getBoundingClientRect()
      : new DOMRect()
  )

  const [resizeCb] = useDebounce((entry) => {
    setSize(entry.contentRect)
  }, 250)

  useLayoutEffect(() => {
    let el = target && target.current ? target.current : null
    if (!!el) {
      setSize(el.getBoundingClientRect())  
    }
  }, [target])
 */
  useResizeObserver(target, (entry) => set(entry.target.getBoundingClientRect()));

  return bounds;
}

export default useMeasure;
