import { PropsWithChildren, ReactNode, isValidElement } from 'react';
import { Step } from './Step';

export type TFunnelProps = { step: string; } & PropsWithChildren;

export function Funnel({step, children}: TFunnelProps) {
  if (!Array.isArray(children)) return children ?? <div />;

  const activedChildren = children?.filter((child: ReactNode) => isValidElement(child) && child.props.name === step);

  return activedChildren;
}

Funnel.Step = Step;