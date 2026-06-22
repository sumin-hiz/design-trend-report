# 디자인 트렌드 매거진 — 자동 발행 지침 (클라우드 에이전트용)

이 저장소는 매일 디자인 트렌드 리포트를 발행하는 **정적 사이트**입니다.
당신(클라우드 에이전트)의 임무: **오늘자 리포트를 만들어 커밋·푸시**하는 것.
모든 본문은 **한국어**로 작성한다.

## 절차

1. **오늘 날짜 확인**: `TZ=Asia/Seoul date +%F` → 이하 `<DATE>` (예: `2026-06-23`).
   - `issues/<DATE>.html`이 이미 있으면 **아무것도 하지 말고 종료**(중복 발행 금지).

2. **구조 템플릿 파악**: `issues/` 폴더에서 **가장 최근 날짜의 .html**을 열어 구조를 그대로 따른다.
   레이아웃·CSS 클래스·`<script>`·맨위로 버튼·커서·`<link>`(SUITE·Material Symbols·style.css) 등
   **구조는 절대 바꾸지 말고**, **콘텐츠와 날짜만** 새로 채운다.

3. **트렌드 조사** (WebSearch/WebFetch): 오늘 기준 최신 디자인 트렌드를 조사한다.
   카테고리(순서 고정): **타이포그래피 / 메인비주얼 그래픽 / 웹 & 앱 디자인 / 컬러 조합 / 카드뉴스**.
   - **카드뉴스**: 인스타그램 캐러셀·소셜 카드뉴스 트렌드(포맷·사이즈·슬라이드 구성·참여 전략). 소셜 디자인 매체·Behance 캐러셀 사례 참고.
   - 각 카테고리는 3블록: ① 지금 주목받는 스타일·요소(+예시 이미지) ② 사람들의 반응 ③ 👉 내가 참고할 부분(`takeaway`)
   - **이미지 출처 필수**: 예시 이미지는 `<figure class="ic">`로 감싸고 바로 아래 `<figcaption class="img-credit"><a href="출처URL" target="_blank">출처: 이름 ↗</a></figcaption>`(회색 작은 링크 캡션)을 단다. 출처 없는 이미지는 쓰지 않는다.
   - **타이포그래피**엔 "지금 뜨는 폰트" 리스트(`font-item`) 포함 — Google Fonts·눈누·Adobe Fonts 등에서 조회·다운로드 높은 폰트. **없는 수치는 지어내지 말 것.**
   - 참고 소스: Behance, Typewolf, Creative Boom, Kittl, Envato, Lummi, AND Academy, httpster, wwit.design, gdweb, 눈누 등 + 웹.
   - "예쁨 ≠ 인기"를 구분해 **사람들의 반응/인기 신호**도 담는다.

4. **새 리포트 생성** `issues/<DATE>.html`: 최신 기존 리포트를 복제한 뒤 아래만 교체한다.
   - `<title>` 의 날짜
   - `report-summary-title`: 이 호를 한 문장으로 요약한 **대제목**. 의미 단위로 `<br>` 줄바꿈. 날짜·"…흐름" 같은 부가 소제목 금지.
   - `report-date`: `<DATE>`
   - 카테고리 본문(분석·폰트·반응·takeaway·출처)
   - 맨 아래 스크립트의 `const CURRENT_DATE = "<DATE>";`
   - 예시 이미지는 **핫링크 가능한 https URL**, `<img ... loading="lazy" onerror="this.style.display='none'">`.

5. **호 목록 갱신** `assets/issues.js`: `/* ISSUES_START */` ~ `/* ISSUES_END */` 사이
   `window.ISSUES` 배열 **맨 앞**에 추가(마커 밖은 건드리지 말 것):
   ```js
   { date: "<DATE>", title: "요약 대제목(report-summary-title과 동일)", cover: "대표 이미지 URL", summary: "한 줄 요약" },
   ```

6. **커밋·푸시**:
   ```bash
   git add -A
   git commit -m "feat: <DATE> 디자인 트렌드 리포트 발행"
   git push origin main
   ```

## 원칙
- **디자인/레이아웃/CSS는 절대 변경하지 않는다. 콘텐츠만.**
- 매일 내용이 전날과 **또렷이 달라야 한다**(새 조사 기반).
- 사실에 충실하게: 출처 링크를 달고, 확인 안 된 수치는 쓰지 않는다.
