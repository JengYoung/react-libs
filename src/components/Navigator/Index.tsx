import React, {
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { Location, RouterProps, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

import navigatorSelector from '../../store/navigator/selector';
import { navigatorAction } from '../../store/navigator/reducer';
import store from '../../store';

interface NavigatorProps {
  children: ReactNode;
}

const StyledTransitionPage = styled.div`
  @keyframes fadeUp {
    0% {
      top: 0%;
      display: block;
    }
    100% {
      top: -100%;
      display: flex;
    }
  }
  position: relative;
  top: -100%;
  height: 100%;
  transition: all 0.3s;
  animation: fadeUp 1s forwards;
`;

function Navigator({ children }: NavigatorProps) {
  const navigator = useSelector(navigatorSelector);
  const nowLocation = useLocation();

  const [location, setLocation] = useState<null | Location>(null);
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false);

  useEffect(() => {
    setLocation(() => nowLocation);

    return () => {
      setLocation(() => null);
    };
  }, [nowLocation]);

  useLayoutEffect(() => {
    if (!location) return;
    if (!isValidElement(children)) return;

    store.dispatch(
      navigatorAction.updatePage({
        type: 'PUSH',
        page: React.cloneElement(
          children as unknown as ReactElement<RouterProps>,
          {
            location,
            key: location.key,
          }
        ),
      })
    );
    return () => {
      setIsAnimationCompleted(() => false);
    };
  }, [location]);

  useEffect(() => {
    console.log(navigator);
  }, [navigator]);

  const onAnimationEnd = () => {
    console.log('bys');
    setIsAnimationCompleted(() => true);
  };

  const LastPage = useMemo(
    () =>
      navigator.prevPages.length ? (
        <StyledTransitionPage onAnimationEnd={onAnimationEnd}>
          {navigator.prevPages[navigator.prevPages.length - 1]}
        </StyledTransitionPage>
      ) : null,
    [navigator]
  );

  return (
    <>
      {!isAnimationCompleted && LastPage ? LastPage : undefined}
      {navigator.nowPage}
    </>
  );
}

export default Navigator;
