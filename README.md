# Tree Care Industry Mockup

Responsive website implementation for the L.A. Grinding / Arizona Grinding **Tree Care
Industry** homepage, together with the supporting digital assets.

---

## Project Overview

This repository contains the **Tree Care Industry Mockup** — the current homepage
implementation and every asset it depends on.

The page is a single, self-contained marketing homepage covering the tree care industry
offering: hero, online-ordering promotion, partner cards, industries served, services,
featured products, commercial orders, shop-by-category / industry / brand directories,
locations, distributor logos, a mobile navigation concept, a photo strip and the footer.

The page is compiled from a design handoff into plain static HTML, CSS and JavaScript.
There is no runtime framework: the deployed site is a static document plus one small
script. Everything needed to build, run, modify and redeploy the site is in this
repository.

---

## Live Environment

| | |
| --- | --- |
| **Production URL** | <https://tree-care-industry-mockup.vercel.app> |
| **Hosting** | Vercel |
| **Vercel project** | `tree-care-industry-mockup` |
| **Vercel scope** | `santicareaga17-2681s-projects` |
| **Repository** | <https://github.com/santicareaga17-creator/tree-care-industry-mockup> (private) |
| **Production branch** | `main` |

---

## Technology Stack

The stack is deliberately minimal. Everything below was verified against the project — no
assumptions.

| Layer | Technology | Notes |
| --- | --- | --- |
| Markup | Static HTML5 | Generated into `dist/index.html` by the build |
| Styling | Plain CSS | Three stylesheets; layout styles are inline on elements, as authored in the design |
| Behaviour | Vanilla JavaScript (ES5-compatible IIFE) | One file, `assets/js/site.js`. No framework, no bundler |
| Build | Node.js (ESM), no dependencies | `tools/build.mjs`, run via `npm run build` |
| Local server | Node.js `node:http` | `tools/serve.mjs`, run via `npm run serve` |
| Fonts | Google Fonts — Barlow, Barlow Condensed | Loaded via `<link>`; no local font files |
| Hosting | Vercel (static output) | Config in `vercel.json` |

**Runtime dependencies: none.** `package.json` declares no `dependencies` and no
`devDependencies`. `npm install` is not required. Node.js **18 or newer** is the only
prerequisite.

---

## Repository Structure

```
.
├── assets/                       Source assets, committed and copied verbatim into the build
│   ├── js/
│   │   └── site.js               Sticky header, mega-menus, search panel, carousels
│   └── uploads/                  75 images — logos, industry photography, icons, product shots
│
├── design-source/                Design handoff — the source of truth for page markup
│   ├── LA Grinding Homepage.dc.html   Page template (markup + content directives)
│   ├── support.js                Design-tool runtime; reference only, NOT shipped
│   └── _ds/industry-.../         Design system: styles.css, manifest, readme
│
├── tools/
│   ├── build.mjs                 Compiles design-source + assets -> dist/
│   ├── data.mjs                  Content model: categories, industries, brands, services, cities
│   └── serve.mjs                 Static file server for dist/
│
├── docs/
│   └── mobile-navigation-reference.md   Reference material only — see below
│
├── dist/                         Build output. Generated, git-ignored, safe to delete
├── vercel.json                   Build command + output directory for Vercel
├── package.json                  Scripts and engine requirement
└── .gitignore
```

### What each part is responsible for

- **`design-source/`** — the authored design. Page structure, section order and all inline
  styling live here. Change this to change layout or markup.
- **`tools/data.mjs`** — all repeated content (product categories, industries, brands,
  services, quick links, service cities). Change this to change copy or lists.
- **`assets/js/site.js`** — every interactive behaviour on the page.
- **`assets/uploads/`** — every image served from this domain.
- **`tools/build.mjs`** — resolves the design's template directives into static HTML,
  converts hover/active styling into real CSS, and assembles `dist/`.

---

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/santicareaga17-creator/tree-care-industry-mockup.git
```

```bash
cd tree-care-industry-mockup
```

### 2. Install dependencies

The project has no dependencies. This step is a no-op and may be skipped.

```bash
npm install
```

### 3. Start the local development environment

Builds the site and serves it at <http://localhost:5173>.

```bash
npm run dev
```

> There is no hot reload. After editing `design-source/`, `tools/data.mjs` or
> `assets/`, re-run `npm run dev` (or `npm run build` in a second terminal) and refresh.

### 4. Create a production build

Writes the complete deployable site into `dist/`.

```bash
npm run build
```

### 5. Preview / test the production build

Serves the exact contents of `dist/` — the same files that are deployed.

```bash
npm run serve
```

Then open <http://localhost:5173>. To use a different port:

```bash
PORT=8080 npm run serve
```

---

## Deployment

Production is served by the Vercel project `tree-care-industry-mockup`.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | none required (no dependencies) |
| Framework preset | None / Other (`"framework": null`) |
| Node.js version | 18+ (`engines.node` is `>=18`) |
| Vercel project | `tree-care-industry-mockup` |

These settings are committed in `vercel.json`, so they travel with the repository and do
not have to be re-entered in the Vercel dashboard.

> **Build advisory.** Vercel warns that `engines: { "node": ">=18" }` lets the build
> runtime follow new Node.js major releases automatically. This is intentional and safe
> here — the build script uses only long-stable Node APIs (`node:fs/promises`,
> `node:path`, `node:url`) and has no dependencies. If your team prefers fully
> reproducible build runtimes, pin `engines.node` in `package.json` to a specific major
> (for example `"22.x"`) and keep local Node versions aligned with it.

### One-time setup still required: connect GitHub to Vercel

Automatic deploy-on-push is **not yet active**. Connecting a Git repository requires a
GitHub *Login Connection* on the Vercel account, which is an account-level authorization
that has to be granted interactively by the account owner.

To enable it:

1. Sign in to Vercel and open **Account Settings → Authentication**.
2. Add **GitHub** as a login connection and authorize access to the
   `santicareaga17-creator` account.
3. Open the `tree-care-industry-mockup` project → **Settings → Git** and connect the
   `santicareaga17-creator/tree-care-industry-mockup` repository.
4. Confirm the production branch is set to `main`.

Once connected, every push to `main` deploys to production automatically, and pushes to
other branches create preview deployments.

### How to redeploy

**After the GitHub connection above is in place — push to `main`:**

```bash
git add . && git commit -m "Describe the change" && git push origin main
```

**Today, and always available — deploy from a local machine:**

```bash
npx vercel --prod
```

Run this from the repository root. The `.vercel/` directory links the working copy to the
Vercel project; it is git-ignored, so a new machine runs `npx vercel link` once first.

**Re-run a previous build without code changes:** open the project in the Vercel
dashboard, go to *Deployments*, and use *Redeploy* on the desired deployment.

---

## Environment Variables

**No environment variables are currently required for this mockup.**

The project reads no secrets, calls no APIs and has no server-side code. The only
configurable value is the optional `PORT` used by the local preview server, which defaults
to `5173`.

---

## Design / UI Architecture

The page is one document. "Components" are repeated markup blocks expanded at build time
from the lists in `tools/data.mjs`.

### Navigation / header

A two-row sticky header (`#stickyNav`):

- **Utility row** — company name, CA / AZ / NV phone numbers, and the *Request Quote*,
  *Schedule Pickup*, *Pay My Bill* and *Credit Application* actions.
- **Main row** — logo, search field, and the *Shop All*, *Services* and *Cart* controls.
- **Mega-menus** — *Shop All* (Shop by Category / Industry / Brand) and *Services*
  (Sharpening / Account & Service Requests / a pickup-and-delivery promo card). Both are
  always present in the DOM, marked `data-panel`, and toggled by `assets/js/site.js`.
- **Search panel** — a suggestions dropdown (`data-panel="search"`) listing popular
  searches; opens on focus and closes 160 ms after blur.

### Page sections

In document order, each marked with `data-screen-label`:

1. Hero — Tree Care
2. Now You Can Order Online
3. Now You Can Order Online (continued)
4. One Partner Makes It Easier
5. Industries We Support
6. Our Services
7. Featured Products
8. Commercial Orders
9. Shop by Category
10. Shop by Industry
11. Shop by Brand
12. 3 Locations
13. Distributor Logos
14. Photo Strip

A footer follows the last section.

### Industry cards

Two distinct card types, both driven by data:

- **Industry tiles** (*Industries We Support*) — photographic tiles from
  `data.industryTiles`, each with a name, a short note and an accent rule. Captions are
  gated by the `showCaptions` flag.
- **Industry icon cards** (*Shop by Industry*) — line-icon cards from
  `data.shopIndustries`, class `ind-card`. Icons render greyscale and return to full
  colour on hover; the active state tints them to the brand orange.

### Imagery

Two sources, by design:

- Images served from this domain — `assets/uploads/`, output to `dist/assets/uploads/`.
- Images hot-linked from the live site — `https://lagrinding.com/wp-content/uploads/…`.
  These are referenced exactly as the design specifies and are **not** mirrored locally.

### CTAs

- Primary: *Shop Now*, *Contact Us*, *Request Quote*, *Schedule Pickup*.
- The quote and pickup CTAs resolve to `https://lagrinding.com/#requestModal` and
  `https://lagrinding.com/#pickupModal`, which is where those modals live.
- *Pay My Bill* and *Credit Application* link to their JotForm endpoints.
- Product, category, industry and brand links resolve into the live WooCommerce catalog.

### Responsive behavior

See the dedicated section below.

### Footer

Logo and social links (Facebook, Instagram, LinkedIn), quick links, three location blocks
with addresses and phone numbers, service-city lists for CA / AZ / NV, secondary actions,
a *Pay My Bill* button, and a legal bar with Terms, Cookie Policy and the JastMedia credit.

---

## Asset Inventory

All local images live in **`assets/uploads/`** (75 files) and are copied to
`dist/assets/uploads/` at build time.

### Brand assets and logos (2)
`logo-la-arizona-grinding.webp` · `jast-media-logo-white.png`

### UI icons (1)
`blade-orange.png`

### Section and hero imagery (6)
`lag-tree-care-background.png` · `lag-tree-industry-hdr_new.webp` · `lag-bottom01.webp` ·
`lag-bottom02.webp` · `lag-bottom04.webp` · `lag-bottom05.webp`

### Industry photography — tiles (10)
`LA-Corrugated-1.webp` · `LA-Packaging-1.webp` · `LA-MetalIndustry-1.webp` ·
`LA-Paper-1.webp` · `LA-Printing-1.webp` · `LA-plastic-1.webp` · `LA-IceRinks.webp` ·
`LA-TreeCare.webp` · `lag-home-construction.webp` · `lag-home-sharpening.webp`

### Industry icons (9)
`icon-corrugated.png` · `icon-food.png` · `icon-icerink.png` · `icon-metal.png` ·
`icon-paper.png` · `icon-plastic.png` · `icon-printing.png` · `icon-treecare.png` ·
`icon-woodworking.png`

### Navigation menu icons (10)
`menu-construction.png` · `menu-corrugated.png` · `menu-food.png` · `menu-icerink.png` ·
`menu-metal.png` · `menu-plastic.png` · `menu-printing.png` · `menu-recycling.png` ·
`menu-treecare.png` · `menu-woodworking.png`

### Brand logos — Shop by Brand (18)
`logo_freud.webp` · `diablo-logo.webp` · `wysong-clean.png` · `Accurshear.png` ·
`Pexto-hammertone-blue-140x.png` · `tennsmith-clean.png` · `NIAGARA .png` ·
`Roper-Whitney-Logo-Brands-You-Know-Trust-150x38.png` · `diacro-clean.png` ·
`ATLANTIC:HACO.png` · `famco-dark.png` · `amada-clean.png` · `PEARSON.png` ·
`summit-clean.png` · `DURMA : DURMAZLAR.png` · `CHICAGO DREIS & KRUMP.jpg` ·
`adira-dark.png` · `Edwards - Besco.png`

> Several brand logo filenames contain spaces or the characters `:` and `&`. They are
> URL-encoded in the markup. **Do not rename them** without also updating
> `tools/data.mjs`.

### Product and service imagery (19)
`tree-care.png` · `sharpening.png` · `paper-knives.png` · `shear-blades.png` ·
`granulators.png` · `granulator.jpg` · `mulcher-teeth-nologo.png` · `shopping.webp` ·
`download-1.jpg` · `A753-300x300.webp` · `W74-300x300.webp` ·
`8-dial-a-width-stacked-dado-sets-300x300.jpg` ·
`12-x-96-teeth-saw-blade-for-medium-aluminum-600x600.jpg` ·
`12-x-96-teeth-saw-blade-for-medium-aluminum-600x600-61cfc156.jpg` ·
`1-11-16-dia-premier-adjustable-rail-stile-bit-bevel-600x600.jpg` ·
`1-4-hex-to-1-2-square-socket-adapter-600x600.jpg` ·
`2-3-4-x-5-assorted-sandnet-reusable-sanding-sheets-10-piece-600x600.jpg` ·
`3-pc-universal-fit-carbide-oscillating-blade-set-3-piece-600x600.jpg` ·
`9-5-7-tpi-amped-demo-demon-carbide-teeth-reciprocating-saw-blade-for-nail-embedded-woodd-600x600.jpg`

### Mobile assets
There are no mobile-only asset files. The mobile navigation concept, when enabled for
reference, reuses the assets listed above.

### Fonts
No font files are stored in the repository. Barlow and Barlow Condensed are loaded from
Google Fonts in the document head.

### Remotely hosted imagery
21 additional images are hot-linked from `lagrinding.com/wp-content/uploads/` (distributor
logos, the service map, and several product and background photographs). They are not
stored here by design. If the site is ever moved off the `lagrinding.com` infrastructure,
these must be mirrored into `assets/uploads/` and the paths in `tools/data.mjs` updated.

---

## Industries / Content

Two industry lists exist in the project, and they differ. Both are defined in
`tools/data.mjs`.

### Industries We Support — photographic tiles (10)

| Industry | Note shown on the tile |
| --- | --- |
| Corrugated Cardboard | Male & female slotters, razor slitters |
| Food Processing and Packaging | Knives, punches and blades |
| Metal | Shear blades up to 14' |
| Paper Converting Label Manufacturing | Paper knives & cutter accessories |
| Printing & Bindery | Stitching wire, cutting sticks, parts |
| Recycling Plastic Industry | Granulator & shredder knives |
| Ice Rink Products | Edger blades & resurfacing knives |
| Tree Care Industry | Chipper knives, mulcher & stump teeth |
| Woodworking & Construction | Bandsaw fitting, carbide saw blades |
| Sharpening | Scheduled pickup & delivery routes |

### Shop by Industry — icon cards and mega-menu (10)

Construction · Corrugated Knives & Accessories · Food Processing & Packaging ·
Ice Rink Operations · Metal Industry · Plastic · Printing & Bindery ·
Recycling & Waste Management · Tree Care · Woodworking & Construction

### Other content collections

| Collection | Count | Used by |
| --- | --- | --- |
| `cats` | 15 | Shop by Category carousel and mega-menu |
| `brands` | 18 | Shop by Brand |
| `menuBrands` | 14 | Shop All mega-menu |
| `brandLogos` | 18 | Distributor Logos |
| `services` | 5 | Our Services |
| `featured` | 3 | Featured Products |
| `partnerCards` | 3 | One Partner Makes It Easier |
| `heroCards` / `techCards` | 3 / 3 | Hero and tree-care carousels |
| `popularSearches` | 7 | Search suggestions panel |
| `quickLinks` | 13 | Footer |
| `caCities` / `azCities` / `nvCities` | 14 / 6 / 6 | Footer service areas |

---

## Responsive Behavior

**This page is a fixed-width desktop layout.** That is the design as delivered, and it was
preserved deliberately.

| Viewport | Behaviour |
| --- | --- |
| Desktop (≥1280px) | Intended experience. Content is centred in a 1360px container with 40px gutters |
| Tablet / narrow desktop (<1280px) | The page does not reflow. The wrapper carries `min-width: 1280px`, so the browser shows a horizontal scrollbar and the desktop layout is preserved at full size |
| Mobile | Same as above — the desktop layout is shown, scaled by the device, not re-laid-out |

### Breakpoints present in the code

There is exactly one media query in the project:

```css
@media (max-width: 900px) {
  #stickyNav.is-stuck .nav-row { height: auto !important; }
}
```

It is defined in the design's stylesheet and emitted to `dist/assets/css/page.css`. It
allows the condensed header row to grow to its natural height on narrow viewports.

A true mobile layout is **not** implemented. A design concept for one is documented under
*Mobile Navigation - Reference Only*, and would require removing the `min-width: 1280px`
constraint and introducing real breakpoints.

---

## Sticky Navigation

### Behaviour

The header sticks to the top of the viewport and condenses once the page scrolls past
8px.

| State | Utility row | Main row | Shadow |
| --- | --- | --- | --- |
| At rest (`scrollY ≤ 8`) | `min-height: 52px` | `height: 96px` | none |
| Condensed (`scrollY > 8`) | `min-height: 40px`, reduced padding | `height: 76px` | `0 8px 22px rgba(7,31,54,0.26)` |

All changes are transitioned over 220 ms. The state is driven by a single class,
`is-stuck`, toggled on `#stickyNav`.

### Where it is implemented

| Concern | Location |
| --- | --- |
| Scroll listener that toggles `is-stuck` | `assets/js/site.js`, the *sticky header* block at the end of the file |
| Positioning, transitions and condensed sizes | `dist/assets/css/page.css`, generated verbatim from the `<style>` block in `design-source/LA Grinding Homepage.dc.html` |
| Header markup | the `#stickyNav` block in `design-source/LA Grinding Homepage.dc.html` |

To change the scroll threshold, edit the `y > 8` comparison in `assets/js/site.js`. To
change the condensed dimensions, edit the `#stickyNav.is-stuck …` rules in the design's
`<style>` block and rebuild.

---

## Mobile Navigation - Reference Only

> The following Mobile Navigation material is retained as a visual/development reference
> for future implementation. It is not part of the current production requirements and
> should not be interpreted as an outstanding implementation task.

A mobile navigation concept exists in the design: two static phone mockups illustrating a
proposed pattern with pinned conversion actions and search, and *Shop All* / *Services*
expanding as accordions rather than listing every industry as a top-level item.

**It is not rendered on the live site.** The design wraps that section in its own
`showMobileConcept` switch, exposed as `showMobile` in `tools/data.mjs` and set to
`false`, so the build omits it. The concept is preserved in the design file and
documented here purely as reference for possible future work.

To view it locally, set `showMobile: true` in `tools/data.mjs` and rebuild. Do not enable
it in production unless it is explicitly requested and scoped as new work.

Full notes — where the section lives, what each mockup shows, and what implementing it
would involve — are in **[`docs/mobile-navigation-reference.md`](docs/mobile-navigation-reference.md)**.

---

## Maintenance Notes

| Task | Where |
| --- | --- |
| **Images** | `assets/uploads/` — copied verbatim to `dist/assets/uploads/` |
| **Icons** | `assets/uploads/`, prefixed `icon-` (industry cards) and `menu-` (mega-menu) |
| **Navigation** | Markup in the `#stickyNav` block of `design-source/LA Grinding Homepage.dc.html`; behaviour in `assets/js/site.js`; menu contents in `tools/data.mjs` |
| **Global styles** | `design-source/_ds/industry-…/styles.css` (design system) and the `<style>` block in the design file. Most layout styling is inline on elements, as authored |
| **Responsive / mobile behaviour** | The single `@media (max-width: 900px)` rule in the design's `<style>` block, and the `min-width: 1280px` on the page wrapper |
| **Text and content** | `tools/data.mjs` for anything repeated; the design file for one-off headings and body copy |
| **Hover and pressed states** | Authored as `style-hover` / `style-active` in the design file; compiled into `dist/assets/css/site.css`. Do not hand-edit that file |

### How to replace industry imagery safely

1. Place the new file in `assets/uploads/`. Match the existing aspect ratio — tiles are
   rendered with `object-fit: cover`, so a mismatched ratio crops rather than distorts.
2. Update the matching `img` value in the `industryTiles` array in `tools/data.mjs`.
3. Run `npm run build` and check the *Industries We Support* section.
4. Only delete the old file once nothing references it.

Prefer `.webp` for photography, to stay consistent with the existing tiles.

### How to add another industry or card without breaking the layout

- **Industries We Support** — append an object to `industryTiles` in `tools/data.mjs` with
  `name`, `note`, `img` and `href`. The grid is a 5-column layout that wraps, so a new
  entry starts a new row cleanly. Adding one at a time keeps rows balanced.
- **Shop by Industry** — append to `shopIndustries` with `name`, `href`, `icon` and
  `menuIcon`. Supply **both** icons: `icon-*` is used by the card, `menu-*` by the mega-menu.
- **Shop by Category / Brand** — append to `cats` or `brands`. `menuBrands` is derived as
  the first 14 brands, and `mobileCats` is derived from `cats`, so both update on their own.

Always run `npm run build` afterwards. The build **fails loudly** if a template expression
or directive cannot be resolved, which catches most content mistakes immediately.

---

## QA Checklist

Run before promoting any release to production.

**Build**
- [ ] `npm run build` completes without errors
- [ ] `dist/` contains `index.html` and `assets/{css,js,uploads}`
- [ ] No unresolved template expressions (the build fails on these)

**Desktop (≥1280px)**
- [ ] All 14 sections render in order, no layout shifts
- [ ] Hero background and headline render correctly
- [ ] Industry tiles, service cards and featured products display their imagery

**Tablet (768–1279px)**
- [ ] Fixed desktop layout is preserved with horizontal scroll — expected behaviour
- [ ] Header remains usable

**Mobile (<768px)**
- [ ] Page loads and is legible when zoomed
- [ ] No JavaScript errors specific to touch devices

**Navigation**
- [ ] *Shop All* mega-menu opens and closes; 40 links present
- [ ] *Services* mega-menu opens and closes; 13 links present
- [ ] Opening one mega-menu closes the other
- [ ] Search suggestions panel opens on focus, closes on blur, 7 chips present
- [ ] Category and product carousels scroll in both directions

**Sticky header**
- [ ] Not condensed at the top of the page
- [ ] Condenses past 8px: main row 96px → 76px, utility row 52px → 40px, shadow appears
- [ ] Returns to full height when scrolled back to the top

**Images**
- [ ] No broken images (`naturalWidth === 0`) anywhere on the page
- [ ] Locally hosted images resolve under `/assets/uploads/`
- [ ] Remotely hosted `lagrinding.com` images still resolve

**Links**
- [ ] *Request Quote* and *Schedule Pickup* reach `lagrinding.com/#requestModal` / `#pickupModal`
- [ ] *Pay My Bill* and *Credit Application* reach their JotForm URLs
- [ ] Phone links (`tel:`) work for CA, AZ and NV
- [ ] Footer social links open the correct profiles

**Console**
- [ ] No errors in the browser console
- [ ] No failed network requests for local assets

**Vercel production deployment**
- [ ] Deployment status is *Ready*
- [ ] Production URL serves the current build
- [ ] Asset paths resolve in production, not only locally

---

## Asset / Missing Materials Audit

A full audit was performed against the built page: every referenced asset, image, icon,
font, link, configuration file and dependency was compared with what the repository
contains.

| Check | Result |
| --- | --- |
| Missing images | None — 79 referenced local assets, all present |
| Broken paths | None — all local asset paths resolve |
| Assets referenced but not included | None |
| Duplicate assets | Resolved. `design-source/uploads/` duplicated `assets/uploads/` byte-for-byte and was removed; images now exist in one place |
| Unused / orphan assets | Resolved. Two unreferenced files (`blade orange.png`, `lag tree care background.png` — space-named twins of the hyphenated files actually used) were removed |
| Placeholder files | None |
| Missing fonts | None — fonts are loaded from Google Fonts by reference; no local font files are expected |
| Broken imports | None — `tools/build.mjs` imports only `tools/data.mjs` and Node built-ins |
| Missing mobile assets | None — the mobile concept reuses existing assets |
| Undocumented dependencies | None — the project has zero npm dependencies; Node 18+ is the only requirement, documented above |

One deliberate, non-blocking observation: `12-x-96-teeth-saw-blade-for-medium-aluminum-600x600.jpg`
and its `-61cfc156` variant are byte-identical, but **both are referenced** by the design
(for *Saw Blades* and *Circular Saw Blades* respectively). Both were kept so the design is
reproduced exactly.

**No additional materials are currently required for the production build.**
