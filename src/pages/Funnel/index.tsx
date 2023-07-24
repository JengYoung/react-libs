import React from 'react'
import { useFunnel } from '../../hooks/useFunnel/useFunnel'

export function FunnelPage() {
  const {step, Funnel, go, pop} = useFunnel({ entry: 'hello' });

  return (
    <Funnel step={step}>
      <Funnel.Step name="hello">
        Hello!1
        <button type="button" onClick={() => go('hello3')}>CLICK!</button>
        <button type="button" onClick={() => pop()}>POP!</button>
      </Funnel.Step>

      <Funnel.Step name="hello2">
        Hello!!!2
        <button type="button" onClick={() => go('hello')}>CLICK!</button>
        <button type="button" onClick={() => pop()}>POP!</button>
      </Funnel.Step>

      <Funnel.Step name="hello3">
        Hello!!!3
        <button type="button" onClick={() => go('hello2')}>CLICK!</button>
        <button type="button" onClick={() => pop()}>POP!</button>
      </Funnel.Step>

      <div>hi2</div>
    </Funnel>
  )
}