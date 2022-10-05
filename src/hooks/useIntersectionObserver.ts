import { RefObject, useEffect, useRef } from 'react';

type CallbackType = IntersectionObserverCallback;
const useIntersectionObserver = (
  targetRef: RefObject<Element>,
  callback: CallbackType,
  { root, rootMargin, threshold }: IntersectionObserverInit
) => {
  const options = { root, rootMargin, threshold };
  const callbackRef = useRef<CallbackType | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callbackRef]);

  useEffect(() => {
    if (callbackRef.current === null || targetRef.current === null) return;

    const target = targetRef.current;
    const observer = new IntersectionObserver(callbackRef.current, options);

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetRef, callbackRef]);

  return [targetRef, callbackRef];
};

export default useIntersectionObserver;
