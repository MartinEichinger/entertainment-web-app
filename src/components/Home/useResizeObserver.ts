import * as React from 'react';
import { ResizeObserver, ResizeObserverEntry } from '@juggle/resize-observer';

export type ResizeObserverEntryCallback = (entry: ResizeObserverEntry, observer: ResizeObserver) => void;

type CachedObserverFn = (target: HTMLElement, callback: ResizeObserverEntryCallback) => void;

interface CachedObserver {
  subscribe: CachedObserverFn;
  unsubscribe: CachedObserverFn;
}

const createCachedObserver: () => CachedObserver = () => {
  const callbacks: Map<HTMLElement, ResizeObserverEntryCallback[]> = new Map();
  const observer = new ResizeObserver((entries, observer) => {
    window.requestAnimationFrame(function () {
      entries.forEach((entry) => {
        const relatedCallbacks = callbacks.get(entry.target as HTMLElement);
        relatedCallbacks?.forEach((callback) => callback(entry, observer));
      });
    });
  });

  return {
    subscribe: (target, callback) => {
      observer.observe(target);
      callbacks.set(target, [...(callbacks.get(target) ?? []), callback]);
    },
    unsubscribe: (target, callback) => {
      observer.unobserve(target);
      const targetCallbacks = callbacks.get(target) ?? [];
      if (targetCallbacks.length === 1) {
        callbacks.delete(target);
      } else {
        const index = targetCallbacks.indexOf(callback);
        if (index !== -1) {
          targetCallbacks.splice(index, 1);
        }
        callbacks.set(target, targetCallbacks);
      }
    },
  };
};

let _cachedObserver: CachedObserver;

const getCachedObserver = () => {
  if (!_cachedObserver) {
    _cachedObserver = createCachedObserver();
  }
  return _cachedObserver;
};

/**
 * @description Typed hook to use ResizeObserver [MDN](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).
 * @source Inspired by Jared Lunde hook in react-hook [react-hook](https://github.com/jaredLunde/react-hook/tree/master/packages/resize-observer)
 */
function useResizeObserver<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  callback: ResizeObserverEntryCallback
) {
  const cachedObserver = getCachedObserver();
  const storedCallback = React.useRef<ResizeObserverEntryCallback>();
  storedCallback.current = callback;

  React.useLayoutEffect(() => {
    let didUnsubscribe = false;
    const targetEl = target && 'current' in target ? target.current : target;
    if (!targetEl) return;

    const callback = (entry: ResizeObserverEntry, observer: ResizeObserver) => {
      if (didUnsubscribe) return;
      storedCallback.current?.(entry, observer);
    };

    cachedObserver.subscribe(targetEl, callback);

    return () => {
      didUnsubscribe = true;
      cachedObserver.unsubscribe(targetEl, callback);
    };
  }, [target, cachedObserver]);
}

export default useResizeObserver;
