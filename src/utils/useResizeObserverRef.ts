import { useCallback, useEffect, useRef } from 'react';

type ResizeObserverCallback = (entry: ResizeObserverEntry) => void;

function useResizeObserverRef(callback: ResizeObserverCallback) {
  const ref = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  const observedCallback: ResizeObserverCallback = useCallback(
    (entry) => {
      if (callback) {
        callback(entry);
      }
    },
    [callback]
  );

  useEffect(() => {
    if (ref.current) {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      observerRef.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          observedCallback(entry);
        }
      });
      observerRef.current.observe(ref.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [ref, observedCallback]);

  return ref;
}

export default useResizeObserverRef;