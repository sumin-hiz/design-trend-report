/* 68px 원형 커스텀 커서 — 홈/리포트 공통.
   상태: 기본(검정) / 로딩(빠른 펄스) / 글자 위(흰 반투명 유리) / 링크·드래그(하이라이트 컬러). */
(function () {
  // 터치 기기에서는 적용하지 않음
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

  const cur = document.createElement('div');
  cur.className = 'cursor is-loading';
  cur.innerHTML = '<span class="cursor-inner"></span>';
  const attach = () => document.body.appendChild(cur);
  if (document.body) attach(); else document.addEventListener('DOMContentLoaded', attach);

  let x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y;
  (function loop() {
    tx += (x - tx) * 0.28; ty += (y - ty) * 0.28;
    cur.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();

  const LINK = 'a, button, summary, .card, .cal-day.has-issue, [onclick], [role="button"]';
  const TEXT = 'p, h1, h2, h3, h4, h5, li, span, strong, em, blockquote, .takeaway';

  document.addEventListener('mousemove', (e) => {
    x = e.clientX; y = e.clientY;
    if (!cur.classList.contains('visible')) cur.classList.add('visible');
  });
  document.addEventListener('mouseleave', () => cur.classList.remove('visible'));

  function refresh(target) {
    if (cur.classList.contains('is-drag')) return;
    cur.classList.remove('is-text', 'is-link');
    if (target && target.closest && target.closest(LINK)) cur.classList.add('is-link');
    else if (target && target.closest && target.closest(TEXT)) cur.classList.add('is-text');
  }
  document.addEventListener('mouseover', (e) => refresh(e.target));

  // 드래그 = 하이라이트 컬러
  document.addEventListener('mousedown', () => cur.classList.add('is-drag'));
  document.addEventListener('mouseup', (e) => {
    cur.classList.remove('is-drag');
    refresh(document.elementFromPoint(e.clientX, e.clientY));
  });

  // 로딩 = 펄스: 첫 로드 완료까지 + 내부 링크 클릭(이동) 시
  window.addEventListener('load', () => cur.classList.remove('is-loading'));
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a[href]');
    if (a && a.getAttribute('target') !== '_blank') cur.classList.add('is-loading');
  });
})();
