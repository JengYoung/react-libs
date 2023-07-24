import { PropsWithChildren, ReactNode } from "react";

export type TStepProps =  { name: string; isValid?: boolean; validFallback?: ReactNode } & PropsWithChildren;

export function Step({ name, children, isValid = true, validFallback = <div /> }: TStepProps) {
  if (!name || !isValid) return validFallback;

  return (
    children
  )
}