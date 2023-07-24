import { useState } from "react"
import { Funnel } from './Funnel'

export type TUseFunnelParams = {
  entry: string;
}

export type TFunnelState = {
  step: string;
  histories: string[];
}

export const useFunnel = ({ entry }: TUseFunnelParams) => {
  const [funnelState, setFunnelState] = useState<TFunnelState>({ step: entry, histories: [] });


  const go = (key: string) => {
    setFunnelState(state => ({ ...state, step: key, histories: [...state.histories, state.step] }));
  }
  
  const isEntry = !funnelState.histories.length

  const pop = () => {
    if (isEntry) return;

    setFunnelState(state => {
      const nextHistories = [...state.histories];
      const nextStep = nextHistories.pop() ?? state.step;

      return {
        ...state,
        step: nextStep,
        histories: nextHistories,
      }
    })
  }


  return {
    Funnel,
    step: funnelState.step,
    isEntry,
    go,
    pop,
  }
}
