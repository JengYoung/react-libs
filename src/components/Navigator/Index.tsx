import React, { isValidElement, ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import store from '../../store';
import { navigatorAction } from '../../store/navigator/reducer';
import navigatorSelector from '../../store/navigator/selector';

interface NavigatorProps {
  children?: ReactNode;
}
function Navigator({ children }: NavigatorProps) {
  const PrevPage = useSelector(navigatorSelector);

  useEffect(() => {
    async function getPrevPage() {
      if (!isValidElement(children)) return;
      await store.dispatch(
        navigatorAction.updatePage(React.cloneElement(children))
      );
    }

    getPrevPage();
  }, []);

  return (
    <>
      <div>{PrevPage}</div>
      {children}
    </>
  );
}

export default Navigator;
