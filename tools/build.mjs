/**
 * Compiles the Claude Design handoff (design-source/LA Grinding Homepage.dc.html)
 * into a static, dependency-free production page.
 *
 * The handoff is authored in Claude Design's `dc` template dialect, which is
 * rendered in the editor by a React + Babel runtime loaded from a CDN. That is
 * fine for a mockup and unacceptable for production, so this build resolves the
 * whole dialect ahead of time:
 *
 *   <sc-for list="{{ xs }}" as="x">   ->  the markup, repeated, with {{ x.* }} filled in
 *   <sc-if  value="{{ flag }}">       ->  unwrapped when statically true, or marked
 *                                         as a runtime panel when it is interactive
 *   {{ expr }}                        ->  the value, HTML-escaped
 *   style-hover / style-active        ->  real CSS :hover / :active rules
 *   onClick / onMouseEnter / ref      ->  data-* hooks wired up by assets/js/site.js
 *
 * Output: everything the site needs, written into dist/ — source files are never
 * modified, so dist/ can be deleted and regenerated at any time.
 */

import { readFile, writeFile, mkdir, rm, cp } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { data } from "./data.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(ROOT, "design-source", "LA Grinding Homepage.dc.html");
const DESIGN_SYSTEM = join(
  ROOT, "design-source", "_ds", "industry-4d598bcf-ed61-4905-862f-a72479e9ff93", "styles.css"
);
const OUT = join(ROOT, "dist");

/* The three menus are conditional in the design because the editor re-renders on
 * state change. In the shipped page they are always present in the DOM and
 * toggled by site.js, so each one is tagged instead of dropped. */
/* Where the CTAs that the design leaves as bare fragments should point. */
const LIVE_SITE = "https://lagrinding.com/";

const RUNTIME_PANELS = {
  shopOpen: "shop",
  servicesOpen: "services",
  searchOpen: "search",
  // Mobile drawer and its accordion groups (V2 responsive design).
  drawerOpen: "drawer",
  accCat: "acc-cat",
  accInd: "acc-ind",
  accBrand: "acc-brand",
  accSvc: "acc-svc"
};

const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr"
]);

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Resolves `x`, `x.y` against the loop scope first, then the page data. */
function resolve(expr, scope) {
  const path = expr.trim().split(".");
  let value = Object.prototype.hasOwnProperty.call(scope, path[0])
    ? scope[path[0]]
    : data[path[0]];
  for (let i = 1; i < path.length; i += 1) {
    if (value == null) return undefined;
    value = value[path[i]];
  }
  return value;
}

/* ---------- template directives ---------- */

/**
 * Finds the first `<tag ...>` at or after `from` and returns it together with the
 * index range of its matching close tag, honouring nesting of the same tag name.
 */
function findBlock(html, tag, from = 0) {
  const open = new RegExp(`<${tag}(\\s[^>]*)?>`, "g");
  open.lastIndex = from;
  const start = open.exec(html);
  if (!start) return null;

  const scanner = new RegExp(`<${tag}(?:\\s[^>]*)?>|</${tag}>`, "g");
  scanner.lastIndex = start.index;
  let depth = 0;
  let match;
  while ((match = scanner.exec(html))) {
    depth += match[0].startsWith(`</`) ? -1 : 1;
    if (depth === 0) {
      return {
        openStart: start.index,
        innerStart: start.index + start[0].length,
        innerEnd: match.index,
        end: match.index + match[0].length,
        attrs: start[1] || ""
      };
    }
  }
  throw new Error(`Unclosed <${tag}> in template`);
}

const readAttr = (attrs, name) => {
  const match = attrs.match(new RegExp(`${name}="([^"]*)"`));
  return match ? match[1] : null;
};

const unwrapExpr = (value) => {
  const match = value && value.match(/^\{\{\s*(.+?)\s*\}\}$/);
  return match ? match[1] : null;
};

/** Adds attributes to the first element tag found in a fragment. */
function addAttrsToFirstTag(html, extra) {
  return html.replace(/<([a-zA-Z][\w-]*)((?:\s[^>]*?)?)(\/?)>/, (m, tag, attrs, close) =>
    `<${tag}${attrs} ${extra}${close}>`
  );
}

function expandDirectives(html, scope) {
  // sc-for: expand the body once per item, with the loop variable in scope.
  for (;;) {
    const block = findBlock(html, "sc-for");
    if (!block) break;

    const listExpr = unwrapExpr(readAttr(block.attrs, "list"));
    const alias = readAttr(block.attrs, "as");
    if (!listExpr || !alias) throw new Error(`<sc-for${block.attrs}> is missing list/as`);

    const items = resolve(listExpr, scope);
    if (!Array.isArray(items)) throw new Error(`<sc-for list="${listExpr}"> did not resolve to an array`);

    const body = html.slice(block.innerStart, block.innerEnd);
    const expanded = items
      .map((item) => expandDirectives(body, { ...scope, [alias]: item }))
      .join("");

    html = html.slice(0, block.openStart) + expanded + html.slice(block.end);
  }

  // sc-if: statically true conditions are unwrapped; interactive ones become panels.
  for (;;) {
    const block = findBlock(html, "sc-if");
    if (!block) break;

    const condition = unwrapExpr(readAttr(block.attrs, "value"));
    let body = html.slice(block.innerStart, block.innerEnd);

    if (condition in RUNTIME_PANELS) {
      body = addAttrsToFirstTag(body, `data-panel="${RUNTIME_PANELS[condition]}" hidden`);
    } else if (!resolve(condition, scope)) {
      body = "";
    }

    html = html.slice(0, block.openStart) + body + html.slice(block.end);
  }

  // Resolve while this scope is still current; outer scopes fill in on the way up.
  return interpolate(html, scope);
}

/** Fills in `{{ expr }}` occurrences, leaving handler bindings for the next pass. */
function interpolate(html, scope) {
  return html.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (whole, expr) => {
    const value = resolve(expr, scope);
    return value === undefined || value === null ? whole : escapeHtml(value);
  });
}

/* ---------- interaction styles ---------- */

class StyleSheet {
  constructor() {
    this.rules = new Map(); // declarations -> class name
    this.order = [];
  }

  classFor(declarations, state) {
    const normalised = declarations
      .split(";")
      .map((d) => d.trim())
      .filter(Boolean)
      .map((d) => (/!important$/.test(d) ? d : `${d} !important`))
      .join("; ");

    const key = `${state}|${normalised}`;
    if (!this.rules.has(key)) {
      const name = `dc-${state === "hover" ? "h" : "a"}${this.rules.size}`;
      this.rules.set(key, name);
      this.order.push({ name, state, declarations: normalised });
    }
    return this.rules.get(key);
  }

  toCss() {
    // :hover first, then :active, so a pressed element wins over the hover rule.
    const byState = (want) => this.order.filter((r) => r.state === want);
    const render = (r) => `.${r.name}:${r.state} { ${r.declarations}; }`;
    return [
      "/* Generated by tools/build.mjs from style-hover / style-active in the design handoff. */",
      "/* Declarations are !important because the design applies every base style inline. */",
      "",
      ...byState("hover").map(render),
      "",
      ...byState("active").map(render),
      ""
    ].join("\n");
  }
}

/** Turns style-hover / style-active into classes, and handler/ref bindings into data hooks. */
function lowerInteractions(html, sheet) {
  const handlers = {
    onClick: "data-on-click",
    onMouseEnter: "data-on-mouseenter",
    onMouseLeave: "data-on-mouseleave",
    onFocus: "data-on-focus",
    onBlur: "data-on-blur"
  };

  return html.replace(/<([a-zA-Z][\w-]*)((?:\s[^>]*?)?)(\/?)>/g, (whole, tag, attrs, close) => {
    if (!/style-hover=|style-active=|ref="\{\{|on[A-Z]\w+="\{\{/.test(attrs)) return whole;

    const added = [];

    attrs = attrs.replace(/\s*style-(hover|active)="([^"]*)"/g, (_m, state, decls) => {
      added.push(sheet.classFor(decls, state));
      return "";
    });

    attrs = attrs.replace(/\s*ref="\{\{\s*([^}]+?)\s*\}\}"/g, (_m, name) => ` data-ref="${name.trim()}"`);

    for (const [prop, attr] of Object.entries(handlers)) {
      attrs = attrs.replace(
        new RegExp(`\\s*${prop}="\\{\\{\\s*([^}]+?)\\s*\\}\\}"`, "g"),
        (_m, name) => ` ${attr}="${name.trim()}"`
      );
    }

    if (added.length) {
      const existing = attrs.match(/\sclass="([^"]*)"/);
      if (existing) {
        attrs = attrs.replace(existing[0], ` class="${existing[1]} ${added.join(" ")}"`);
      } else {
        attrs += ` class="${added.join(" ")}"`;
      }
    }

    return `<${tag}${attrs}${close}>`;
  });
}

/* ---------- document assembly ---------- */

function section(html, open, close) {
  const start = html.indexOf(open);
  const end = html.indexOf(close, start);
  if (start === -1 || end === -1) throw new Error(`Could not locate ${open} … ${close}`);
  return html.slice(start + open.length, end);
}

const source = await readFile(SOURCE, "utf8");

const helmet = section(source, "<helmet>", "</helmet>");
const pageStyles = section(helmet, "<style>", "</style>");

// Everything after </helmet> up to </x-dc> is the artboard markup.
const template = section(source, "</helmet>", "</x-dc>");

const sheet = new StyleSheet();

let body = expandDirectives(template, {});
body = lowerInteractions(body, sheet);

// The canvas thumbnail is editor chrome, not page content.
body = body.replace(/<template id="__bundler_thumbnail">[\s\S]*?<\/template>/, "");

// Assets ship under assets/uploads/ rather than the project-root uploads/.
body = body.replace(/(src|href)="uploads\//g, '$1="assets/uploads/');

// The design leaves the quote and pickup CTAs as bare anchors (#requestModal,
// #pickupModal) with no modal on the page. They resolve to the live site, which
// owns those modals. Only bare fragments are rewritten — anchors that already
// carry a full URL are left alone.
for (const fragment of ["requestModal", "pickupModal"]) {
  body = body.replaceAll(`href="#${fragment}"`, `href="${LIVE_SITE}#${fragment}"`);
}

const leftoverExpr = body.match(/\{\{[^}]*\}\}/);
if (leftoverExpr) throw new Error(`Unresolved template expression: ${leftoverExpr[0]}`);
const leftoverTag = body.match(/<sc-[a-z]+/);
if (leftoverTag) throw new Error(`Unresolved template directive: ${leftoverTag[0]}`);

// Start from a clean dist/ so removed source files never linger in a deploy.
await rm(OUT, { recursive: true, force: true });
await mkdir(join(OUT, "assets", "css"), { recursive: true });

// Static assets are copied through untouched.
await cp(join(ROOT, "assets"), join(OUT, "assets"), { recursive: true });
await cp(DESIGN_SYSTEM, join(OUT, "assets", "css", "design-system.css"));

await writeFile(join(OUT, "assets", "css", "site.css"), sheet.toCss(), "utf8");

const document = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>L.A. Grinding &amp; Arizona Grinding — Tree Care Industry</title>
<meta name="description" content="LA Grinding is a premier source for industry-grade professional sharpening services. Replacement parts, blades and fitting for the tree care industry, shipping nationwide.">
<link rel="icon" href="assets/uploads/logo-la-arizona-grinding.webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&amp;family=Barlow:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/design-system.css">
<link rel="stylesheet" href="assets/css/page.css">
<link rel="stylesheet" href="assets/css/site.css">
</head>
<body>
${body.trim()}
<script src="assets/js/site.js" defer></script>
</body>
</html>
`;

await writeFile(join(OUT, "index.html"), document, "utf8");

// The design's own <style> block, kept verbatim so its rules stay authoritative.
await writeFile(
  join(OUT, "assets", "css", "page.css"),
  `/* Copied verbatim from the <style> block in the design handoff. */\n${pageStyles.trim()}\n\n` +
    `/* Panels that the design renders conditionally are always in the DOM here. */\n` +
    `[data-panel][hidden] { display: none !important; }\n`,
  "utf8"
);

console.log(
  `built dist/  (index.html ${document.length.toLocaleString()} bytes, ` +
    `${sheet.order.length} interaction rules)`
);
