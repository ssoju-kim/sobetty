/* 화면 보조 기능만 담당합니다. 본문은 index.html 에 그대로 들어 있어
   자바스크립트가 없어도 사이트와 인쇄 결과는 동일합니다. */

/* ─────────────────────────────────────────────────────────────────────────
   개인 정보 설정

   값을 채우면 해당 버튼과 링크가 화면에 나타납니다.
   비워 두면 버튼 자체가 나타나지 않습니다. (자리표시 문구는 노출되지 않습니다.)

     email     연락용 이메일 주소.            예: "example@gmail.com"
     resumeUrl 공개해도 되는 경력기술서 PDF.  예: "./assets/docs/경력기술서.pdf"

   ※ resumeUrl 에는 특정 기업명·지원 직무명이 적힌 파일이나
      연락처가 비어 있는 파일을 연결하지 마세요.
   ───────────────────────────────────────────────────────────────────────── */
var PROFILE = {
  email: "",
  resumeUrl: ""
};

(function () {
  "use strict";

  /* ── 연도 ── */
  var year = document.getElementById("year");
  if (year) { year.textContent = String(new Date().getFullYear()); }

  /* ── 설정된 연락처만 화면에 노출 ── */
  function reveal(key, href) {
    if (!href) { return; }
    var nodes = document.querySelectorAll('[data-profile^="' + key + '"]');
    Array.prototype.forEach.call(nodes, function (el) {
      if (el.tagName === "A") { el.setAttribute("href", href); }
      el.removeAttribute("hidden");
    });
  }

  reveal("email", PROFILE.email ? "mailto:" + PROFILE.email : "");
  reveal("resume", PROFILE.resumeUrl);

  var mailLinks = document.querySelectorAll('a[data-profile="email"]');
  if (PROFILE.email) {
    Array.prototype.forEach.call(mailLinks, function (a) {
      if (a.classList.contains("btn")) { return; }
      a.textContent = PROFILE.email;
    });
  }

  var resumeLinks = document.querySelectorAll('a[data-profile="resume"]');
  Array.prototype.forEach.call(resumeLinks, function (a) {
    if (/^https?:/.test(PROFILE.resumeUrl)) {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    }
  });

  /* ── 현재 섹션 표시 ── */
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
