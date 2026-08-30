/**
 * Behaviour for the LA Grinding homepage.
 *
 * Mirrors the interactions defined by the Claude Design handoff: the sticky
 * header condensing on scroll, the Shop All / Services mega-menus, the search
 * suggestions panel, and the horizontal category carousels. The markup hooks
 * (data-on-*, data-ref, data-panel) are emitted by tools/build.mjs.
 */
(function () {
  "use strict";

  var panels = {};
  document.querySelectorAll("[data-panel]").forEach(function (el) {
    panels[el.getAttribute("data-panel")] = el;
  });

  /* ---------- mega-menus ---------- */

  var openMenu = null;

  function showMenu(name) {
    if (openMenu === name) return;
    if (openMenu && panels[openMenu]) panels[openMenu].hidden = true;
    openMenu = name;
    if (name && panels[name]) panels[name].hidden = false;
  }

  var actions = {
    openShop: function () { showMenu("shop"); },
    openServices: function () { showMenu("services"); },
    closeMenus: function () { showMenu(null); },
    toggleShop: function () { showMenu(openMenu === "shop" ? null : "shop"); },
    toggleServices: function () { showMenu(openMenu === "services" ? null : "services"); }
  };

  /* ---------- mobile drawer + accordions ---------- */

  // Only one accordion group is open at a time, matching the design.
  var ACCORDIONS = { accCatT: "acc-cat", accIndT: "acc-ind", accBrandT: "acc-brand", accSvcT: "acc-svc" };
  var openAccordion = null;

  function showAccordion(name) {
    Object.keys(ACCORDIONS).forEach(function (key) {
      var panel = panels[ACCORDIONS[key]];
      if (panel) panel.hidden = ACCORDIONS[key] !== name;
    });
    openAccordion = name;
  }

  function setAccordionSign(name) {
    // The trigger's trailing glyph reads "+" when collapsed and "–" when expanded.
    Object.keys(ACCORDIONS).forEach(function (key) {
      var trigger = document.querySelector('[data-on-click="' + key + '"]');
      if (!trigger) return;
      var glyph = trigger.lastElementChild;
      if (glyph) glyph.textContent = ACCORDIONS[key] === name ? "\u2013" : "+";
    });
  }

  actions.toggleDrawer = function () {
    var drawer = panels.drawer;
    if (!drawer) return;
    drawer.hidden = !drawer.hidden;
    if (drawer.hidden) {
      showAccordion(null);
      setAccordionSign(null);
    }
  };

  Object.keys(ACCORDIONS).forEach(function (key) {
    actions[key] = function () {
      var next = openAccordion === ACCORDIONS[key] ? null : ACCORDIONS[key];
      showAccordion(next);
      setAccordionSign(next);
    };
  });

  /* ---------- search suggestions ---------- */

  var searchBlurTimer = null;

  actions.onSearchFocus = function () {
    clearTimeout(searchBlurTimer);
    if (panels.search) panels.search.hidden = false;
  };

  // The design defers the close so a click on a suggestion still registers.
  actions.onSearchBlur = function () {
    clearTimeout(searchBlurTimer);
    searchBlurTimer = setTimeout(function () {
      if (panels.search) panels.search.hidden = true;
    }, 160);
  };

  /* ---------- carousels ---------- */

  function track(name) {
    return document.querySelector('[data-ref="' + name + '"]');
  }

  function nudge(name, direction, amount) {
    var el = track(name);
    if (el) el.scrollBy({ left: direction * (amount || 780), behavior: "smooth" });
  }

  actions.scrollCatsLeft = function () { nudge("catsRef", -1); };
  actions.scrollCatsRight = function () { nudge("catsRef", 1); };
  actions.scrollProdLeft = function () { nudge("prodRef", -1); };
  actions.scrollProdRight = function () { nudge("prodRef", 1); };
  actions.heroLeft = function () { nudge("heroRef", -1, 640); };
  actions.heroRight = function () { nudge("heroRef", 1, 640); };
  actions.techLeft = function () { nudge("techRef", -1, 640); };
  actions.techRight = function () { nudge("techRef", 1, 640); };

  /* ---------- wiring ---------- */

  var events = {
    "data-on-click": "click",
    "data-on-mouseenter": "mouseenter",
    "data-on-mouseleave": "mouseleave",
    "data-on-focus": "focus",
    "data-on-blur": "blur"
  };

  Object.keys(events).forEach(function (attr) {
    document.querySelectorAll("[" + attr + "]").forEach(function (el) {
      var handler = actions[el.getAttribute(attr)];
      if (handler) el.addEventListener(events[attr], handler);
    });
  });

  /* ---------- mobile auto-advancing carousel ---------- */

  // The partner cards become a swipeable carousel below 640px and step right on their
  // own. Swiping is always available; only the auto-advance pauses.
  (function () {
    var MOBILE_MAX = 640;
    var STEP_MS = 1000;      // cadence for the auto-advance
    var RESUME_MS = 4000;    // stay paused this long after the visitor interacts

    var track = document.querySelector(".p-carousel");
    if (!track) return;

    // Respect the visitor's reduced-motion setting: swiping still works, but nothing
    // moves on its own.
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");

    var paused = false;
    var resumeTimer = null;
    var selfScrolling = false;
    var visible = true;

    function pause() {
      paused = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(function () { paused = false; }, RESUME_MS);
    }

    ["touchstart", "pointerdown", "wheel"].forEach(function (evt) {
      track.addEventListener(evt, pause, { passive: true });
    });
    track.addEventListener("scroll", function () {
      // A scroll we did not start means the visitor is swiping.
      if (!selfScrolling) pause();
    }, { passive: true });

    // Don't run the timer while the section is off-screen.
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
      }, { threshold: 0 }).observe(track);
    }

    setInterval(function () {
      if (paused || !visible) return;
      if (window.innerWidth > MOBILE_MAX) return;
      if (reduced && reduced.matches) return;

      var cards = track.children;
      if (cards.length < 2) return;
      if (track.scrollWidth <= track.clientWidth) return;

      // Derive the position from card offsets rather than accumulating a step, so
      // scroll-snap corrections and manual swipes can't make it drift.
      var origin = cards[0].offsetLeft;
      var current = 0;
      for (var i = 0; i < cards.length; i += 1) {
        if (cards[i].offsetLeft - origin <= track.scrollLeft + 8) current = i;
      }

      var atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
      var next = atEnd || current + 1 >= cards.length ? 0 : current + 1;

      selfScrolling = true;
      track.scrollTo({ left: cards[next].offsetLeft - origin, behavior: "smooth" });
      setTimeout(function () { selfScrolling = false; }, 700);
    }, STEP_MS);
  })();

  /* ---------- viewport changes ---------- */

  // The drawer only exists below the desktop breakpoint; collapse it on resize past it.
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1280 && panels.drawer && !panels.drawer.hidden) {
      panels.drawer.hidden = true;
      showAccordion(null);
      setAccordionSign(null);
    }
  });

  /* ---------- sticky header ---------- */

  var nav = document.getElementById("stickyNav");
  if (nav) {
    var onScroll = function () {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      nav.classList.toggle("is-stuck", y > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
