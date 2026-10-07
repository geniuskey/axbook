# AXBook — 인터랙티브 제조업 AI 전환(AX) 교과서

레거시 파일과 메일 더미에서 AI가 일하는 조직까지. 대기업 제조 현장의 실무자와 리더를 위한 한국어 AX 학습 사이트입니다.
공유 폴더에 흩어진 엑셀·PPT, 메일 속에만 있는 결정과 수치, 이슈마다 달라지는 프로세스와 산출물, 팀마다 다른 용어와 포맷 — 이 현실에서 출발해 데이터·프로세스·공통 언어·사람을 정리하고 그 위에 AI를 올리는 길을 단계별로 안내합니다.
20개 챕터, 50여 개의 인터랙티브(자가진단, 프로세스 마이닝, 미니 RAG, ROI 계산기, 보안 정책 파레토 프런티어, 로드맵 빌더, 90일 플레이북 생성기 등)로 구성됩니다.

## 실행
빌드 과정이 없는 정적 사이트입니다.

```bash
python3 -m http.server 8000   # → http://localhost:8000
```
`index.html`을 브라우저로 바로 열어도 동작합니다. KaTeX와 폰트는 CDN에서 불러옵니다.

## 구성
| 부 | 장 | 파일 | 주제 |
|---|---|---|---|
| 1부 문제 인식 | 01 | chapters/why.html | DX와 AX의 차이, 파일럿 연옥, AX 성숙도 자가진단 |
| | 02 | chapters/legacy.html | 다크 데이터, 정보 거주지 지도, 메일 스레드 구조화, EUC 위험 |
| | 03 | chapters/process.html | 프로세스 부채, 프로세스 마이닝, 표준 대응 흐름과 8D |
| 2부 데이터와 지식의 기반 | 04 | chapters/semantics.html | 기준정보·용어 사전, ISA-95 계층, 정준 데이터 모델, 온톨로지 |
| | 05 | chapters/foundation.html | 데이터 품질 6차원, 오너·스튜어드, 데이터 계약, 메달리온 구조 |
| | 06 | chapters/knowledge.html | 문서 파싱·청킹·하이브리드 검색, RAG, 권한, 지식 그래프 |
| | 07 | chapters/experiments.html | 실험 데이터의 AX: AI 가독성 사다리, 기준 레지스트리(ID@버전), 실험 카드 |
| 3부 AI 적용 | 08 | chapters/usecases.html | 가치사슬별 유스케이스, 가치–실현성 매트릭스, ROI |
| | 09 | chapters/agents.html | 코파일럿과 에이전트, 자율성 단계, 오류 누적, 사람의 승인 |
| | 10 | chapters/shopfloor.html | OT/IT, SPC와 이상 탐지, 예지 보전, 비전 검사, 가상 계측 |
| 4부 거버넌스와 조직 | 11 | chapters/governance.html | ISO/IEC 42001, EU AI Act, NIST AI RMF, 섀도 AI와 기술 유출, 보안–가치 파레토 프런티어 |
| | 12 | chapters/people.html | CoE·허브-스포크, FDE, 역할의 조건, 역량, 확산 모델, 변화 관리 |
| | 13 | chapters/goals.html | 계층별 AX 목표와 평가: 취합형 MBO의 함정, 계층별 목표 유형과 언어, 캐치볼, 지표 설계, 증거 사다리와 증거 기반 평가 |
| | 14 | chapters/reporting.html | AX 시대의 보고: 보고 증폭 비용, 목적별 보고 형태, 산출물의 소비자와 가치–비용, 우선순위 부채, 보고받는 조직의 AX |
| | 15 | chapters/system.html | 전체를 보는 AX: 팀 간 흐름과 산출물 계약·API, 인프라 바닥, 가치 실현 결정 |
| 5부 실행 | 16 | chapters/roadmap.html | 가시화→표준화→디지털화→데이터화→지능화→자율화 로드맵, 기반·유스케이스·컴퓨트·사람 투자 배분 |
| | 17 | chapters/cases.html | 가상 사례로 보는 레거시 방식 vs AX 방식 |
| | 18 | chapters/playbook.html | 우리 팀 90일 계획·유스케이스 캔버스 생성기, 영역별 90일 트랙 |
| 부록 | 19 | chapters/questions.html | AX에 대한 정직한 질문들(짧은 답과 해당 장 안내) |
| | 20 | chapters/glossary.html | 용어집, 종합 퀴즈 |

공통 코드: `css/style.css`(디자인 토큰, 라이트/다크), `js/common.js`(장·부 목록, 내비게이션, 검색, 캔버스·차트 헬퍼, 전역 `AX`).
챕터 작성 규칙은 [CONTRIBUTING.md](CONTRIBUTING.md), 편집 기준은 [docs/OUTLINE.md](docs/OUTLINE.md)를 참고하세요.
챕터를 추가하거나 제목·설명을 바꾼 뒤에는 `python3 tools/seo.py`로 canonical/OG/JSON-LD 태그와 `sitemap.xml`을 다시 만듭니다.

책의 사례는 업종·규모를 일반화한 가상의 회사이며, 인터랙티브의 수치는 개념을 보여 주기 위한 교육용 예시 모델입니다.

## 라이선스

코드는 [MIT](LICENSE-MIT), 교재 콘텐츠는 [CC BY 4.0](LICENSE-CC-BY-4.0)으로 제공됩니다. 적용 범위와 재사용 조건, 출처 표기 예시는 [라이선스 안내](LICENSE.md)를 참고하세요.
