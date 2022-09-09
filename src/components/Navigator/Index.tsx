import React, {
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { RouterProps, useLocation } from 'react-router-dom';

import navigatorSelector from '../../store/navigator/selector';
import { navigatorAction } from '../../store/navigator/reducer';
import store from '../../store';

interface NavigatorProps {
  children: ReactNode;
}

function Navigator({ children }: NavigatorProps) {
  const navigator = useSelector(navigatorSelector);
  const location = useLocation();

  useEffect(() => {
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
  }, [location]);

  return (
    <>
      <div className="clone">
        {navigator.prevPages.map((page) => (
          <div key={`${new Date().getTime()}`}>{page}</div>
        ))}
      </div>
      {children}
    </>
  );
}

export default Navigator;
