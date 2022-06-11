import React from 'react';
import useResizeObserver from './useResizeObserver';

function useMeasure<T extends HTMLElement>(target: React.RefObject<T> | T | null) {
  const [bounds, set] = React.useState<DOMRectReadOnly>(
    target && 'current' in target && target.current
      ? target.current.getBoundingClientRect()
      : new DOMRect()
  );

  useResizeObserver(target, (entry) => set(entry.target.getBoundingClientRect()));

  return bounds;
}

export default useMeasure;
