import React, { useEffect } from 'react'
import mermaid from "mermaid";
import { useFunnel } from '../../hooks/useFunnel/useFunnel'


mermaid.initialize({
  startOnLoad: true
});

function Mermaid({ chart }: { chart: any }) {
  useEffect(() => {
    mermaid.contentLoaded();
  }, [])

  return <div className="mermaid">{chart}</div>;
}



export function FunnelPage() {

  const {step, Funnel, go, pop} = useFunnel({ entry: 'hello' });

  return (
    <>
    <Funnel step={step}>
      <Funnel.Step name="hello">
        Hello!1
        <button type="button" onClick={() => go('hello3')}>CLICK!</button>
        <button type="button" onClick={() => pop()}>POP!</button>
      </Funnel.Step>

      <Funnel.Step name="hello2">
        Hello!!!2
        <button type="button" onClick={() => go('hello')}>CLICK TO ENTRY!</button>
        <button type="button" onClick={() => go('done')}>CLICK TO DONE!</button>

        <button type="button" onClick={() => pop()}>POP!</button>
      </Funnel.Step>

      <Funnel.Step name="hello3">
        Hello!!!3
        <button type="button" onClick={() => go('hello2')}>CLICK!</button>
        <button type="button" onClick={() => pop()}>POP!</button>
      </Funnel.Step>

      <Funnel.Step name="done">
        DONE!!!

        <button type="button" onClick={() => pop()}>POP!</button>
      </Funnel.Step>

      <div>hi2</div>

    </Funnel>
    <Mermaid
        chart={`graph LR;
          hello[첫번째단계]-->hello3[세번째단계];
          hello2[두번째단계]-->done[완료];
          hello3[세번째단계]-->hello2[두번째단계];
          hello2[두번째단계]-->hello[첫번째단계];
        `}
      />
    </>
  )
}