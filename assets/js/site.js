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
