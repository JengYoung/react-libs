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

import { css } from '@emotion/react';
import navigatorSelector from '../../store/navigator/selector';
import { navigatorAction } from '../../store/navigator/reducer';
import store from '../../store';

interface StyledNavigatorProps {
  navigate: boolean;
}

interface NavigatorProps {
  children: ReactNode;
}

const NowPage = styled.div`
  height: calc(100vh - 5rem);
`;

const PrevPage = styled(NowPage)`
  position: relative;
  z-index: -999;
`;

const StyledNavigator = styled.div<Partial<StyledNavigatorProps>>`
  position: relative;
  ${({ navigate }) =>
    navigate &&
    css`
      @keyframes fadeUp {
        0% {
          z-index: -99;
          transform: translateY(0%);
        }
        100% {
          z-index: -99;
          transform: translateY(calc(-100vh + 5rem));
        }
      }
      animation: fadeUp 0.75s ease-in forwards;
    `}
`;

function Navigator({ children }: NavigatorProps) {
  const navigator = useSelector(navigatorSelector);
  const nowLocation = useLocation();

  const [location, setLocation] = useState<null | Location>(null);
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false);

  useEffect(() => {
    setLocation(() => nowLocation);

    return () => setLocation(() => null);
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

  // useEffect(() => {
  //   console.log(navigator);
  // }, [navigator]);

  const LastPage = useMemo(
    () =>
      navigator.prevPages.length ? (
        navigator.prevPages[navigator.prevPages.length - 1]
      ) : (
        <div />
      ),
    [navigator]
  );

  const isNavigate = useMemo(
    () => !isAnimationCompleted && !!navigator.prevPages.length,
    [isAnimationCompleted, navigator.prevPages.length]
  );

  const onAnimationEnd = () => {
    if (!navigator.prevPages.length) return;
    setIsAnimationCompleted(() => true);
  };

  return (
    <StyledNavigator
      className="navigator"
      navigate={isNavigate}
      onAnimationEnd={onAnimationEnd}
    >
      {isNavigate && <PrevPage className="prev-page">{LastPage}</PrevPage>}
      <NowPage>{navigator.nowPage}</NowPage>
    </StyledNavigator>
  );
}

export default React.memo(Navigator);
