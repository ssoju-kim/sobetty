/* =========================================================================
   app.js — 화면 보조 기능만 담당합니다.

   본문은 index.html 에 그대로 들어 있어, 자바스크립트가 꺼져 있어도
   사이트와 인쇄 결과는 동일하게 나옵니다.
   여기서 하는 일은 두 가지뿐입니다.
     1) 현재 보고 있는 섹션을 상단 내비게이션에 표시
     2) 올해 연도 표시

   ※ 시연 영상은 아직 파일이 없어 빈 영역을 만들지 않았습니다.
     영상이 준비되면 README.md 의 "시연 영상 넣기" 절을 참고하세요.
   ========================================================================= */

(function () {
  "use strict";

  /* 올해 연도 */
  var year = document.getElementById("year");
  if (year) { year.textContent = String(new Date().getFullYear()); }

  /* 현재 섹션을 내비게이션에 표시 */
  var links = Array.prototype.slice.call(document.querySelectorAll(".topbar-nav a"));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || !sections.length) { return; }

  var setActive = function (id) {
    links.forEach(function (a) {
      var on = a.getAttribute("href") === "#" + id;
      a.classList.toggle("is-active", on);
      if (on) { a.setAttribute("aria-current", "true"); }
      else { a.removeAttribute("aria-current"); }
    });
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { setActive(entry.target.id); }
    });
  }, { rootMargin: "-25% 0px -60% 0px", threshold: 0 });

  sections.forEach(function (s) { observer.observe(s); });
})();
