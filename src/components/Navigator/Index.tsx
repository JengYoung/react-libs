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
import navigatorCSS from './navigatorCSS';

import navigatorSelector from '../../store/navigator/selector';
import { navigatorAction } from '../../store/navigator/reducer';
import store from '../../store';
import NavigatorDirections from './types';

interface StyledNavigatorProps {
  navigate: boolean;
  direction: NavigatorDirections;
  delay: number;
  height: string;
}

interface NavigatorProps {
  children: ReactNode;
  delay?: number;
  height?: string;
  directions: {
    [index: string]: NavigatorDirections;
  };
}

interface RoutePageProps {
  height: string;
}

const RoutePage = styled.div<RoutePageProps>`
  height: ${({ height }) => height};
`;

const StyledNavigator = styled.div<Partial<StyledNavigatorProps>>`
  position: relative;
  display: flex;

  ${({ navigate, direction, height, delay }) =>
    navigate &&
    direction &&
    navigatorCSS(direction, height as string, delay as number)}

  > * {
    flex-shrink: 0;
    width: 100vw;
  }
`;

function Navigator({
  children,
  delay = 0.75,
  height = '100vh',
  directions,
}: NavigatorProps) {
  const navigator = useSelector(navigatorSelector);
  const nowLocation = useLocation();

  const [location, setLocation] = useState<null | Location>(null);
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false);
  const [direction, setDirection] = useState<NavigatorDirections | undefined>();

  useEffect(() => {
    setLocation(() => nowLocation);

    return () => setLocation(() => null);
  }, [nowLocation]);

  useLayoutEffect(() => {
    if (!location) return;
    if (!isValidElement(children)) return;

    setDirection(() => directions[location.pathname]);

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
      setDirection(() => undefined);
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
      direction={direction}
      onAnimationEnd={onAnimationEnd}
      delay={delay}
      height={height}
    >
      {isNavigate && (
        <RoutePage className="prev-page" height={height}>
          {direction}
          {LastPage}
        </RoutePage>
      )}
      <RoutePage height={height}>{navigator.nowPage}</RoutePage>
    </StyledNavigator>
  );
}

export default React.memo(Navigator);
