/* 리포트 공통 스크립트 — 왼쪽 지난 호 목록 렌더 + 맨 위로 버튼.
   현재 호 날짜는 <body data-date="YYYY-MM-DD">에서 읽는다. issues.js 다음에 로드할 것. */
(function () {
  const CURRENT_DATE = document.body.dataset.date || "";
  const list = document.getElementById("reportList");
  if (list) {
    (window.ISSUES || []).slice().sort((a, b) => a.date < b.date ? 1 : -1).forEach(i => {
      const a = document.createElement("a");
      a.href = `${i.date}.html`;
      a.innerHTML = `<span class="ri-body"><span class="ri-title">${i.title}</span><span class="ri-date">${i.date}</span></span>`;
      if (i.date === CURRENT_DATE) a.className = "active";
      list.appendChild(a);
    });
  }
  const topBtn = document.getElementById("topBtn");
  if (topBtn) {
    addEventListener("scroll", () => topBtn.classList.toggle("show", scrollY > 320));
    topBtn.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
  }
})();
