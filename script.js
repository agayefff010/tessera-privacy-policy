/**
 * Tessera — Site Interactions
 * Theme toggle, mobile navigation, scroll reveals, sticky nav state
 */

(function () {
  "use strict";

  var THEME_KEY = "tessera-theme";
  var root = document.documentElement;

  /* ------------------------------------------------------------------------
     Theme
     ------------------------------------------------------------------------ */

  function getPreferredTheme() {
    var stored = null;
    try {
      stored = localStorage.getItem(THEME_KEY);
    } catch (e) {
      /* private browsing / blocked storage */
    }
    if (stored === "light" || stored === "dark") return stored;
    if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
    return "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  function initTheme() {
    applyTheme(getPreferredTheme());

    var toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {
        /* ignore */
      }
    });
  }

  /* Prevent FOUC: apply theme ASAP if script loads in head (also mirrored inline) */
  applyTheme(getPreferredTheme());

  /* ------------------------------------------------------------------------
     Sticky navigation shadow
     ------------------------------------------------------------------------ */

  function initNavScroll() {
    var nav = document.getElementById("site-nav");
    if (!nav) return;

    function update() {
      if (window.scrollY > 8) {
        nav.classList.add("is-scrolled");
      } else {
        nav.classList.remove("is-scrolled");
      }
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ------------------------------------------------------------------------
     Mobile menu
     ------------------------------------------------------------------------ */

  function initMobileMenu() {
    var btn = document.getElementById("menu-toggle");
    var links = document.getElementById("nav-links");
    if (!btn || !links) return;

    function close() {
      links.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open menu");
    }

    function open() {
      links.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "Close menu");
    }

    btn.addEventListener("click", function () {
      if (links.classList.contains("is-open")) {
        close();
      } else {
        open();
      }
    });

    links.querySelectorAll("a").forEach(function (anchor) {
      anchor.addEventListener("click", close);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    window.addEventListener(
      "resize",
      function () {
        if (window.innerWidth > 768) close();
      },
      { passive: true }
    );
  }

  /* ------------------------------------------------------------------------
     Scroll reveal
     ------------------------------------------------------------------------ */

  function initReveal() {
    var nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;

    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    nodes.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------------------
     Table of contents active section
     ------------------------------------------------------------------------ */

  function initToc() {
    var toc = document.querySelector(".toc");
    if (!toc) return;

    var links = toc.querySelectorAll('a[href^="#"]');
    var sections = [];

    links.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var section = document.getElementById(id);
      if (section) sections.push({ id: id, el: section, link: link });
    });

    if (!sections.length) return;

    function setActive(id) {
      links.forEach(function (link) {
        link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
      });
    }

    if (!("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(function (item) {
      observer.observe(item.el);
    });
  }

  /* ------------------------------------------------------------------------
     Current year in footer
     ------------------------------------------------------------------------ */

  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */

  function boot() {
    initTheme();
    initNavScroll();
    initMobileMenu();
    initReveal();
    initToc();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
