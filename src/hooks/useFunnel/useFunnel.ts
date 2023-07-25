import { useState } from "react"
import { Funnel } from './Funnel'

export type TUseFunnelParams = {
  entry: string;
}

export type THistory<State> = {
  step: string;
  state: State | null
}

export type TFunnelState<State> = {
  step: string;
  state: State | null;
  histories: THistory<State>[];
}

export const useFunnel = <State>({ entry }: TUseFunnelParams) => {
  const [funnelState, setFunnelState] = useState<TFunnelState<State>>({ step: entry, state: null, histories: [] });

  const go = (key: string, nextState?: State | null) => {
    setFunnelState(state => ({ 
      ...state, 
      step: key,
      state: nextState ?? null,
      histories: [...state.histories, { step: state.step, state: state.state }] 
    }));
  }
  
  const isEntry = !funnelState.histories.length

  const pop = (): THistory<State> | null => {
    if (isEntry) return null;

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
