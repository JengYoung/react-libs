import { PropsWithChildren } from "react";

export type TStepProps =  { name: string } & PropsWithChildren;

export function Step({ name, children }: TStepProps) {
  if (!name) return <div />;

  return (
    children
  )
}