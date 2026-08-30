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
