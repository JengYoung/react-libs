import { useState } from "react"
import { Funnel } from './Funnel'

export type TUseFunnelParams = {
  entry: string;
}

export type TFunnelState = {
  step: string;
}

export const useFunnel = ({ entry }: TUseFunnelParams) => {
  const [funnelState, setFunnelState] = useState<TFunnelState>({ step: entry });


  const go = (key: string) => {
    setFunnelState(state => ({ ...state, step: key }));
  }
  
  return {
    go,
    Funnel,
    step: funnelState.step,
  }
}
