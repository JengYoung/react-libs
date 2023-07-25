import React, { useEffect } from 'react'
import mermaid from "mermaid";
import { useFunnel } from '../../hooks/useFunnel/useFunnel'


enum Names {
  "첫번째단계"="첫번째단계",
  "두번째단계"="두번째단계",
  "세번째단계"="세번째단계",
  "완료"="완료",
}
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
      <Funnel.Step name={Names.첫번째단계}>
        Hello!1
        <button type="button" onClick={() => go(Names.세번째단계)}>CLICK!</button>
        <button type="button" onClick={() => pop()}>POP!</button>
      </Funnel.Step>

      <Funnel.Step name={Names.두번째단계}>
        Hello!!!2
        <button type="button" onClick={() => go(Names.첫번째단계)}>CLICK TO ENTRY!</button>
        <button type="button" onClick={() => go(Names.완료)}>CLICK TO DONE!</button>

        <button type="button" onClick={() => pop()}>POP!</button>
      </Funnel.Step>

      <Funnel.Step name={Names.세번째단계}>
        Hello!!!3
        <button type="button" onClick={() => go(Names.두번째단계)}>CLICK!</button>
        <button type="button" onClick={() => pop()}>POP!</button>
      </Funnel.Step>

      <Funnel.Step name={Names.완료}>
        DONE!!!

        <button type="button" onClick={() => pop()}>POP!</button>
      </Funnel.Step>

      <div>hi2</div>

    </Funnel>

    <Mermaid
      chart={`graph LR;
        ${Names.첫번째단계}[${Names.첫번째단계}]-- 건축물유형에서 대출유형 -->${Names.세번째단계}[${Names.세번째단계}];
        ${Names.두번째단계}[${Names.두번째단계}]-- 타입 정하면 완료페이지 -->${Names.완료}[${Names.완료}];
        ${Names.세번째단계}[${Names.세번째단계}]-- 대출유형에서 생활자금 타입 -->${Names.두번째단계}[${Names.두번째단계}];
        ${Names.두번째단계}[${Names.두번째단계}]-- 잘못입력해서 ${Names.첫번째단계}로 이동 -->${Names.첫번째단계}[${Names.첫번째단계}];
      `}
    />
    </>
  )
}