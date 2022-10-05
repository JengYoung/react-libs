import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const StyledMyPage = styled.div`
  height: 100%;
  overflow-y: scroll;
`;
function MyPage() {
  const observerTargetRef = useRef(null);
  const callbackRef = useRef<IntersectionObserverCallback | null>(null);
  const [visible, setVisible] = useState(false);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(() => true);
        } else {
          setVisible(() => false);
        }
      });
    },
    [visible]
  );

  useEffect(() => {
    callbackRef.current = callback;
  }, [callbackRef]);

  useIntersectionObserver(observerTargetRef, callbackRef, {});

  return (
    <StyledMyPage>
      {new Array(100).fill(0).map((_, idx) => (
        /* eslint-disable-next-line react/no-array-index-key */
        <div key={idx}>test! {JSON.stringify(visible)}</div>
      ))}
      <div ref={observerTargetRef}>hi {JSON.stringify(visible)}</div>
      {new Array(100).fill(0).map((_, idx) => (
        /* eslint-disable-next-line react/no-array-index-key */
        <div key={idx}>test! {JSON.stringify(visible)}</div>
      ))}
    </StyledMyPage>
  );
}

export default MyPage;
