import { css } from '@emotion/react';
import NavigatorDirections from './types';

const navigatorCSS = (direction: NavigatorDirections | undefined) => {
  if (direction === NavigatorDirections.TOP) {
    return css`
      flex-direction: column;

      @keyframes navigate-animation {
        0% {
          z-index: -99;
          transform: translateY(0%);
        }
        100% {
          z-index: -99;
          transform: translateY(calc(-100vh + 5rem));
        }
      }
    `;
  }

  if (direction === NavigatorDirections.BOTTOM) {
    return css`
      flex-direction: column-reverse;

      @keyframes navigate-animation {
        0% {
          z-index: -99;
          transform: translateY(calc(-100vh + 5rem));
        }
        100% {
          z-index: -99;
          transform: translateY(0%);
        }
      }
    `;
  }

  if (direction === NavigatorDirections.LEFT) {
    return css`
      @keyframes navigate-animation {
        0% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(-100%);
        }
      }
    `;
  }

  if (direction === NavigatorDirections.RIGHT) {
    return css`
      flex-direction: row-reverse;

      @keyframes navigate-animation {
        0% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(100%);
        }
      }
    `;
  }

  // NOTE: animation won't show if direction param is undefined
  return '';
};

export default navigatorCSS;
