const useIntersectionObserver = (
  targetRef: HTMLElement,
  { root, rootMargin, threshold }: IntersectionObserverInit
) => {
  const option = { root, rootMargin, threshold };
  return [targetRef, option];
};

export default useIntersectionObserver;
