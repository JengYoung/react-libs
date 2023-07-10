import React from 'react'
import { useFunnel } from '../../hooks/useFunnel/useFunnel'

export function FunnelPage() {
  const {step, Funnel, go} = useFunnel({ entry: 'hello' });

  return (
    <Funnel step={step}>
      <Funnel.Step name="hello">
        Hello!
        <button type="button" onClick={() => go('hello2')}>CLICK!</button>
      </Funnel.Step>

      <Funnel.Step name="hello2">
        Hello!!!
        <button type="button" onClick={() => go('hello')}>CLICK!</button>
      </Funnel.Step>

      <div>hi2</div>
    </Funnel>
  )
}