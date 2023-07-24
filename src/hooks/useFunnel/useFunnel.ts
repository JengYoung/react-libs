import { useState } from "react"
import { Funnel } from './Funnel'

export type TUseFunnelParams = {
  entry: string;
}

export type THistory<State> = {
  step: string;
  state: State
}

export type TFunnelState<State> = {
  step: string;
  histories: THistory<State>[];
}

export const useFunnel = <State>({ entry }: TUseFunnelParams) => {
  const [funnelState, setFunnelState] = useState<TFunnelState<State>>({ step: entry, histories: [] });

  const go = (key: string, historyState: State) => {
    setFunnelState(state => ({ 
      ...state, 
      step: key, 
      histories: [...state.histories, { step: state.step, state: historyState }] 
    }));
  }
  
  const isEntry = !funnelState.histories.length

  const pop = (): THistory<State> | null => {
    if (!isEntry) return null;

    const returnState = funnelState.histories.at(-1) as THistory<State>

    setFunnelState(state => {
      const nextHistories = [...state.histories];
      const nextStep = nextHistories.pop() as THistory<State>;

      return {
        ...state,
        step: nextStep.step,
        histories: nextHistories,
      }
    })

    return returnState;
  }


  return {
    Funnel,
    step: funnelState.step,
    isEntry,
    go,
    pop,
  }
}
