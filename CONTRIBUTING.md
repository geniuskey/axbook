# AXBook 챕터 작성 가이드

## 기여물의 라이선스

기여하는 코드는 MIT, 교재 콘텐츠는 CC BY 4.0으로 제공하는 데 동의해야 합니다. HTML 안에 코드와 콘텐츠가 함께 있어도 각 부분에 해당하는 라이선스를 적용합니다. 적용 범위는 [라이선스 안내](LICENSE.md)를 참고하세요. 제3자 자료를 추가할 때는 재사용·배포가 허용되는지 확인하고 출처와 해당 라이선스를 명시하세요.

빌드 과정 없는 정적 사이트다. `index.html` + `chapters/<slug>.html` + 공통 `css/style.css`, `js/common.js`.
로컬 실행: `python3 -m http.server 8000` → http://localhost:8000 (file://로 열어도 동작하게 classic script만 사용한다. ES module 금지.)

## 원칙
- **한국어**, 대상은 대기업 제조업의 실무자와 리더(엔지니어, 품질·생산·설비·구매·기획, IT/데이터 담당, 팀장·파트장). 코딩을 못 해도 읽을 수 있어야 하고, 데이터·IT 담당자도 얻어 갈 것이 있어야 한다. 영어 원어는 `<span class="en">(Retrieval-Augmented Generation)</span>`처럼 병기.
- 출발점은 언제나 **현장의 현실**이다: 공유 폴더의 `최종_v3_진짜최종.xlsx`, 메일 스레드에 묻힌 결정, 이슈마다 새로 만드는 보고서 양식, 팀마다 다른 코드·단위·용어, 국제표준이 닿지 않는 회색지대. 이 문제에서 출발해 개념 → 그림(SVG) → 인터랙티브 → 실전 체크리스트 → 요약/퀴즈 순서로 간다.
- 특정 회사를 겨냥하지 않는다. 사례는 업종·규모로 일반화한 **가상의 회사(A사, B사…)**로 쓰고, 실명 기업은 공개 보도·공개 보고서로 널리 알려진 사실만 여러 회사 중 하나로 짧게 언급한다(예: WEF 등대공장 네트워크 참여 기업들). 근거가 불확실한 수치는 쓰지 않는다. 수치가 필요하면 "예시 수치"임을 밝히거나 출처(보고서명·기관·연도)를 함께 적는다.
- 표준·규제는 정확한 이름과 번호로 쓴다(ISA-95/IEC 62264, ISO 8000, ISO/IEC 42001, ISO/IEC 23894, NIST AI RMF 1.0, EU AI Act, IEC 62443, ISO 9001, IATF 16949, AIAG-VDA FMEA, 8D, OPC UA/IEC 62541, AAS/IEC 63278 등). 모르는 세부 조항 번호는 지어내지 않는다.
- 외부 라이브러리는 아래 head 템플릿에 있는 것만(KaTeX). 이미지 파일 대신 인라인 SVG/canvas/HTML로 그린다.
- 색은 하드코딩하지 말고 CSS 변수(`var(--accent)` 등)나 `AX.palette()`를 쓴다. 라이트/다크 둘 다 읽혀야 한다.
- 모바일(폭 360px)에서 가로 스크롤이 생기면 안 된다. SVG는 `viewBox`만 주고 width/height 속성 생략. 넓은 표는 `.table-wrap`으로 감싼다.

## head 템플릿
```html
<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="../favicon.ico" sizes="any">
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="../apple-touch-icon.png">
<title>레거시의 해부 · AXBook</title>
<meta name="description" content="한 문장 설명">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
<link rel="stylesheet" href="../css/style.css">
<script src="../js/common.js"></script>
<style> /* 이 페이지 전용 스타일(선택) */ </style>
<!-- Cloudflare Web Analytics -->
<script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "3d6151a0abc94ede89285d462527fa80"}'></script>
<!-- End Cloudflare Web Analytics -->
</head>
<body data-chapter="legacy">
<main class="chapter">
  <header class="chapter-hero">
    <div class="eyebrow">Chapter 02</div>
    <h1>레거시의 해부</h1>
    <p class="lead">...</p>
    <ul class="objectives"><li>...</li></ul>
  </header>

  <section id="intro"><h2>제목</h2> ... </section>   <!-- h2 번호와 우측 목차는 자동 생성 -->
  ...
  <section class="keypoints" id="summary"><h2>핵심 정리</h2><ol><li>...</li></ol></section>
  <section class="quiz-sec" id="quiz"><h2>확인 퀴즈</h2><div class="quiz"> ... </div></section>
</main>
<script> /* 페이지 스크립트: 여기서 AX 사용 */ </script>
</body>
</html>
```
상단바, 챕터 서랍, 목차, 이전/다음, 푸터, 테마 토글, 퀴즈 동작, KaTeX 렌더는 `common.js`가 자동 처리한다.
새 챕터는 `common.js`의 `CHAPTERS`에 등록한 뒤 `python3 tools/seo.py`를 실행한다. canonical·Open Graph·JSON-LD 태그가 `<meta name="description">` 바로 아래에 삽입되고 `sitemap.xml`이 갱신된다(직접 쓰지 않는다).

## 컴포넌트
```html
<figure class="diagram"><svg viewBox="0 0 800 300">...</svg><figcaption><b>그림 2-1.</b> 설명</figcaption></figure>
```
SVG 안 유틸 클래스: `.t .t-dim .t-mono .t-acc`(텍스트), `.s-line .s-axis .s-acc`(선), `.f-surface .f-elev .f-acc .f-acc-soft .f-acc2-soft`(면).

인터랙티브(시뮬레이터) 블록. 이 책에서는 태그를 `INTERACTIVE`로 쓴다.
```html
<div class="sim" id="sim-map">
  <div class="sim-head"><span class="sim-tag">INTERACTIVE</span><h3>제목</h3></div>
  <div class="sim-body side">                                    <!-- side: 넓은 화면에서 컨트롤을 오른쪽에 -->
    <div class="sim-view"><canvas id="cv-map"></canvas></div>    <!-- HTML 출력이면 <div class="sim-view"><div class="sim-html" id="out"></div></div> -->
    <div class="sim-controls">
      <label class="ctrl"><span>값 <output id="x-out"></output></span><input type="range" id="x" min="0" max="100" value="50"></label>
      <div class="ctrl"><span>모드</span><div class="seg" id="mode"><button data-value="a" class="on">A</button><button data-value="b">B</button></div></div>
      <label class="ctrl"><span>선택</span><select id="pick"><option>…</option></select></label>
      <label class="check"><input type="checkbox" id="opt"> 옵션</label>
      <button class="btn primary" id="run">실행</button>
    </div>
  </div>
  <div class="sim-readout">
    <div class="stat"><span class="k">지표</span><span class="v" id="o-x">—</span></div>
  </div>
  <div class="sim-note">해볼 것: ...</div>
</div>
```
콜아웃: `<div class="callout">`, `.tip`, `.warn`, `.deep`(심화). 수식: `<div class="formula">$$...$$<div class="where">여기서 ...</div></div>`, 인라인 `\( ... \)`.
표: `<div class="table-wrap"><table>...</table></div>`.

AXBook 전용:
- 카드: `<div class="cards"><div class="card"><span class="k">LABEL</span><h4>제목</h4><p>설명</p></div></div>`
- 전/후 비교: `<div class="compare"><div class="before"><h4>레거시</h4><ul>…</ul></div><div class="after"><h4>AX 이후</h4><ul>…</ul></div></div>`
- 단계 사다리: `<ol class="ladder"><li><b>단계 이름</b>설명</li></ol>`
- 체크리스트: `<ul class="checklist"><li>…</li></ul>`
- 칩: `<span class="chip acc|ok|warn|bad">텍스트</span>`
- 메일·문서 목업: `<div class="mock"><div class="mock-head">From: … / Subject: …</div><div class="mock-body">본문 <mark>강조</mark> <mark class="b">다른 색</mark> <mark class="w">경고색</mark></div></div>`
- 막대 행(HTML 막대그래프): `<div class="bar-row"><span>이름</span><span class="track"><i style="width:40%"></i></span><span class="val">40</span></div>`
- 인터랙티브 HTML 출력 영역: `<div class="sim-html">`

퀴즈:
```html
<div class="quiz-q"><p>질문?</p><div class="opts">
  <button class="opt">보기</button><button class="opt" data-correct>정답</button>
</div><div class="quiz-exp">해설</div></div>
```

## JS 헬퍼 (`js/common.js`, 전역 `AX`)
- `AX.canvas(el, (ctx,w,h)=>{}, {aspect:0.5, height, minHeight, maxHeight})` → `{ctx,w,h,redraw()}` HiDPI, 리사이즈/테마 시 자동 redraw(배경 `--canvas-bg`로 칠해 줌).
- `AX.chart(ctx, box|null, {x:[a,b], y:[a,b], logX, logY, xLabel, yLabel, series:[{data:[[x,y]],color,width,dash,fill}], vlines, hlines, points, bands, xFmt, yFmt})` → `{X,Y,box}`.
- `AX.loop(el, (dt,t)=>{})` 화면에 보일 때만 도는 rAF 루프 `{start,stop,toggle}`.
- `AX.range(id, fmt, onInput)` → getter `get()`, `get.set(v)`. `AX.seg(id, onChange)` → getter. `AX.stat(id, html)`.
- `AX.palette()` 테마 색(`bg,text,dim,faint,grid,axis,border,surface,accent,accent2,ok,warn,bad,red,green,blue,series[]`), `AX.color('accent')`, `AX.onTheme(cb)`, `AX.isDark()`.
- `AX.randn()`, `AX.poisson(λ)`, `AX.fmt(x, digits)`, `AX.si(x,'unit')`, `AX.clamp/lerp/map`.
- `AX.store.get(key, 기본값)`, `AX.store.set(key, 값)` — localStorage 래퍼(실패해도 동작). `AX.esc(str)` HTML 이스케이프.
