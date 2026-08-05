/* 화면 보조 기능만 담당합니다. 본문은 index.html 에 그대로 들어 있어
   자바스크립트가 없어도 사이트와 인쇄 결과는 동일합니다. */

(function () {
  "use strict";

  var year = document.getElementById("year");
  if (year) { year.textContent = String(new Date().getFullYear()); }

  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-list a"));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || !sections.length) { return; }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) { return; }
      links.forEach(function (a) {
        var on = a.getAttribute("href") === "#" + entry.target.id;
        a.classList.toggle("is-active", on);
        if (on) { a.setAttribute("aria-current", "true"); }
        else { a.removeAttribute("aria-current"); }
      });
    });
  }, { rootMargin: "-25% 0px -60% 0px", threshold: 0 });

  sections.forEach(function (s) { observer.observe(s); });
})();
