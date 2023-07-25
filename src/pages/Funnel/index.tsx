import React, { MouseEvent, useEffect } from 'react'
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

function Mermaid({ chart, go }: { chart: any; go: any; }) {
  useEffect(() => {
    mermaid.contentLoaded();
  }, [])

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (Names[target?.innerText as Names]) {
      const parent = (e.target as HTMLElement);
      if (!parent) return;

      go(target?.innerText)
    }
  }

  const onMouseOver = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (Names[target?.innerText as Names]) {

      target.style.color = "#752bed"
      target.style.cursor="pointer"
    } else {
      document.querySelectorAll('span').forEach((elem: HTMLSpanElement) => {
        elem.setAttribute('style', "color: #333; cursor: auto;")
      })
    }
  }

  /* eslint-disable-next-line */
  return <div className="mermaid" onClick={onClick} onMouseOver={onMouseOver}>{chart}</div>;
}



export function FunnelPage() {

  const {step, Funnel, go, pop} = useFunnel({ entry: Names.첫번째단계 });

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

      go={go}
    />
    </>
  )
}