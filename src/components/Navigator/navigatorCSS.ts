import { css } from '@emotion/react';
import NavigatorDirections from './types';

const navigatorCSS = (
  direction: NavigatorDirections | undefined,
  height: string,
  delay: number
) => {
  if (direction === NavigatorDirections.TOP) {
    return css`
      flex-direction: column;

      @keyframes navigate-animation-top {
        0% {
          z-index: -99;
          transform: translateY(0%);
        }
        100% {
          z-index: -99;
          transform: translateY(calc(-1 * ${height}));
        }
      }
      animation: navigate-animation-top ${delay}s ease-in forwards;
    `;
  }

  if (direction === NavigatorDirections.BOTTOM) {
    return css`
      flex-direction: column-reverse;

      @keyframes navigate-animation-bottom {
        0% {
          z-index: -99;
          transform: translateY(calc(-1 * ${height}));
        }
        100% {
          z-index: -99;
          transform: translateY(0%);
        }
      }
      animation: navigate-animation-bottom ${delay}s ease-in forwards;
    `;
  }

  if (direction === NavigatorDirections.LEFT) {
    return css`
      @keyframes navigate-animation-left {
        0% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(-100%);
        }
      }
      animation: navigate-animation-left ${delay}s ease-in forwards;
    `;
  }

  if (direction === NavigatorDirections.RIGHT) {
    return css`
      flex-direction: row-reverse;

      @keyframes navigate-animation-right {
        0% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(100%);
        }
      }

      animation: navigate-animation-right ${delay}s ease-in forwards;
    `;
  }

  // NOTE: animation won't show if direction param is undefined
  return '';
};

export default navigatorCSS;
