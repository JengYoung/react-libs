import { PropsWithChildren, ReactNode } from "react";

export type TStepProps =  { name: string; isValid?: boolean; invalidFallback?: ReactNode } & PropsWithChildren;

export function Step({ 
  name, 
  children, 
  isValid = true, 
  invalidFallback = <div /> 
}: TStepProps) {
  if (!name || !isValid) return invalidFallback;

  return (
    children
  )
}