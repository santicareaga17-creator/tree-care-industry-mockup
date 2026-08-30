# Mobile Navigation — Reference Only

> **Status: reference material. Not a production requirement.**
>
> This document describes a *design concept* for mobile navigation. It is retained as a
> visual and development reference for possible future work. It is **not** an outstanding
> implementation task, and nothing here should be built into the live page unless it is
> explicitly requested and scoped as new work.

## Where this lives today

The concept is not a separate mockup file. It is rendered inside the homepage itself as a
labelled section of the original design:

| Property | Value |
| --- | --- |
| Section label | `data-screen-label="Mobile Concept"` |
| Position | after *Distributor Logos*, before *Photo Strip* |
| Approximate offset | ~8795px from the top of the page |
| Height | ~1103px |
| Heading | "Mobile navigation", kicker "Responsive concept" |

It renders two static phone mockups side by side. It is presentational only — the mockups
are not interactive, and they do not drive the real navigation.

## What the concept shows

1. **Home screen mockup** — condensed utility bar (CA phone, AZ/NV switches, Pay My Bill),
   logo with cart and hamburger, a full-width search field, a split *Request Quote /
   Schedule Pickup* action bar, the "Now you can order online!" promo, and a shop-by-category
   grid.
2. **Menu screen mockup** — an open menu panel with a pinned search field and *Shop All*
   expanded as an accordion listing categories.

The stated intent, quoted from the design: conversion actions and search stay pinned, and
*Shop All* / *Services* expand as accordions instead of listing every industry as a
top-level item.

## Important: this is not the site's responsive behaviour

The production page is a fixed desktop layout (`min-width: 1280px`) — see
**Responsive Behavior** in the main `README.md`. The mockups above depict a mobile
experience that **does not exist** in the current implementation. Do not read this section
as documentation of live behaviour.

## If this is ever implemented

The pieces a future developer would need are already in the repository:

- Navigation markup lives in the `#stickyNav` block of
  `design-source/LA Grinding Homepage.dc.html`.
- Menu open/close behaviour lives in `assets/js/site.js` (`showMenu`, `data-panel`).
- Category, industry and brand data lives in `tools/data.mjs`.
- The `@media (max-width: 900px)` rule in the design's own stylesheet is currently the only
  responsive rule in the project.

Implementing it would mean removing the `min-width: 1280px` constraint on the page wrapper
and introducing real breakpoints — a material change to the current design, and therefore
out of scope until requested.
