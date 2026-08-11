(() => {
  // src/validation/story-config.js
  var SUPPORTED_LAYOUTS = /* @__PURE__ */ new Set([
    "cover",
    "origin-map",
    "stack-deck",
    "hero-mosaic",
    "chapter-opener",
    "dense-editorial",
    "focus-wall",
    "film-ribbon",
    "collab-network",
    "polaroid-life",
    "particle-cloud",
    "value-orbit",
    "service-steps",
    "video-editorial",
    "suzhou-routes",
    "values-convergence",
    "finale"
  ]);
  var LAYOUT_MEDIA_MINIMUMS = {
    cover: 1,
    "origin-map": 16,
    "stack-deck": 8,
    "hero-mosaic": 12,
    "chapter-opener": 3,
    "dense-editorial": 10,
    "focus-wall": 12,
    "film-ribbon": 10,
    "collab-network": 10,
    "polaroid-life": 10,
    "particle-cloud": 16,
    "value-orbit": 12,
    "service-steps": 12,
    "video-editorial": 4,
    "suzhou-routes": 8,
    "values-convergence": 16,
    finale: 1
  };
  function validateStoryConfig(config2) {
    const errors = [];
    const warnings = [];
    if (!config2 || typeof config2 !== "object") return { errors: ["STORY_CONFIG \u4E0D\u5B58\u5728"], warnings };
    const chapters = Array.isArray(config2.chapters) ? config2.chapters : [];
    const pages = Array.isArray(config2.pages) ? config2.pages : [];
    if (!chapters.length) errors.push("chapters \u4E0D\u80FD\u4E3A\u7A7A");
    if (!pages.length) errors.push("pages \u4E0D\u80FD\u4E3A\u7A7A");
    const chapterIds = /* @__PURE__ */ new Set();
    for (const chapter of chapters) {
      if (!chapter?.id) errors.push("\u5B58\u5728\u7F3A\u5C11 id \u7684\u7AE0\u8282");
      else if (chapterIds.has(chapter.id)) errors.push(`\u7AE0\u8282 id \u91CD\u590D: ${chapter.id}`);
      else chapterIds.add(chapter.id);
    }
    const pageIds = /* @__PURE__ */ new Set();
    for (const [index, page] of pages.entries()) {
      const label = page?.id || `\u7B2C ${index + 1} \u9875`;
      if (!page?.id) errors.push(`\u7B2C ${index + 1} \u9875\u7F3A\u5C11 id`);
      else if (pageIds.has(page.id)) errors.push(`\u9875\u9762 id \u91CD\u590D: ${page.id}`);
      else pageIds.add(page.id);
      if (!SUPPORTED_LAYOUTS.has(page?.layout)) errors.push(`${label} \u4F7F\u7528\u4E86\u672A\u77E5\u5E03\u5C40: ${page?.layout}`);
      if (!page?.title) warnings.push(`${label} \u7F3A\u5C11\u6807\u9898`);
      if (!Array.isArray(page?.media)) warnings.push(`${label} \u7F3A\u5C11 media \u6570\u7EC4`);
      const minimum = LAYOUT_MEDIA_MINIMUMS[page?.layout] || 0;
      if ((page?.media?.length || 0) < minimum) errors.push(`${label} \u7684 ${page?.layout} \u5E03\u5C40\u81F3\u5C11\u9700\u8981 ${minimum} \u4E2A\u7D20\u6750`);
      for (const [mediaIndex, media] of (page?.media || []).entries()) {
        if (!media?.src) errors.push(`${label} \u7684\u7B2C ${mediaIndex + 1} \u4E2A\u7D20\u6750\u7F3A\u5C11 src`);
        if (!(/* @__PURE__ */ new Set(["image", "video"])).has(media?.type)) errors.push(`${label} \u7684\u7B2C ${mediaIndex + 1} \u4E2A\u7D20\u6750\u7C7B\u578B\u65E0\u6548`);
      }
      if (page?.layout === "video-editorial" && !(page.media || []).some((media) => media.type === "video")) {
        errors.push(`${label} \u7684 video-editorial \u5E03\u5C40\u5FC5\u987B\u5305\u542B\u89C6\u9891`);
      }
    }
    for (const chapter of chapters) {
      if (chapter?.startPageId && !pageIds.has(chapter.startPageId)) errors.push(`${chapter.id} \u7684 startPageId \u4E0D\u5B58\u5728: ${chapter.startPageId}`);
      if (!pages.some((page) => page.chapterId === chapter?.id)) warnings.push(`${chapter?.id || "\u672A\u77E5\u7AE0\u8282"} \u6CA1\u6709\u9875\u9762`);
    }
    for (const page of pages) {
      if (page.chapterId !== "home" && !chapterIds.has(page.chapterId)) errors.push(`${page.id} \u5F15\u7528\u4E86\u4E0D\u5B58\u5728\u7684\u7AE0\u8282: ${page.chapterId}`);
    }
    return { errors, warnings };
  }
  function assertValidStoryConfig(config2) {
    const result = validateStoryConfig(config2);
    if (result.errors.length) throw new Error(`\u6545\u4E8B\u914D\u7F6E\u6821\u9A8C\u5931\u8D25:
- ${result.errors.join("\n- ")}`);
    return result;
  }

  // src/config.js
  var config = window.STORY_CONFIG;
  if (!config) {
    throw new Error("story.config.js \u672A\u6B63\u786E\u52A0\u8F7D");
  }
  var configValidation = assertValidStoryConfig(config);

  // src/core/story-utils.js
  var $ = (selector, root = document) => root.querySelector(selector);
  var $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  var pad = (value) => String(value).padStart(2, "0");
  var clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  var esc = (value = "") => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  var lines = (value = "") => esc(value).replaceAll("\n", "<br>");
  var paragraphs = (value = "") => value.split(/\n\n+/).map((part) => `<p>${esc(part)}</p>`).join("");
  var icons = {
    prev: '<path d="m15 18-6-6 6-6"/><path d="M9 12h10"/>',
    next: '<path d="m9 18 6-6-6-6"/><path d="M5 12h10"/>',
    play: '<path d="m8 5 11 7-11 7z"/>',
    pause: '<path d="M9 5v14M15 5v14"/>',
    music: '<path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/>',
    mute: '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="m19 9-6 6m0-6 6 6"/>',
    expand: '<path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/>',
    restart: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>'
  };
  var icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`;
  var cmbMark = (className = "") => `<svg class="${className}" viewBox="0 0 72 72" aria-hidden="true" focusable="false">
<circle cx="36" cy="36" r="34" fill="currentColor"/>
<path fill="#fff8ef" d="M12 47.5 24.7 22l11.2 19.1L47.1 22 60 47.5h-9.1l-4.4-9.2-10.6 18-10.7-18-4.3 9.2H12Zm18.8 0h10.4l-5.2-9.2-5.2 9.2Z"/>
<path fill="#fff8ef" d="M47.5 27.3h11.2l1.8 3.7H49.3l-1.8-3.7Zm2.8 5.7h11.1l1.8 3.7H52.1L50.3 33Zm2.9 5.7h11l1.8 3.7H55l-1.8-3.7Z" opacity=".92"/>
  </svg>`;
  var PAGE_CURVE_TOP = 0.032;
  var PAGE_CURVE_BOTTOM = 0.032;
  var BOOK_LEFT_RATIO = 0.42;
  function pageCurveProfile(side, t) {
    const peak = side === "left" ? 0.7 : 0.22;
    const depth = side === "left" ? 1 : 0.89;
    if (t <= peak) {
      const denom2 = Math.max(peak, 1e-3);
      return depth * Math.max(0, 1 - Math.pow((t - peak) / denom2, 2));
    }
    const denom = Math.max(1 - peak, 1e-3);
    return depth * Math.max(0, 1 - Math.pow((t - peak) / denom, 2));
  }
  function pageArchPath(side, samples = 40) {
    const points = [];
    for (let i = 0; i <= samples; i++) {
      const t = i / samples;
      const lift = pageCurveProfile(side, t);
      const x = (t * 100).toFixed(3);
      const y = (100 - lift * 100).toFixed(3);
      points.push(`${x},${y}`);
    }
    return `M 0 100 L ${points.join(" L ")} L 100 100 Z`;
  }
  function pageCurveClipPath(side, topAmplitude = PAGE_CURVE_TOP, bottomAmplitude = PAGE_CURVE_BOTTOM, samples = 34) {
    const topBand = topAmplitude * 100;
    const bottomBand = bottomAmplitude * 100;
    const top = [];
    const bottom = [];
    for (let i = 0; i <= samples; i++) {
      const t = i / samples;
      const x = t * 100;
      const lift = pageCurveProfile(side, t);
      top.push(`${x.toFixed(3)}% ${(topBand * (1 - lift)).toFixed(3)}%`);
    }
    for (let i = samples; i >= 0; i--) {
      const t = i / samples;
      const x = t * 100;
      const lift = pageCurveProfile(side, t);
      bottom.push(`${x.toFixed(3)}% ${(100 - bottomBand * (1 - lift)).toFixed(3)}%`);
    }
    return `polygon(${top.concat(bottom).join(",")})`;
  }
  function bookSpreadClipPath(samples = 42) {
    const top = [];
    const bottom = [];
    for (const side of ["left", "right"]) {
      for (let i = side === "left" ? 0 : 1; i <= samples; i++) {
        const t = i / samples;
        const leftPercent = BOOK_LEFT_RATIO * 100;
        const x = side === "left" ? t * leftPercent : leftPercent + t * (100 - leftPercent);
        const lift = pageCurveProfile(side, t);
        top.push(`${x.toFixed(3)}% ${(PAGE_CURVE_TOP * 100 * (1 - lift)).toFixed(3)}%`);
      }
    }
    for (const side of ["right", "left"]) {
      for (let i = samples; i >= (side === "right" ? 0 : 0); i--) {
        if (side === "left" && i === samples) continue;
        const t = i / samples;
        const leftPercent = BOOK_LEFT_RATIO * 100;
        const x = side === "left" ? t * leftPercent : leftPercent + t * (100 - leftPercent);
        const lift = pageCurveProfile(side, t);
        bottom.push(`${x.toFixed(3)}% ${(100 - PAGE_CURVE_BOTTOM * 100 * (1 - lift)).toFixed(3)}%`);
      }
    }
    return `polygon(${top.concat(bottom).join(",")})`;
  }
  function bookSpreadPath(outward = 0, samples = 50) {
    const amplitude = 600 * PAGE_CURVE_TOP;
    const scale = 1 + outward / 500;
    const seamX = 1e3 * BOOK_LEFT_RATIO;
    const mapX = (x) => seamX + (x - seamX) * scale;
    const points = (side) => Array.from({ length: samples + 1 }, (_, index) => {
      const t = index / samples;
      const sideStart = side === "left" ? 0 : seamX;
      const sideWidth = side === "left" ? seamX : 1e3 - seamX;
      return { x: sideStart + t * sideWidth, lift: pageCurveProfile(side, t) };
    });
    const left = points("left");
    const right = points("right");
    const top = left.concat(right.slice(1)).map((point) => `${mapX(point.x).toFixed(2)},${(amplitude * (1 - point.lift) - outward).toFixed(2)}`);
    const bottom = right.slice().reverse().concat(left.slice(0, -1).reverse()).map((point) => `${mapX(point.x).toFixed(2)},${(600 - amplitude * (1 - point.lift) + outward).toFixed(2)}`);
    return `M${top.join(" L")} L${bottom.join(" L")} Z`;
  }
  function bookGeometrySvg() {
    return `<svg class="book-geometry-svg" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id="formal-cover-red" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9a3d43"/><stop offset=".52" stop-color="#7f2d34"/><stop offset="1" stop-color="#68232a"/></linearGradient></defs>
      <path class="formal-cover-path" d="${bookSpreadPath(14)}"/>
      <path class="formal-cover-inset" d="${bookSpreadPath(10)}"/>
      <path class="formal-paper-depth depth-back" d="${bookSpreadPath(9)}"/>
      <path class="formal-paper-depth depth-mid" d="${bookSpreadPath(6)}"/>
      <path class="formal-paper-depth depth-near" d="${bookSpreadPath(3)}"/>
    </svg>`;
  }
  function pageArchSvg(side) {
    const d = pageArchPath(side);
    const gradId = `arch-${side}-paper`;
    return `<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${side === "left" ? "#f0e3cf" : "#f7eee1"}"/>
          <stop offset="1" stop-color="${side === "left" ? "#e7d6bd" : "#eadbc5"}"/>
        </linearGradient>
      </defs>
      <path class="arch-layer arch-layer-back" d="${d}" transform="translate(0 10)"/>
      <path class="arch-layer arch-layer-mid" d="${d}" transform="translate(0 6)"/>
      <path class="arch-layer arch-layer-near" d="${d}" transform="translate(0 3)"/>
      <path class="arch-layer arch-layer-surface" d="${d}" fill="url(#${gradId})"/>
    </svg>`;
  }
  var SeededRandom = class {
    constructor(seed) {
      this.seed = seed % 2147483647 || 1;
    }
    next() {
      this.seed = this.seed * 16807 % 2147483647;
      return (this.seed - 1) / 2147483646;
    }
    between(min, max) {
      return min + (max - min) * this.next();
    }
  };
  function packGrid(count, columns, rows, hero = true, reserved) {
    const occupied = Array.from({ length: rows }, () => Array(columns).fill(false));
    const cells = [];
    const mark = (col, row, colSpan, rowSpan) => {
      for (let y = row; y < row + rowSpan; y++)
        for (let x = col; x < col + colSpan; x++)
          occupied[y][x] = true;
    };
    const fits = (col, row, colSpan, rowSpan) => {
      if (col + colSpan > columns || row + rowSpan > rows)
        return false;
      for (let y = row; y < row + rowSpan; y++)
        for (let x = col; x < col + colSpan; x++)
          if (occupied[y][x])
            return false;
      return true;
    };
    if (reserved)
      mark(reserved.col, reserved.row, reserved.colSpan, reserved.rowSpan);
    if (hero && count > 0) {
      const heroCell = { col: 0, row: 0, colSpan: Math.max(5, Math.floor(columns * 0.42)), rowSpan: Math.max(5, Math.floor(rows * 0.62)) };
      cells.push(heroCell);
      mark(heroCell.col, heroCell.row, heroCell.colSpan, heroCell.rowSpan);
    }
    const sizes = [[4, 3], [3, 3], [3, 2], [2, 3], [4, 2], [2, 2], [3, 2]];
    for (let index = cells.length; index < count; index++) {
      let [colSpan, rowSpan] = sizes[index % sizes.length];
      let placed = null;
      for (let shrink = 0; shrink < 3 && !placed; shrink++) {
        for (let row = 0; row < rows && !placed; row++) {
          for (let col = 0; col < columns && !placed; col++) {
            if (fits(col, row, colSpan, rowSpan))
              placed = { col, row, colSpan, rowSpan };
          }
        }
        if (!placed) {
          colSpan = Math.max(1, colSpan - 1);
          rowSpan = Math.max(1, rowSpan - 1);
        }
      }
      if (!placed) {
        outer: for (let row = 0; row < rows; row++)
          for (let col = 0; col < columns; col++) {
            if (fits(col, row, 1, 1)) {
              placed = { col, row, colSpan: 1, rowSpan: 1 };
              break outer;
            }
          }
      }
      if (!placed)
        placed = { col: index * 2 % columns, row: index * 3 % rows, colSpan: 1, rowSpan: 1 };
      cells.push(placed);
      mark(placed.col, placed.row, placed.colSpan, placed.rowSpan);
    }
    return cells;
  }
  function focusWallLayout(count) {
    const desktopCols = count <= 24 ? 4 : count <= 25 ? 5 : count <= 36 ? 6 : count <= 49 ? 7 : 8;
    const desktopRows = Math.max(1, Math.ceil(count / desktopCols));
    const mobileCols = count <= 12 ? 3 : 4;
    const mobileRows = Math.max(1, Math.ceil(count / mobileCols));
    const landscapeCols = count <= 16 ? 4 : count <= 32 ? 8 : 10;
    const landscapeRows = Math.max(1, Math.ceil(count / landscapeCols));
    return { desktopCols, desktopRows, mobileCols, mobileRows, landscapeCols, landscapeRows };
  }
  function focusWallOrigin(index, cols, rows) {
    const row = Math.floor(index / cols);
    const col = index % cols;
    const x = col === 0 ? "left" : col === cols - 1 ? "right" : "center";
    const y = row === 0 ? "top" : row === rows - 1 ? "bottom" : "center";
    return `${x} ${y}`;
  }
  function mediaElement(media, className = "", index = 0) {
    const style = `--media-index:${index};--focal:${media.focal ?? "center"};object-position:${media.focal ?? "center"};object-fit:${media.fit ?? "cover"}`;
    if (media.type === "video") {
      return `<figure class="media-frame ${className}" data-media-index="${index}">
    <video class="story-video" src="${media.src}" poster="${media.poster ?? ""}" playsinline preload="metadata" style="${style}" aria-label="${esc(media.alt)}"></video>
    <div class="video-badge"><i></i><span>\u5F71\u50CF</span><b class="video-time">00:00</b></div>
    ${media.caption ? `<figcaption>${esc(media.caption)}</figcaption>` : ""}
  </figure>`;
    }
    return `<figure class="media-frame ${className}" data-media-index="${index}">
  <img data-deferred-src="${media.src}" alt="${esc(media.alt)}" draggable="false" loading="lazy" decoding="async" fetchpriority="${index < 4 ? "high" : "low"}" style="${style}">
  ${media.caption ? `<figcaption>${esc(media.caption)}</figcaption>` : ""}
</figure>`;
  }
  function chapterMark(page) {
    if (!page.chapterNumber)
      return "";
    return `<div class="chapter-mark"><strong>${esc(page.chapterNumber)}</strong><span>\u7BC7\u7AE0</span></div>`;
  }
  function pageIntro(page, compact = false) {
    return `<div class="page-copy ${compact ? "is-compact" : ""}">
  ${chapterMark(page)}
  ${page.kicker ? `<span class="kicker">${esc(page.kicker)}</span>` : ""}
  <h1>${lines(page.title)}</h1>
  ${page.subtitle ? `<p class="subtitle">${esc(page.subtitle)}</p>` : ""}
  ${page.body ? `<div class="body-copy">${paragraphs(page.body)}</div>` : ""}
  ${page.note ? `<p class="page-note">${esc(page.note)}</p>` : ""}
  ${page.culture ? `<p class="culture-note"><span>${esc(page.culture)}</span></p>` : ""}
  ${page.quote ? `<blockquote>${esc(page.quote)}</blockquote>` : ""}
</div>`;
  }

  // src/render/page-renderer.js
  function renderPage(page) {
    const media = page.media ?? [];
    if (page.layout === "cover") {
      return `<article class="story-page layout-cover chapter-${page.chapterId}" data-layout="cover" data-chapter="${page.chapterId}">
    <div class="cover-image"><img src="${media[0]?.src ?? ""}" alt="${esc(media[0]?.alt ?? "")}"></div>
    <div class="cover-vignette"></div><div class="cover-grain"></div>
    <div class="cover-standard-emblem" aria-hidden="true">${config.settings.brandEmblem ? `<img src="${config.settings.brandEmblem}" alt="">` : cmbMark("cmb-cover-emblem")}</div>
    <section class="cover-board">
      <span class="cover-kicker">${esc(page.kicker ?? "")}</span>
      <span class="cover-rule"></span>
      <h1>${page.title.split("\n").map((line, index) => `<span class="cover-title-line line-${index + 1}">${esc(line)}</span>`).join("<br>")}</h1>
      <p>${esc(page.subtitle ?? "")}</p>
      ${page.headline ? `<strong class="cover-theme-line">${esc(page.headline)}</strong>` : ""}
      ${page.body ? `<div class="cover-description">${paragraphs(page.body)}</div>` : ""}
      <button type="button" class="start-story"><span>\u7FFB\u5F00\u6545\u4E8B</span><i>${icon("next")}</i></button>
      <small>${esc(page.meta ?? "")}</small>
    </section>
    <div class="cover-edge"></div>
  </article>`;
    }
    if (page.layout === "origin-map") {
      const origins = [["\u5317\u4EAC", "\u5317\u4EAC", 67.84, 28.74], ["\u5929\u6D25", "\u5929\u6D25", 68.98, 30.18], ["\u6CB3\u5317", "\u77F3\u5BB6\u5E84", 65.12, 32], ["\u5C71\u897F", "\u592A\u539F", 62.29, 32.33], ["\u5185\u8499\u53E4", "\u547C\u548C\u6D69\u7279", 61.14, 27.09], ["\u8FBD\u5B81", "\u6C88\u9633", 77.93, 25.4], ["\u5409\u6797", "\u957F\u6625", 80.65, 21.87], ["\u9ED1\u9F99\u6C5F", "\u54C8\u5C14\u6EE8", 82.39, 18.38], ["\u4E0A\u6D77", "\u4E0A\u6D77", 75.12, 43.96], ["\u6C5F\u82CF", "\u5357\u4EAC", 71.27, 42.5], ["\u6D59\u6C5F", "\u676D\u5DDE", 73.22, 45.64], ["\u5B89\u5FBD", "\u5408\u80A5", 69.01, 42.92], ["\u798F\u5EFA", "\u798F\u5DDE", 71.99, 53.01], ["\u6C5F\u897F", "\u5357\u660C", 67.05, 48.43], ["\u5C71\u4E1C", "\u6D4E\u5357", 68.86, 34.44], ["\u6CB3\u5357", "\u90D1\u5DDE", 63.84, 37.79], ["\u6E56\u5317", "\u6B66\u6C49", 64.81, 45.08], ["\u6E56\u5357", "\u957F\u6C99", 62.85, 49.23], ["\u5E7F\u4E1C", "\u5E7F\u5DDE", 63.32, 58.17], ["\u5E7F\u897F", "\u5357\u5B81", 56.28, 58.72], ["\u6D77\u5357", "\u6D77\u53E3", 58.91, 63.59], ["\u91CD\u5E86", "\u91CD\u5E86", 53.67, 46.88], ["\u56DB\u5DDD", "\u6210\u90FD", 50.1, 45.11], ["\u8D35\u5DDE", "\u8D35\u9633", 53.78, 52], ["\u4E91\u5357", "\u6606\u660E", 48.32, 55.1], ["\u897F\u85CF", "\u62C9\u8428", 31.52, 46.74], ["\u9655\u897F", "\u897F\u5B89", 57.1, 38.5], ["\u7518\u8083", "\u5170\u5DDE", 49.76, 35.48], ["\u9752\u6D77", "\u897F\u5B81", 46.81, 34.5], ["\u5B81\u590F", "\u94F6\u5DDD", 53.21, 31.22], ["\u65B0\u7586", "\u4E4C\u9C81\u6728\u9F50", 26.45, 21.85], ["\u9999\u6E2F", "\u9999\u6E2F", 64.62, 59.6], ["\u6FB3\u95E8", "\u6FB3\u95E8", 63.72, 59.81], ["\u53F0\u6E7E", "\u53F0\u5317", 75.25, 54.83]];
      const suzhou = [73.84, 43.84];
      const routeMarkup = origins.map((origin, index) => {
        const [province, city, x, y] = origin;
        const sx = suzhou[0], sy = suzhou[1];
        const bend = Math.max(6, Math.min(18, Math.abs(sx - x) * 0.22 + Math.abs(sy - y) * 0.12));
        const cx = (x + sx) / 2;
        const cy = Math.max(3.8, Math.min(y, sy) - bend);
        return `<path class="origin-route" data-origin-route="${index}" data-origin-name="${esc(province)}\xB7${esc(city)}" d="M ${x} ${y} Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${sx} ${sy}" pathLength="1"></path>`;
      }).join("");
      const originDots = origins.map((origin, index) => {
        const [province, city, x, y] = origin;
        return `<g class="origin-source" data-origin-source="${index}" data-origin-name="${esc(province)}\xB7${esc(city)}" transform="translate(${x} ${y})"><title>${esc(province)} \xB7 ${esc(city)}</title><circle r=".32"></circle><circle class="origin-source-halo" r=".72"></circle></g>`;
      }).join("");
      const flashMedia = media.slice(0, 16);
      return `<article class="story-page layout-origin-map chapter-${page.chapterId}" data-layout="origin-map" data-chapter="${page.chapterId}">
    <div class="origin-map-grid" aria-hidden="true"></div>
    <svg class="origin-map-svg" viewBox="0 0 100 72" preserveAspectRatio="xMidYMid meet" aria-label="\u6C47\u805A\u82CF\u5DDE">
      <defs>
        <filter id="originGlow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation=".55" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <path class="china-outline" d="M 59.11 65.98 L 57.87 66.83 L 56.69 66.28 L 56.65 64.77 L 57.36 63.98 L 58.93 63.49 L 59.76 63.53 L 60.08 64.20 L 59.45 64.97 L 59.11 65.98 Z M 84.01 11.44 L 86.51 12.00 L 88.21 13.25 L 88.79 14.90 L 90.98 14.90 L 92.22 14.21 L 94.60 13.69 L 93.84 15.27 L 93.29 15.91 L 92.79 17.83 L 91.83 19.54 L 90.08 19.23 L 88.85 19.85 L 89.23 21.35 L 89.02 23.43 L 88.29 23.47 L 88.30 24.37 L 87.37 23.33 L 86.80 24.31 L 84.58 25.07 L 84.80 25.99 L 83.56 25.93 L 82.87 25.38 L 81.89 26.62 L 80.30 27.57 L 79.13 28.69 L 77.12 29.20 L 76.06 30.02 L 74.52 30.50 L 75.28 29.69 L 74.98 29.01 L 76.12 27.83 L 75.36 26.91 L 74.10 27.53 L 72.48 28.75 L 71.60 29.88 L 70.19 29.96 L 69.45 30.78 L 70.21 31.97 L 71.39 32.26 L 71.44 33.05 L 72.57 33.56 L 74.18 32.31 L 75.46 32.99 L 76.39 33.04 L 76.62 33.95 L 74.59 34.44 L 73.92 35.39 L 72.52 36.27 L 71.78 37.50 L 73.33 38.46 L 73.89 40.19 L 74.77 41.80 L 75.74 43.15 L 75.72 44.45 L 74.82 44.93 L 75.16 45.87 L 76.01 46.41 L 75.79 47.84 L 75.42 49.23 L 74.62 49.39 L 73.57 51.29 L 72.40 53.59 L 71.07 55.69 L 69.09 57.30 L 67.09 58.78 L 65.47 58.98 L 64.59 59.76 L 64.10 59.19 L 63.28 60.07 L 61.28 60.94 L 59.75 61.21 L 59.26 63.07 L 58.47 63.17 L 58.09 61.90 L 58.43 61.22 L 56.50 60.66 L 55.82 60.94 L 54.37 60.49 L 53.69 59.77 L 53.92 58.76 L 52.60 58.44 L 51.91 57.78 L 50.69 58.72 L 49.29 58.92 L 48.14 58.91 L 47.37 59.34 L 46.62 59.60 L 46.84 61.60 L 46.08 61.56 L 45.95 61.14 L 45.90 60.42 L 44.85 60.93 L 44.23 60.61 L 43.16 59.95 L 43.58 58.49 L 42.67 58.15 L 42.32 56.53 L 40.81 56.83 L 40.98 54.74 L 42.34 53.28 L 42.40 51.83 L 42.36 50.49 L 41.73 50.07 L 41.25 49.04 L 40.41 49.17 L 38.86 48.91 L 39.34 48.17 L 38.67 47.08 L 37.64 47.82 L 36.44 47.38 L 34.78 48.50 L 33.47 49.81 L 32.31 50.03 L 31.68 49.56 L 30.93 49.51 L 29.90 49.11 L 29.12 49.55 L 28.17 50.86 L 28.05 49.47 L 27.17 49.84 L 25.50 49.67 L 23.87 49.27 L 22.70 48.50 L 21.59 48.15 L 21.10 47.31 L 20.30 47.06 L 18.85 45.91 L 17.69 45.37 L 17.10 45.79 L 15.10 44.57 L 13.69 43.46 L 13.28 41.52 L 14.32 41.76 L 14.36 40.86 L 13.79 39.96 L 13.94 38.53 L 12.39 36.48 L 10.03 35.77 L 9.60 34.42 L 8.54 33.60 L 8.28 33.10 L 8.07 32.10 L 8.12 31.41 L 7.25 31.01 L 6.77 31.19 L 6.41 29.57 L 6.82 29.16 L 6.62 28.75 L 7.99 27.93 L 8.99 27.58 L 10.51 27.82 L 11.05 26.70 L 12.89 26.49 L 13.41 25.79 L 15.67 24.84 L 15.87 24.44 L 15.76 23.44 L 16.75 22.99 L 15.45 19.94 L 18.30 19.24 L 19.03 18.85 L 20.07 15.70 L 22.92 16.28 L 23.72 15.49 L 23.79 13.73 L 24.99 13.57 L 26.08 12.40 L 26.64 12.25 L 27.02 13.48 L 28.23 14.41 L 30.28 15.07 L 31.27 16.48 L 30.72 18.53 L 31.23 19.29 L 32.94 19.59 L 34.88 19.84 L 36.62 20.93 L 37.50 21.13 L 38.16 22.74 L 39.00 23.78 L 40.59 23.74 L 43.55 24.14 L 45.47 23.89 L 46.88 24.15 L 49.01 25.22 L 50.75 25.22 L 51.39 25.76 L 53.06 24.82 L 55.38 24.21 L 57.54 24.15 L 59.22 23.53 L 60.25 22.59 L 61.26 22.00 L 61.02 21.42 L 60.56 20.75 L 61.32 19.61 L 62.13 19.77 L 63.60 20.13 L 65.04 19.20 L 67.23 18.52 L 68.28 17.36 L 69.29 16.86 L 71.38 16.63 L 72.52 16.82 L 72.67 16.20 L 71.37 14.97 L 70.22 14.41 L 69.11 15.06 L 67.69 14.79 L 66.88 15.01 L 66.51 14.29 L 67.53 12.54 L 68.23 11.22 L 69.95 11.88 L 71.98 10.77 L 71.96 10.00 L 73.26 8.14 L 74.06 7.57 L 74.04 6.60 L 73.25 6.19 L 74.44 5.31 L 76.23 5.00 L 78.13 4.95 L 80.29 5.47 L 81.55 6.12 L 82.44 7.89 L 82.98 8.64 L 83.48 9.72 L 84.01 11.44 Z"></path>
      <path class="china-island china-taiwan" d="M 75.56 55.95 L 74.69 58.77 L 74.07 60.21 L 73.32 58.73 L 73.15 57.42 L 74.00 55.70 L 75.15 54.37 L 75.80 54.90 L 75.56 55.95 Z"></path>
      <g class="origin-routes">${routeMarkup}</g>
      <g class="origin-sources">${originDots}</g>
      <g class="suzhou-node" transform="translate(${suzhou[0]} ${suzhou[1]})" filter="url(#originGlow)"><circle class="suzhou-halo h1" r="4"></circle><circle class="suzhou-halo h2" r="2.4"></circle><circle class="suzhou-core" r="1.05"></circle></g>
    </svg>
    <div class="origin-suzhou-label" aria-hidden="true"><b>\u82CF\u5DDE</b><span>SUZHOU</span></div>
    <div class="origin-capital-readout" aria-hidden="true"><span>\u5168\u56FD\u5404\u5730</span><b>\u6C47\u5411\u82CF\u5DDE</b></div>
    <div class="origin-photo-flashes">
      ${flashMedia.map((item, index) => `<div class="origin-flash flash-${index + 1}" data-origin-flash="${index}">${mediaElement(item, "", index)}</div>`).join("")}
    </div>
    <div class="origin-count"><strong>\u6C47\u5411\u82CF\u5DDE</strong><span>FROM ACROSS CHINA</span></div>
    <section class="origin-final-copy">${pageIntro(page, true)}</section>
  </article>`;
    }
    if (page.layout === "chapter-opener") {
      return `<article class="story-page layout-chapter-opener chapter-${page.chapterId}" data-layout="chapter-opener" data-chapter="${page.chapterId}">
    <section class="chapter-copy">${pageIntro(page)}</section>
    <section class="chapter-visual">
      ${mediaElement(media[0], "chapter-hero", 0)}
      <div class="chapter-mini-grid">
        ${media.slice(1).map((item, i) => mediaElement(item, "chapter-mini", i + 1)).join("")}
      </div>
      <span class="page-folio">${esc(page.pageLabel)}</span>
    </section>
  </article>`;
    }
    if (page.layout === "hero-mosaic") {
      const cells = packGrid(media.length, 20, 12, true, { col: 12, row: 7, colSpan: 8, rowSpan: 5 });
      return `<article class="story-page layout-hero-mosaic chapter-${page.chapterId}" data-layout="hero-mosaic" data-chapter="${page.chapterId}">
    <div class="mosaic-grid">
      ${media.map((item, index) => {
        const cell = cells[index];
        return `<div class="mosaic-cell ${index === (page.heroIndex ?? 0) ? "is-hero" : ""}" style="grid-column:${cell.col + 1}/span ${cell.colSpan};grid-row:${cell.row + 1}/span ${cell.rowSpan}">${mediaElement(item, "", index)}</div>`;
      }).join("")}
    </div>
    <section class="mosaic-caption-card">${pageIntro(page, true)}</section>
  </article>`;
    }
    if (page.layout === "collab-network") {
      const items = media.slice(0, 14);
      const positions = [[49, 17], [66, 10], [82, 19], [91, 35], [88, 55], [78, 72], [60, 79], [44, 70], [38, 51], [40, 31], [57, 30], [74, 31], [76, 53], [58, 57]];
      const cx = 66, cy = 45;
      return `<article class="story-page layout-collab-network chapter-${page.chapterId}" data-layout="collab-network" data-chapter="${page.chapterId}">
    <div class="collab-network-field" aria-hidden="true">
      <svg class="collab-network-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        ${items.map((_, i) => {
        const pos = positions[i % positions.length];
        return `<line data-network-line="${i}" x1="${cx}" y1="${cy}" x2="${pos[0]}" y2="${pos[1]}" pathLength="1"></line>`;
      }).join("")}
      </svg>
      <div class="collab-hub"><span></span><i></i><b>\u5F00\u653E</b></div>
      ${items.map((item, i) => {
        const pos = positions[i % positions.length];
        return `<div class="collab-node node-${i % 6 + 1}" data-network-node="${i}" style="--nx:${pos[0]}%;--ny:${pos[1]}%">${mediaElement(item, "", i)}</div>`;
      }).join("")}
    </div>
    <section class="collab-copy">${pageIntro(page)}</section>
  </article>`;
    }
    if (page.layout === "polaroid-life") {
      const items = media.slice(0, 18);
      return `<article class="story-page layout-polaroid-life chapter-${page.chapterId}" data-layout="polaroid-life" data-chapter="${page.chapterId}">
    <div class="polaroid-paper-lines" aria-hidden="true"></div>
    <section class="polaroid-copy">${pageIntro(page)}</section>
    <div class="polaroid-board" data-polaroid-count="${items.length}">
      ${items.map((item, i) => `<div class="polaroid-card polaroid-${i % 12 + 1}" data-polaroid-index="${i}">${mediaElement(item, "", i)}<span>${pad(i + 1)}</span></div>`).join("")}
    </div>
  </article>`;
    }
    if (page.layout === "value-orbit") {
      const ringItems = media.slice(0, 8);
      const stripItems = media.slice(8, 12);
      const positions = [[56, 20], [75, 25], [86, 42], [75, 59], [56, 64], [37, 59], [26, 42], [37, 25]];
      const cx = 56, cy = 42;
      return `<article class="story-page layout-value-orbit chapter-${page.chapterId}" data-layout="value-orbit" data-chapter="${page.chapterId}">
    <section class="value-orbit-copy">${pageIntro(page)}</section>
    <div class="value-orbit-stage">
      <svg class="value-orbit-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        ${ringItems.map((_, i) => {
        const pos = positions[i % positions.length];
        return `<line data-value-line="${i}" x1="${cx}" y1="${cy}" x2="${pos[0]}" y2="${pos[1]}" pathLength="1"></line>`;
      }).join("")}
      </svg>
      <div class="value-orbit-core"><span></span><b>${esc(page.culture ?? "")}</b></div>
      ${ringItems.map((item, i) => {
        const pos = positions[i % positions.length];
        return `<div class="value-orbit-node node-${i % 4 + 1}" data-value-node="${i}" style="--vx:${pos[0]}%;--vy:${pos[1]}%">${mediaElement(item, "", i)}</div>`;
      }).join("")}
      ${stripItems.length ? `<div class="value-orbit-strip" style="--orbit-strip-count:${stripItems.length}">${stripItems.map((item, i) => mediaElement(item, "", i + 8)).join("")}</div>` : ""}
    </div>
  </article>`;
    }
    if (page.layout === "service-steps") {
      const items = media.slice(0, 12);
      const groups = [[], [], []];
      items.forEach((item, i) => groups[i % 3].push({ item, index: i }));
      return `<article class="story-page layout-service-steps chapter-${page.chapterId}" data-layout="service-steps" data-chapter="${page.chapterId}">
    <section class="service-steps-copy">${pageIntro(page)}</section>
    <div class="service-steps-stage">
      ${groups.map((group, gi) => `<section class="service-lane lane-${gi + 1}" data-service-lane="${gi}"><div class="service-lane-index">0${gi + 1}</div><div class="service-lane-grid">${group.map(({ item, index }) => `<div class="service-step-photo" data-service-photo="${index}">${mediaElement(item, "", index)}</div>`).join("")}</div></section>`).join("")}
      <div class="service-flow-line" aria-hidden="true"><i></i><i></i><i></i></div>
    </div>
  </article>`;
    }
    if (page.layout === "suzhou-routes") {
      const items = media.slice(0, 12);
      const positions = [[56, 13], [69, 17], [78, 28], [82, 42], [78, 56], [69, 67], [56, 71], [43, 67], [34, 56], [30, 42], [34, 28], [43, 17]];
      const cx = 56, cy = 42;
      return `<article class="story-page layout-suzhou-routes chapter-${page.chapterId}" data-layout="suzhou-routes" data-chapter="${page.chapterId}">
    <section class="suzhou-routes-copy">${pageIntro(page)}</section>
    <div class="suzhou-routes-stage">
      <svg class="suzhou-route-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        ${items.map((_, i) => {
        const pos = positions[i % positions.length];
        return `<path data-suzhou-line="${i}" d="M ${cx} ${cy} Q ${(cx + pos[0]) / 2} ${Math.min(cy, pos[1]) - 8} ${pos[0]} ${pos[1]}" pathLength="1"></path>`;
      }).join("")}
      </svg>
      <div class="suzhou-route-core"><span></span><b>\u82CF\u5DDE</b></div>
      ${items.map((item, i) => {
        const pos = positions[i % positions.length];
        return `<div class="suzhou-route-node node-${i % 5 + 1}" data-suzhou-node="${i}" style="--sx:${pos[0]}%;--sy:${pos[1]}%">${mediaElement(item, "", i)}</div>`;
      }).join("")}
    </div>
  </article>`;
    }
    if (page.layout === "stack-deck") {
      return `<article class="story-page layout-stack-deck chapter-${page.chapterId}" data-layout="stack-deck" data-chapter="${page.chapterId}">
    <section class="stack-copy">${pageIntro(page)}</section>
    <section class="stack-stage">
      <div class="stack-shadow"></div>
      ${media.map((item, index) => `<div class="stack-card" data-stack-index="${index}">${mediaElement(item, "", index)}<span>${pad(index + 1)}</span></div>`).join("")}
      <div class="stack-counter"><b>01</b><span>/</span><em>${pad(media.length)}</em></div>
    </section>
  </article>`;
    }
    if (page.layout === "video-stage") {
      return `<article class="story-page layout-video-stage chapter-${page.chapterId}" data-layout="video-stage" data-chapter="${page.chapterId}">
    <section class="video-copy">${pageIntro(page)}</section>
    <section class="video-composition">
      ${mediaElement(media[0], "video-primary", 0)}
      <div class="video-side-stack">${media.slice(1).map((item, i) => mediaElement(item, "video-side", i + 1)).join("")}</div>
    </section>
  </article>`;
    }
    if (page.layout === "film-ribbon") {
      const midpoint = Math.ceil(media.length / 2);
      const rowA = media.slice(0, midpoint);
      const rowB = media.slice(midpoint);
      const track = (items, row) => {
        const set = `<div class="ribbon-set">${items.map((item, i) => mediaElement(item, "ribbon-frame", i)).join("")}</div>`;
        return `<div class="ribbon-row ${row}"><div class="ribbon-track">${set}</div></div>`;
      };
      return `<article class="story-page layout-film-ribbon chapter-${page.chapterId}" data-layout="film-ribbon" data-chapter="${page.chapterId}">
    ${track(rowA, "row-a")}
    <section class="ribbon-copy">${pageIntro(page, true)}</section>
    ${track(rowB, "row-b")}
    <div class="film-perforation top"></div><div class="film-perforation bottom"></div>
  </article>`;
    }
    if (page.layout === "focus-wall") {
      const requestedLimit = Math.max(1, Math.min(media.length, page.mediaLimit ?? media.length));
      const focusMedia = requestedLimit < media.length ? Array.from({ length: requestedLimit }, (_, index) => media[Math.round(index * (media.length - 1) / Math.max(1, requestedLimit - 1))]) : media;
      const grid = focusWallLayout(focusMedia.length);
      const gridStyle = `--focus-cols:${grid.desktopCols};--focus-rows:${grid.desktopRows};--focus-mobile-cols:${grid.mobileCols};--focus-mobile-rows:${grid.mobileRows};--focus-landscape-cols:${grid.landscapeCols};--focus-landscape-rows:${grid.landscapeRows}`;
      return `<article class="story-page layout-focus-wall chapter-${page.chapterId}" data-layout="focus-wall" data-chapter="${page.chapterId}" data-media-count="${focusMedia.length}" data-source-media-count="${media.length}">
    <div class="focus-wall-grid" style="${gridStyle}">${focusMedia.map((item, i) => `<div class="focus-thumb" data-focus-index="${i}" style="transform-origin:${focusWallOrigin(i, grid.desktopCols, grid.desktopRows)}">${mediaElement(item, "", i)}</div>`).join("")}</div>
    <section class="focus-copy">${pageIntro(page, true)}<div class="focus-readout"><b>01</b><i>/ ${pad(focusMedia.length)}</i></div></section>
    <div class="focus-lens"><span></span></div>
  </article>`;
    }
    if (page.layout === "dense-editorial") {
      const cells = packGrid(media.length, 18, 10, false, { col: 0, row: 0, colSpan: 7, rowSpan: 4 });
      return `<article class="story-page layout-dense-editorial chapter-${page.chapterId}" data-layout="dense-editorial" data-chapter="${page.chapterId}">
    <div class="dense-grid" data-dense-count="${media.length}">${media.map((item, i) => {
        const cell = cells[i];
        return `<div class="dense-item" style="grid-column:${cell.col + 1}/span ${cell.colSpan};grid-row:${cell.row + 1}/span ${cell.rowSpan}" data-dense-index="${i}">${mediaElement(item, "", i)}</div>`;
      }).join("")}</div>
    <section class="dense-copy">${pageIntro(page, true)}</section>
  </article>`;
    }
    if (page.layout === "video-editorial") {
      const stills = media.slice(1, 11);
      const stillCols = stills.length <= 4 ? Math.max(1, stills.length) : 5;
      return `<article class="story-page layout-video-editorial chapter-${page.chapterId}" data-layout="video-editorial" data-chapter="${page.chapterId}">
    <div class="video-editorial-bg"></div>
    ${mediaElement(media[0], "editorial-video-main", 0)}
    <section class="video-editorial-copy">${pageIntro(page)}</section>
    <div class="video-editorial-stills" style="--editorial-still-cols:${stillCols}">${stills.map((item, i) => mediaElement(item, "", i + 1)).join("")}</div>
  </article>`;
    }
    if (page.layout === "letter") {
      return `<article class="story-page layout-letter chapter-${page.chapterId}" data-layout="letter" data-chapter="${page.chapterId}">
    <div class="letter-rule"></div>
    <section class="letter-copy">${pageIntro(page)}</section>
    <section class="letter-photos">
      ${media.map((item, i) => `<div class="letter-photo photo-${i + 1}">${mediaElement(item, "", i)}</div>`).join("")}
    </section>
    <div class="letter-date">JUL \xB7 2026</div>
  </article>`;
    }
    if (page.layout === "particle-cloud") {
      return `<article class="story-page layout-particle-cloud chapter-${page.chapterId}" data-layout="particle-cloud" data-chapter="${page.chapterId}">
    <canvas class="particle-canvas" aria-label="\u53EF\u62D6\u62FD\u65CB\u8F6C\u7684\u6210\u957F\u98CE\u91C7\u7C92\u5B50\u4E91"></canvas>
    <div class="particle-noise" aria-hidden="true"></div>
    <section class="particle-copy">${pageIntro(page, true)}</section>
    <button class="particle-photo-preview" type="button" aria-label="\u5173\u95ED\u5F53\u524D\u98CE\u91C7\u7167\u7247">
      <img src="${media[0]?.src ?? ""}" alt="${esc(media[0]?.alt ?? "")}">
    </button>

  </article>`;
    }
    if (page.layout === "values-convergence") {
      const positions = [
        [10, 16],
        [28, 10],
        [47, 14],
        [68, 10],
        [88, 20],
        [91, 44],
        [84, 68],
        [69, 83],
        [48, 88],
        [28, 84],
        [11, 69],
        [8, 43]
      ];
      const values = page.values ?? [];
      const collageMedia = Array.from({ length: 16 }, (_, i) => media[i % Math.max(1, media.length)]).filter(Boolean);
      const momentMedia = Array.from({ length: Math.min(values.length, 6) }, (_, i) => media[(i * 3 + 1) % Math.max(1, media.length)]).filter(Boolean);
      const emblemUrl = esc(config.settings.brandEmblem ?? config.settings.brandEmblemMask ?? "");
      return `<article class="story-page layout-values-convergence chapter-${page.chapterId}" data-layout="values-convergence" data-chapter="${page.chapterId}">
    <div class="values-memory-wall">
      ${media.slice(0, 18).map((item, i) => `<div class="values-memory-tile tile-${i % 8 + 1}" data-value-photo="${i}">${mediaElement(item, "", i)}</div>`).join("")}
    </div>
    <div class="values-paper-veil" aria-hidden="true"></div>
    <div class="values-groups" aria-hidden="true">
      ${(page.valueGroups ?? []).map((group, i) => `<section class="values-group group-${i + 1}"><h2>${esc(group.title ?? "")}</h2><p>${(group.values ?? []).map((v) => `<span>${esc(v)}</span>`).join("")}</p></section>`).join("")}
    </div>
    <div class="values-cinematic-moments" aria-hidden="true">
      ${momentMedia.map((item, i) => `<div class="values-moment moment-${i % 6 + 1}" data-value-moment="${i}"><div class="values-moment-photo">${mediaElement(item, "", i)}</div><strong>${esc(values[i % values.length] ?? "")}</strong></div>`).join("")}
    </div>
    <div class="values-keywords" aria-hidden="true">
      ${values.map((value, i) => {
        const pos = positions[i % positions.length];
        return `<span class="values-keyword" style="--vx:${pos[0]}%;--vy:${pos[1]}%;--vi:${i}">${esc(value)}</span>`;
      }).join("")}
    </div>
    <div class="values-brand-stage" aria-hidden="true">
      <div class="values-brand-collage">
        <canvas class="values-brand-canvas" width="700" height="700"></canvas>
        <div class="values-brand-grid values-brand-grid-fallback">${collageMedia.map((item, i) => `<div class="values-brand-photo">${mediaElement(item, "", i)}</div>`).join("")}</div>
        ${emblemUrl ? `<img class="values-brand-outline" src="${emblemUrl}" alt="" aria-hidden="true">` : ""}
      </div>
    </div>
    <div class="values-brand-name"><b>招商银行</b></div>
    <section class="values-core">
      ${chapterMark(page)}
      ${page.kicker ? `<span class="kicker">${esc(page.kicker)}</span>` : ""}
      <h1>${lines(page.title)}</h1>
      ${page.subtitle ? `<p>${esc(page.subtitle)}</p>` : ""}
      ${page.body ? `<p class="values-body">${esc(page.body)}</p>` : ""}
      ${page.culture ? `<small>${esc(page.culture)}</small>` : ""}
    </section>
  </article>`;
    }
    return `<article class="story-page layout-finale chapter-${page.chapterId}" data-layout="finale" data-chapter="${page.chapterId}">
  <div class="finale-media"><img src="${media[0]?.src ?? ""}" alt="${esc(media[0]?.alt ?? "")}"></div>
  <div class="finale-shade"></div>
  <section class="finale-copy">
    <span class="kicker">${esc(page.kicker ?? "")}</span>
    <h1>${lines(page.title)}</h1>
    <p>${esc(page.subtitle ?? "")}</p>
    <button type="button" class="restart-story">${icon("restart")}<span>\u4ECE\u5934\u64AD\u653E</span></button>
  </section>
</article>`;
  }

  // src/player/reveal-runtime.js
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var directionSign = (index) => index % 2 === 0 ? 1 : -1;
  function runReveal(page) {
    if (reduceMotion) {
      this.surface.classList.remove("is-awaiting-reveal");
      return;
    }
    const animate = (element, keyframes, options) => {
      const safeKeyframes = page.layout === "values-convergence" ? keyframes.map(({ filter: _filter, ...frame }) => frame) : keyframes;
      const delay = Number(options.delay) || 0;
      if (page.layout === "values-convergence" && delay > 700) {
        const timer = window.setTimeout(() => {
          this.revealTimers = this.revealTimers.filter((item) => item !== timer);
          if (!element.isConnected)
            return;
          const animation2 = element.animate(safeKeyframes, { fill: "both", ...options, delay: 80 });
          this.revealAnimations.push(animation2);
        }, delay - 80);
        this.revealTimers.push(timer);
        return null;
      }
      const animation = element.animate(safeKeyframes, { fill: "both", ...options });
      this.revealAnimations.push(animation);
      return animation;
    };
    const introParts = $$(".page-copy > *, .chapter-copy .page-copy > *, .video-copy .page-copy > *, .letter-copy .page-copy > *, .particle-copy .page-copy > *", this.surface);
    introParts.forEach((element, index) => animate(element, [
      { opacity: 0, transform: "translateY(22px)" },
      { opacity: 1, transform: "translateY(0)" }
    ], { duration: 620, delay: 120 + index * 85, easing: "cubic-bezier(.2,.72,.2,1)" }));
    switch (page.reveal) {
      case "origin-map": {
        const outline = $(".china-outline", this.surface);
        if (outline) {
          outline.style.strokeDasharray = "1";
          outline.style.strokeDashoffset = "1";
          animate(outline, [
            { strokeDashoffset: "1", opacity: 0.24 },
            { strokeDashoffset: "0", opacity: 0.92 }
          ], { duration: 1250, delay: 80, easing: "cubic-bezier(.22,.72,.2,1)" });
        }
        const routes = $$(".origin-route", this.surface);
        routes.forEach((route, index) => {
          route.style.strokeDasharray = "1";
          route.style.strokeDashoffset = "1";
          animate(route, [
            { strokeDashoffset: "1", opacity: 0 },
            { offset: 0.12, opacity: 0.35 },
            { strokeDashoffset: "0", opacity: 0.92 }
          ], { duration: 1600, delay: 950 + index * 155, easing: "cubic-bezier(.16,.72,.18,1)" });
        });
        $$(".origin-source", this.surface).forEach((source, index) => {
          animate(source, [
            { opacity: 0, filter: "blur(3px)" },
            { opacity: 1, filter: "blur(0px)" },
            { opacity: 0.84, filter: "blur(0px)" }
          ], { duration: 620, delay: 580 + index * 145, easing: "cubic-bezier(.12,.8,.2,1)" });
        });
        $$(".origin-flash", this.surface).forEach((photo, index) => {
          animate(photo, [
            { opacity: 0, transform: "translate3d(0,16px,0) scale(.94)", filter: "blur(5px)" },
            { offset: 0.2, opacity: 0.92, transform: "translate3d(0,0,0) scale(1)", filter: "blur(0px)" },
            { offset: 0.68, opacity: 0.82, transform: "translate3d(0,-2px,0) scale(1.015)", filter: "blur(0px)" },
            { opacity: 0, transform: "translate3d(0,-18px,0) scale(1.035)", filter: "blur(5px)" }
          ], { duration: 2200, delay: 1250 + index * 430, easing: "cubic-bezier(.2,.72,.2,1)" });
        });
        const count = $(".origin-count", this.surface);
        if (count) animate(count, [
          { opacity: 0, transform: "translateY(15px) scale(.92)" },
          { opacity: 1, transform: "translateY(0) scale(1)" }
        ], { duration: 720, delay: 500, easing: "cubic-bezier(.16,.78,.18,1)" });
        const finalCopy = $(".origin-final-copy", this.surface);
        if (finalCopy) animate(finalCopy, [
          { opacity: 0, transform: "translateY(30px) scale(.97)" },
          { opacity: 1, transform: "translateY(0) scale(1)" }
        ], { duration: 900, delay: 6e3, easing: "cubic-bezier(.16,.78,.18,1)" });
        break;
      }
      case "editorial-rise": {
        $$(".media-frame", this.surface).forEach((element, index) => animate(element, [
          { opacity: 0, transform: `translateY(${index ? 42 : 64}px) scale(${index ? 0.92 : 0.96})` },
          { opacity: 1, transform: "translateY(0) scale(1)" }
        ], { duration: 900, delay: 220 + index * 170, easing: "cubic-bezier(.16,.78,.18,1)" }));
        break;
      }
      case "mosaic-cascade": {
        $$(".mosaic-cell", this.surface).forEach((element, index) => animate(element, [
          { opacity: 0, transform: `translate3d(0,${18 + index % 5 * 7}px,0) scale(.88)`, clipPath: "inset(18% 12% 18% 12%)" },
          { opacity: 1, transform: "translate3d(0,0,0) scale(1)", clipPath: "inset(0 0 0 0)" }
        ], { duration: 720, delay: 80 + index * 62, easing: "cubic-bezier(.18,.78,.2,1)" }));
        break;
      }
      case "network-build": {
        $$(".collab-network-lines line", this.surface).forEach((line, index) => {
          line.style.strokeDasharray = "1";
          line.style.strokeDashoffset = "1";
          animate(line, [
            { strokeDashoffset: "1", opacity: 0 },
            { strokeDashoffset: "0", opacity: 0.72 }
          ], { duration: 900, delay: 260 + index * 95, easing: "cubic-bezier(.18,.76,.2,1)" });
        });
        $$(".collab-node", this.surface).forEach((node, index) => animate(node, [
          { opacity: 0, transform: "translate(-50%,-50%) scale(.55)", filter: "blur(7px)" },
          { opacity: 1, transform: "translate(-50%,-50%) scale(1.04)", filter: "blur(0)" },
          { opacity: 1, transform: "translate(-50%,-50%) scale(1)", filter: "blur(0)" }
        ], { duration: 720, delay: 360 + index * 105, easing: "cubic-bezier(.16,.78,.18,1)" }));
        const hub = $(".collab-hub", this.surface);
        if (hub) animate(hub, [
          { opacity: 0, transform: "translate(-50%,-50%) scale(.7)" },
          { opacity: 1, transform: "translate(-50%,-50%) scale(1)" }
        ], { duration: 780, delay: 160, easing: "cubic-bezier(.16,.8,.2,1)" });
        break;
      }
      case "polaroid-spread": {
        $$(".polaroid-card", this.surface).forEach((card, index) => animate(card, [
          { opacity: 0, translate: `${index % 2 ? 28 : -28}px 42px`, scale: 0.88, filter: "blur(4px)" },
          { opacity: 1, translate: "0 0", scale: 1, filter: "blur(0)" }
        ], { duration: 680, delay: 120 + index * 70, easing: "cubic-bezier(.16,.8,.2,1)" }));
        break;
      }
      case "value-orbit": {
        $$(".value-orbit-lines line", this.surface).forEach((line, index) => {
          line.style.strokeDasharray = "1";
          line.style.strokeDashoffset = "1";
          animate(line, [
            { strokeDashoffset: "1", opacity: 0 },
            { strokeDashoffset: "0", opacity: 0.56 }
          ], { duration: 820, delay: 420 + index * 80, easing: "cubic-bezier(.18,.76,.2,1)" });
        });
        $$(".value-orbit-node", this.surface).forEach((node, index) => animate(node, [
          { opacity: 0, transform: "translate(-50%,-50%) scale(.62)", filter: "blur(5px)" },
          { opacity: 1, transform: "translate(-50%,-50%) scale(1)", filter: "blur(0)" }
        ], { duration: 680, delay: 520 + index * 95, easing: "cubic-bezier(.16,.8,.2,1)" }));
        $$(".value-orbit-strip .media-frame", this.surface).forEach((item, index) => animate(item, [
          { opacity: 0, transform: "translateY(28px)" },
          { opacity: 1, transform: "translateY(0)" }
        ], { duration: 620, delay: 1180 + index * 110, easing: "cubic-bezier(.16,.8,.2,1)" }));
        break;
      }
      case "service-steps": {
        $$(".service-lane", this.surface).forEach((lane, index) => animate(lane, [
          { opacity: 0, transform: "translateY(34px)", clipPath: "inset(12% 0 12% 0)" },
          { opacity: 1, transform: "translateY(0)", clipPath: "inset(0 0 0 0)" }
        ], { duration: 720, delay: 220 + index * 230, easing: "cubic-bezier(.16,.8,.2,1)" }));
        $$(".service-step-photo", this.surface).forEach((photo, index) => animate(photo, [
          { opacity: 0, transform: "scale(.86)" },
          { opacity: 1, transform: "scale(1)" }
        ], { duration: 520, delay: 520 + index * 58, easing: "cubic-bezier(.18,.78,.2,1)" }));
        break;
      }
      case "suzhou-routes": {
        $$(".suzhou-route-lines path", this.surface).forEach((line, index) => {
          line.style.strokeDasharray = "1";
          line.style.strokeDashoffset = "1";
          animate(line, [
            { strokeDashoffset: "1", opacity: 0 },
            { strokeDashoffset: "0", opacity: 0.58 }
          ], { duration: 940, delay: 260 + index * 82, easing: "cubic-bezier(.18,.76,.2,1)" });
        });
        $$(".suzhou-route-node", this.surface).forEach((node, index) => animate(node, [
          { opacity: 0, transform: "translate(-50%,-50%) scale(.58)", filter: "blur(6px)" },
          { opacity: 1, transform: "translate(-50%,-50%) scale(1)", filter: "blur(0)" }
        ], { duration: 680, delay: 480 + index * 90, easing: "cubic-bezier(.16,.8,.2,1)" }));
        const core = $(".suzhou-route-core", this.surface);
        if (core) animate(core, [
          { opacity: 0, transform: "translate(-50%,-50%) scale(.7)" },
          { opacity: 1, transform: "translate(-50%,-50%) scale(1)" }
        ], { duration: 760, delay: 120, easing: "cubic-bezier(.16,.8,.2,1)" });
        break;
      }
      case "stack-deal": {
        const cards = $$(".stack-card", this.surface);
        const rng = new SeededRandom(config.settings.randomSeed + this.currentIndex);
        const stage = $(".stack-stage", this.surface);
        const stageRect = stage?.getBoundingClientRect();
        const spreadX = Math.min(215, (stageRect?.width ?? 760) * 0.28);
        const spreadY = Math.min(150, (stageRect?.height ?? 620) * 0.22);
        cards.forEach((element, index) => {
          const col = index % 4;
          const row = Math.floor(index / 4);
          const rotation = rng.between(-10, 10);
          const x = (col - 1.5) * (spreadX / 1.75) + rng.between(-24, 24);
          const y = (row - 1.05) * (spreadY / 1.55) + rng.between(-18, 18);
          const finalTransform = `translate3d(calc(-50% + ${x}px),calc(-50% + ${y}px),0) rotate(${rotation}deg) scale(1)`;
          element.style.setProperty("--final-rot", `${rotation}deg`);
          element.style.setProperty("--final-x", `${x}px`);
          element.style.setProperty("--final-y", `${y}px`);
          animate(element, [
            { opacity: 0, transform: `translate3d(calc(-50% + ${directionSign(index) * 320}px),calc(-50% + 190px),0) rotate(${directionSign(index) * 18}deg) scale(.72)` },
            { opacity: 1, transform: finalTransform }
          ], { duration: 820, delay: 180 + index * 175, easing: "cubic-bezier(.12,.82,.2,1)" });
        });
        const timer = window.setInterval(() => {
          const visible = cards.filter((card) => getComputedStyle(card).opacity !== "0").length;
          const counter = $(".stack-counter b", this.surface);
          if (counter)
            counter.textContent = pad(Math.max(1, visible));
        }, 200);
        this.revealTimers.push(timer);
        break;
      }
      case "cinema-reveal": {
        const primary = $(".video-primary, .editorial-video-main", this.surface);
        if (primary)
          animate(primary, [
            { opacity: 0, transform: "scale(1.08)", clipPath: "inset(48% 0 48% 0)" },
            { opacity: 1, transform: "scale(1)", clipPath: "inset(0 0 0 0)" }
          ], { duration: 1050, delay: 180, easing: "cubic-bezier(.18,.78,.2,1)" });
        $$(".video-side, .video-editorial-stills .media-frame", this.surface).forEach((element, index) => animate(element, [
          { opacity: 0, transform: "translateX(42px) scale(.9)" },
          { opacity: 1, transform: "translateX(0) scale(1)" }
        ], { duration: 760, delay: 650 + index * 150, easing: "cubic-bezier(.18,.78,.2,1)" }));
        break;
      }
      case "ribbon-flow": {
        break;
      }
      case "focus-tour": {
        const thumbs = $$(".focus-thumb", this.surface);
        thumbs.forEach((element, index) => animate(element, [
          { opacity: 0, transform: "scale(.72)" },
          { opacity: 1, transform: "scale(1)" }
        ], { duration: 520, delay: 60 + index * 34, easing: "cubic-bezier(.2,.76,.2,1)" }));
        const order = page.focusOrder?.length ? page.focusOrder : [0, 4, 8];
        let cursor = 0;
        const activate = () => {
          const activeIndex = order[cursor % order.length] % thumbs.length;
          thumbs.forEach((thumb, index) => thumb.classList.toggle("is-focused", index === activeIndex));
          const readout = $(".focus-readout b", this.surface);
          if (readout)
            readout.textContent = pad(activeIndex + 1);
          cursor++;
        };
        const first = window.setTimeout(() => {
          activate();
          const timer = window.setInterval(activate, 1500);
          this.revealTimers.push(timer);
        }, 1500);
        this.revealTimers.push(first);
        break;
      }
      case "scatter-settle": {
        const rng = new SeededRandom(config.settings.randomSeed + 99 + this.currentIndex);
        $$(".dense-item", this.surface).forEach((element, index) => animate(element, [
          { opacity: 0, transform: `translate3d(${rng.between(-160, 160)}px,${rng.between(-110, 110)}px,0) rotate(${rng.between(-9, 9)}deg) scale(.78)` },
          { opacity: 1, transform: "translate3d(0,0,0) rotate(0deg) scale(1)" }
        ], { duration: 920, delay: 100 + index * 58, easing: "cubic-bezier(.14,.78,.2,1)" }));
        break;
      }
      case "typewriter-rise": {
        $$(".media-frame", this.surface).forEach((element, index) => animate(element, [
          { opacity: 0, transform: `translateY(${34 + index * 12}px) scale(.94)` },
          { opacity: 1, transform: "translateY(0) scale(1)" }
        ], { duration: 900, delay: 260 + index * 170, easing: "cubic-bezier(.16,.78,.18,1)" }));
        const body = $(".body-copy p", this.surface);
        if (body) {
          const full = body.textContent ?? "";
          body.textContent = "";
          body.classList.add("is-typing");
          let cursor = 0;
          const timer = window.setInterval(() => {
            cursor = Math.min(full.length, cursor + 2);
            body.textContent = full.slice(0, cursor);
            if (cursor >= full.length) {
              window.clearInterval(timer);
              body.classList.remove("is-typing");
            }
          }, 24);
          this.revealTimers.push(timer);
        }
        break;
      }
      case "particle-bloom": {
        const preview = $(".particle-preview", this.surface);
        if (preview)
          animate(preview, [
            { opacity: 0, transform: "translateY(28px) scale(.94)" },
            { opacity: 1, transform: "translateY(0) scale(1)" }
          ], { duration: 900, delay: 850, easing: "cubic-bezier(.16,.78,.18,1)" });
        break;
      }
      case "letter-write": {
        $$(".letter-photo", this.surface).forEach((element, index) => animate(element, [
          { opacity: 0, transform: `translateY(${42 + index * 18}px) rotate(${index % 2 ? 4 : -4}deg) scale(.9)` },
          { opacity: 1, transform: "translateY(0) rotate(0deg) scale(1)" }
        ], { duration: 900, delay: 700 + index * 220, easing: "cubic-bezier(.18,.8,.18,1)" }));
        break;
      }
      case "values-converge": {
        const tiles = $$(".values-memory-tile", this.surface);
        tiles.forEach((element, index) => animate(element, [
          { opacity: 0, transform: `scale(.78) translateY(${24 + index % 5 * 8}px)`, filter: "blur(5px)" },
          { opacity: 0.86, transform: "scale(1) translateY(0)", filter: "blur(0)" }
        ], { duration: 760, delay: 70 + index * 52, easing: "cubic-bezier(.18,.78,.2,1)" }));
        const moments = $$(".values-moment", this.surface);
        moments.forEach((element, index) => animate(element, [
          { opacity: 0, transform: `translate3d(0,26px,0) scale(.9) rotate(${index % 2 ? 2.2 : -2.2}deg)`, filter: "blur(8px)" },
          { offset: 0.24, opacity: 0.98, transform: `translate3d(0,0,0) scale(1) rotate(${index % 2 ? 0.5 : -0.5}deg)`, filter: "blur(0)" },
          { offset: 0.72, opacity: 0.9, transform: "translate3d(0,-3px,0) scale(1.018) rotate(0deg)", filter: "blur(0)" },
          { opacity: 0.08, transform: "translate3d(0,-14px,0) scale(1.055) rotate(0deg)", filter: "blur(3px)" }
        ], { duration: 1850, delay: 520 + index * 470, easing: "cubic-bezier(.18,.72,.2,1)" }));
        const groups = $$(".values-group", this.surface);
        groups.forEach((element, index) => animate(element, [
          { opacity: 0, transform: `translateY(${index ? -12 : 12}px) scale(.97)`, filter: "blur(5px)" },
          { opacity: 0.94, transform: "translateY(0) scale(1)", filter: "blur(0)" }
        ], { duration: 820, delay: 900 + index * 240, easing: "cubic-bezier(.18,.78,.2,1)" }));
        const keywords = $$(".values-keyword", this.surface);
        keywords.forEach((element, index) => animate(element, [
          { opacity: 0, transform: "translate(-50%,-50%) scale(.66)", filter: "blur(7px)" },
          { opacity: 0.96, transform: "translate(-50%,-50%) scale(1.03)", filter: "blur(0)" },
          { opacity: 0.78, transform: "translate(-50%,-50%) scale(1)", filter: "blur(0)" }
        ], { duration: 720, delay: 1950 + index * 155, easing: "cubic-bezier(.18,.78,.2,1)" }));
        const gatherTimer = window.setTimeout(() => {
          const stage = $(".values-brand-stage", this.surface);
          const stageRect = stage?.getBoundingClientRect();
          keywords.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const dx = stageRect ? stageRect.left + stageRect.width / 2 - (rect.left + rect.width / 2) : 0;
            const dy = stageRect ? stageRect.top + stageRect.height / 2 - (rect.top + rect.height / 2) : 0;
            animate(element, [
              { opacity: 0.78, transform: "translate(-50%,-50%) scale(1)" },
              { opacity: 0.05, transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(.26)`, filter: "blur(3px)" }
            ], { duration: 1250, delay: index * 28, easing: "cubic-bezier(.28,.04,.16,1)" });
          });
          moments.forEach((element, index) => animate(element, [
            { opacity: 0.08, transform: "scale(1.055)", filter: "blur(3px)" },
            { opacity: 0, transform: "scale(.62)", filter: "blur(9px)" }
          ], { duration: 780, delay: index * 18, easing: "cubic-bezier(.3,.05,.18,1)" }));
          groups.forEach((element, index) => animate(element, [
            { opacity: 0.94, transform: "translateY(0) scale(1)", filter: "blur(0)" },
            { opacity: 0, transform: `translateY(${index ? -20 : 20}px) scale(.94)`, filter: "blur(5px)" }
          ], { duration: 700, delay: index * 60, easing: "cubic-bezier(.3,.05,.18,1)" }));
          tiles.forEach((tile, index) => animate(tile, [
            { opacity: 0.86, transform: "scale(1)", filter: "blur(0)" },
            { opacity: 0.05, transform: `scale(.66) translate3d(${(index % 2 ? 1 : -1) * 32}px,${(index % 3 - 1) * 26}px,0)`, filter: "blur(6px)" }
          ], { duration: 1180, delay: index * 16, easing: "cubic-bezier(.3,.05,.18,1)" }));
        }, 5e3);
        this.revealTimers.push(gatherTimer);
        const brandStage = $(".values-brand-stage", this.surface);
        if (brandStage) animate(brandStage, [
          { opacity: 0, transform: "translate(-50%,-50%) scale(.48)", filter: "blur(8px)" },
          { offset: 0.46, opacity: 0.7, transform: "translate(-50%,-50%) scale(.93)", filter: "blur(1px)" },
          { opacity: 1, transform: "translate(-50%,-50%) scale(1)", filter: "blur(0)" }
        ], { duration: 2500, delay: 5350, easing: "cubic-bezier(.12,.82,.18,1)" });
        const brandCollage = $(".values-brand-collage", this.surface);
        if (brandCollage) animate(brandCollage, [
          { opacity: 0, filter: "saturate(.5) brightness(1.34)", transform: "scale(.78)" },
          { opacity: 1, filter: "saturate(.95) brightness(1)", transform: "scale(1)" }
        ], { duration: 1750, delay: 5450, easing: "cubic-bezier(.12,.82,.18,1)" });
        $$(".values-brand-photo", this.surface).forEach((element, index) => animate(element, [
          { opacity: 0, transform: "scale(.78)" },
          { opacity: 1, transform: "scale(1)" }
        ], { duration: 520, delay: 5550 + index * 34, easing: "cubic-bezier(.18,.78,.2,1)" }));
        /* Reveal the independent wordmark only as the emblem finishes. Opacity
           is the sole animated property, preventing the previous layout flash. */
        const brandName = $(".values-brand-name", this.surface);
        if (brandName) animate(brandName, [
          { opacity: 0 },
          { opacity: 1 }
        ], { duration: 680, delay: 7150, easing: "cubic-bezier(.2,.72,.22,1)" });
        const core = $(".values-core", this.surface);
        if (core) animate(core, [
          { opacity: 0, transform: "translate(-50%,28px) scale(.97)", filter: "blur(5px)" },
          { opacity: 1, transform: "translate(-50%,0) scale(1)", filter: "blur(0)" }
        ], { duration: 950, delay: 7800, easing: "cubic-bezier(.16,.78,.2,1)" });
        break;
      }
      case "finale": {
        const copy = $(".finale-copy", this.surface);
        if (copy)
          animate(copy, [{ opacity: 0, transform: "translateY(38px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 1100, delay: 250, easing: "cubic-bezier(.16,.78,.2,1)" });
        break;
      }
    }
    this.surface.classList.remove("is-awaiting-reveal");
  }

  // src/player/special-pages.js
  var reduceMotion2 = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function setupFilmRibbon(page) {
    if (page.layout !== "film-ribbon" || reduceMotion2)
      return;
    const tracks = Array.from(this.surface.querySelectorAll(".ribbon-track"));
    if (!tracks.length)
      return;
    const states = tracks.map((track, index) => ({
      track,
      set: track.querySelector(".ribbon-set"),
      direction: index === 0 ? -1 : 1,
      offset: 0,
      initialized: false
    }));
    const speed = this.performanceTier === "low" ? 16 : this.performanceTier === "medium" ? 20 : 24;
    const minimumFrame = this.performanceTier === "low" ? 48 : 32;
    let frame = 0;
    let running = false;
    let stopped = false;
    let lastTime = 0;
    const itemSpan = (item) => {
      const style = getComputedStyle(item);
      return item.getBoundingClientRect().width + (Number.parseFloat(style.marginRight) || 0) + 10;
    };
    const tick = (time) => {
      if (!running || stopped)
        return;
      if (!lastTime)
        lastTime = time;
      const elapsed = Math.min(64, time - lastTime);
      if (elapsed >= minimumFrame) {
        states.forEach((state) => {
          const children = state.set ? Array.from(state.set.children) : [];
          if (!children.length)
            return;
          if (!state.initialized) {
            state.offset = state.direction > 0 ? -itemSpan(children[children.length - 1]) : 0;
            state.initialized = true;
          }
          state.offset += state.direction * speed * elapsed / 1e3;
          if (state.direction < 0) {
            const first = state.set.firstElementChild;
            const span = first ? itemSpan(first) : 0;
            if (span && state.offset <= -span) {
              state.set.append(first);
              state.offset += span;
            }
          } else if (state.offset >= 0) {
            const last = state.set.lastElementChild;
            const span = last ? itemSpan(last) : 0;
            if (span) {
              state.set.prepend(last);
              state.offset -= span;
            }
          }
          state.track.style.transform = `translate3d(${state.offset.toFixed(2)}px,0,0)`;
        });
        lastTime = time;
      }
      frame = requestAnimationFrame(tick);
    };
    const controller = {
      pause() {
        running = false;
        cancelAnimationFrame(frame);
        frame = 0;
        lastTime = 0;
      },
      resume() {
        if (running || stopped)
          return;
        running = true;
        frame = requestAnimationFrame(tick);
      },
      stop() {
        stopped = true;
        this.pause();
        states.forEach(({ track }) => track.style.removeProperty("transform"));
      }
    };
    this.registerPageMotion(controller);
  }
  async function setupValuesBrand(page) {
    if (page.layout !== "values-convergence")
      return;
    const canvas = $(".values-brand-canvas", this.surface);
    const fallback = $(".values-brand-grid-fallback", this.surface);
    const outline = $(".values-brand-outline", this.surface);
    if (!canvas)
      return;
    const context = canvas.getContext("2d");
    if (!context)
      return;
    const photoSources = (page.media ?? []).filter((item) => item?.type === "image" && item.src).map((item) => item.src);
    if (!photoSources.length)
      return;
    const targetPageId = page.id;
    try {
      const batch = await this.loadImageBatch([
        config.settings.brandEmblemMask || config.settings.brandEmblem,
        ...photoSources.slice(0, 16)
      ], 3);
      const [mask, ...loaded] = batch;
      if (!mask)
        throw new Error("brand mask load failed");
      if (config.pages[this.currentIndex]?.id !== targetPageId)
        return;
      const photos = loaded.filter(Boolean);
      if (!photos.length)
        throw new Error("no collage photos loaded");
      const size = Math.min(520, Math.max(360, Math.round(canvas.getBoundingClientRect().width || 480)));
      canvas.width = size;
      canvas.height = size;
      context.clearRect(0, 0, size, size);
      const cols = 7;
      const rows = 7;
      const gap = 3;
      const cellW = size / cols;
      const cellH = size / rows;
      const coverDraw = (img, x, y, w, h) => {
        const ratio = Math.max(w / img.naturalWidth, h / img.naturalHeight);
        const dw = img.naturalWidth * ratio;
        const dh = img.naturalHeight * ratio;
        context.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
      };
      context.save();
      context.beginPath();
      context.rect(0, 0, size, size);
      context.clip();
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const index = row * cols + col;
          const img = photos[index % photos.length];
          const x = col * cellW + gap / 2;
          const y = row * cellH + gap / 2;
          coverDraw(img, x, y, cellW - gap, cellH - gap);
        }
      }
      context.restore();
      context.globalCompositeOperation = "destination-in";
      context.drawImage(mask, 0, 0, size, size);
      context.globalCompositeOperation = "source-over";
      canvas.classList.add("is-ready");
      fallback?.classList.add("is-canvas-ready");
      outline?.classList.add("is-canvas-ready");
    } catch {
      canvas.classList.remove("is-ready");
      fallback?.classList.remove("is-canvas-ready");
      outline?.classList.add("is-fallback-visible");
    }
  }
  function setupParticleCloud(page) {
    if (page.layout !== "particle-cloud")
      return;
    const canvas = $(".particle-canvas", this.surface);
    const preview = $(".particle-photo-preview", this.surface);
    const previewImage = $(".particle-photo-preview img", this.surface);
    if (!canvas || !preview || !previewImage)
      return;
    const context = canvas.getContext("2d");
    if (!context)
      return;
    const random = new SeededRandom(config.settings.randomSeed + this.currentIndex * 97);
    const media = page.media;
    const thumbnailImages = media.map(() => new Image());
    thumbnailImages.forEach((image, index) => {
      image.decoding = "async";
      const source = media[index]?.poster || media[index]?.src;
      const timer = window.setTimeout(() => {
        this.revealTimers = this.revealTimers.filter((item) => item !== timer);
        if (!destroyed && source)
          image.src = source;
      }, Math.floor(index / 3) * 120);
      this.revealTimers.push(timer);
    });
    const nodes = [];
    const count = this.performanceTier === "low" ? 48 : this.performanceTier === "medium" ? 72 : 96;
    for (let index = 0; index < count; index++) {
      const featured = index < media.length;
      const theta = random.between(0, Math.PI * 2);
      const phi = Math.acos(random.between(-1, 1));
      const radius = featured ? random.between(0.44, 0.72) : random.between(0.18, 1);
      nodes.push({
        x: Math.sin(phi) * Math.cos(theta) * radius,
        y: Math.cos(phi) * radius * 0.72,
        z: Math.sin(phi) * Math.sin(theta) * radius,
        size: featured ? random.between(4.8, 7.2) : random.between(1.2, 3.4),
        phase: random.between(0, Math.PI * 2),
        featured,
        mediaIndex: featured ? index : index % Math.max(1, media.length),
        screenX: 0,
        screenY: 0,
        depth: 0
      });
    }
    const featuredNodes = nodes.filter((node) => node.featured);
    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let rotationX = -0.12;
    let rotationY = 0.25;
    let velocityX = 0;
    let velocityY = 17e-4;
    let dragging = false;
    let pointerId = -1;
    let lastX = 0;
    let lastY = 0;
    let hovered = null;
    let selected = null;
    let autoTarget = null;
    let previewAnimation = null;
    let frame = 0;
    let motionRunning = false;
    let destroyed = false;
    let startTime = performance.now();
    let tourToken = 0;
    const tourTimers = /* @__PURE__ */ new Set();
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const ratioLimit = this.performanceTier === "low" ? 1 : this.performanceTier === "medium" ? 1.15 : 1.35;
      pixelRatio = Math.min(window.devicePixelRatio || 1, ratioLimit);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };
    const rotateNode = (node) => {
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const x1 = node.x * cosY - node.z * sinY;
      const z1 = node.x * sinY + node.z * cosY;
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const y2 = node.y * cosX - z1 * sinX;
      const z2 = node.y * sinX + z1 * cosX;
      const scale = Math.min(width, height) * 0.42;
      const perspective = 1.34 / (1.55 - z2 * 0.42);
      node.screenX = width * 0.62 + x1 * scale * perspective;
      node.screenY = height * 0.54 + y2 * scale * perspective;
      node.depth = z2;
    };
    const setHovered = (node) => {
      hovered = node;
      canvas.classList.toggle("has-hovered-node", Boolean(node));
    };
    const findNode = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      let best = null;
      let bestDistance = window.matchMedia("(pointer: coarse)").matches ? 44 : 30;
      nodes.forEach((node) => {
        if (!node.featured)
          return;
        const distance = Math.hypot(node.screenX - x, node.screenY - y);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = node;
        }
      });
      return best;
    };
    const closePreview = (animate = true, duration = 420) => {
      if (!selected || !preview.classList.contains("is-active"))
        return;
      const target = selected;
      selected = null;
      previewAnimation?.cancel();
      if (!animate || reduceMotion2) {
        preview.classList.remove("is-active");
        preview.style.removeProperty("transform");
        preview.style.removeProperty("opacity");
        return;
      }
      const rect = preview.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();
      const dx = canvasRect.left + target.screenX - (rect.left + rect.width / 2);
      const dy = canvasRect.top + target.screenY - (rect.top + rect.height / 2);
      previewAnimation = preview.animate([
        { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        { opacity: 0, transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(.035)` }
      ], { duration, easing: "cubic-bezier(.45,0,.65,1)", fill: "both" });
      void previewAnimation.finished.finally(() => {
        preview.classList.remove("is-active");
        previewAnimation?.cancel();
        previewAnimation = null;
      });
    };
    const openPreview = (node, duration = 560) => {
      const item = media[node.mediaIndex % media.length];
      if (!item)
        return;
      selected = node;
      previewImage.src = item.poster || item.src;
      previewImage.alt = item.alt;
      preview.classList.add("is-active");
      previewAnimation?.cancel();
      const rect = preview.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();
      const dx = canvasRect.left + node.screenX - (rect.left + rect.width / 2);
      const dy = canvasRect.top + node.screenY - (rect.top + rect.height / 2);
      previewAnimation = preview.animate([
        { opacity: 0, transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(.035)` },
        { opacity: 1, transform: "translate(-50%, -50%) scale(1)" }
      ], { duration, easing: "cubic-bezier(.16,.78,.18,1)", fill: "both" });
      void previewAnimation.finished.finally(() => {
        previewAnimation?.cancel();
        previewAnimation = null;
      });
    };
    const wait = (duration) => new Promise((resolve) => {
      const timer = window.setTimeout(() => {
        tourTimers.delete(timer);
        resolve();
      }, Math.max(20, duration));
      tourTimers.add(timer);
    });
    const stopAutoTour = () => {
      tourToken++;
      tourTimers.forEach((timer) => window.clearTimeout(timer));
      tourTimers.clear();
      autoTarget = null;
      setHovered(null);
      closePreview(false);
    };
    const startAutoTour = () => {
      stopAutoTour();
      if (!this.autoplay || !this.started || destroyed || featuredNodes.length === 0)
        return;
      const token = ++tourToken;
      const speed = Math.max(0.75, this.speed);
      void (async () => {
        await wait(620 / speed);
        for (let index = 0; index < featuredNodes.length; index++) {
          if (token !== tourToken || !this.autoplay || destroyed || config.pages[this.currentIndex].id !== page.id)
            return;
          const node = featuredNodes[index];
          autoTarget = node;
          setHovered(node);
          this.setTimelineProgress(index / featuredNodes.length);
          this.setClockText(`${pad(index + 1)}/${pad(featuredNodes.length)}`);
          await wait(330 / speed);
          if (token !== tourToken || !this.autoplay || destroyed)
            return;
          openPreview(node, 360 / speed);
          await wait(720 / speed);
          if (token !== tourToken || !this.autoplay || destroyed)
            return;
          closePreview(true, 300 / speed);
          await wait(330 / speed);
        }
        if (token !== tourToken || !this.autoplay || destroyed || config.pages[this.currentIndex].id !== page.id)
          return;
        autoTarget = null;
        setHovered(null);
        this.setTimelineProgress(1);
        this.setClockText("DONE");
        await wait(320 / speed);
        if (token === tourToken && this.autoplay && config.pages[this.currentIndex].id === page.id)
          this.goTo(this.currentIndex + 1);
      })();
    };
    const normalizeAngle = (angle) => {
      let result = angle;
      while (result > Math.PI)
        result -= Math.PI * 2;
      while (result < -Math.PI)
        result += Math.PI * 2;
      return result;
    };
    let lastDrawTime = 0;
    const minimumFrame = this.performanceTier === "low" ? 50 : this.performanceTier === "medium" ? 40 : 32;
    const draw = (time) => {
      if (destroyed || !motionRunning)
        return;
      if (!dragging && time - lastDrawTime < minimumFrame) {
        frame = requestAnimationFrame(draw);
        return;
      }
      lastDrawTime = time;
      const elapsed = Math.min(1, (time - startTime) / 1500);
      context.clearRect(0, 0, width, height);
      const gradient = context.createRadialGradient(width * 0.62, height * 0.54, 0, width * 0.62, height * 0.54, Math.min(width, height) * 0.57);
      gradient.addColorStop(0, "rgba(190,26,31,.16)");
      gradient.addColorStop(0.45, "rgba(92,7,12,.08)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
      if (!dragging) {
        if (autoTarget) {
          const targetY = Math.atan2(autoTarget.x, autoTarget.z);
          const targetX = Math.atan2(autoTarget.y, Math.max(0.08, Math.hypot(autoTarget.x, autoTarget.z)));
          rotationY += normalizeAngle(targetY - rotationY) * 0.065;
          rotationX += (targetX - rotationX) * 0.055;
          velocityX *= 0.85;
          velocityY *= 0.85;
        } else {
          rotationY += velocityY;
          rotationX += velocityX;
          velocityX *= 0.965;
          velocityY = velocityY * 0.98 + 165e-5 * 0.02;
        }
      }
      nodes.forEach(rotateNode);
      const sorted = [...nodes].sort((a, b) => a.depth - b.depth);
      context.lineWidth = 0.7;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < Math.min(nodes.length, i + 15); j++) {
          const a = nodes[i];
          const b = nodes[j];
          const distance3d = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
          if (distance3d > 0.34)
            continue;
          const alpha = (1 - distance3d / 0.34) * 0.22 * elapsed;
          context.strokeStyle = `rgba(224,62,54,${alpha})`;
          context.beginPath();
          context.moveTo(a.screenX, a.screenY);
          context.lineTo(b.screenX, b.screenY);
          context.stroke();
        }
      }
      sorted.forEach((node) => {
        const pulse = 1 + Math.sin(time * 2e-3 + node.phase) * 0.18;
        const depthAlpha = 0.45 + (node.depth + 1) * 0.22;
        const active = hovered === node || selected === node;
        const radius = node.size * pulse * (node.featured ? 1.18 : 1) * (active ? 2.1 : 1) * elapsed;
        const glowRadius = Math.max(8, radius * 4);
        if (node.featured || active) {
          const glow = context.createRadialGradient(node.screenX, node.screenY, 0, node.screenX, node.screenY, glowRadius);
          glow.addColorStop(0, active ? "rgba(255,232,198,.98)" : "rgba(255,144,105,.95)");
          glow.addColorStop(0.24, active ? "rgba(232,47,37,.85)" : "rgba(211,31,35,.48)");
          glow.addColorStop(1, "rgba(130,0,10,0)");
          context.fillStyle = glow;
          context.beginPath();
          context.arc(node.screenX, node.screenY, glowRadius, 0, Math.PI * 2);
          context.fill();
        }
        if (node.featured) {
          const ringRadius = Math.max(active ? 20 : 12, radius + (active ? 8 : 6));
          const thumb = thumbnailImages[node.mediaIndex % thumbnailImages.length];
          if (thumb?.complete && thumb.naturalWidth > 0 && thumb.naturalHeight > 0) {
            const diameter = ringRadius * 2;
            const sourceRatio = thumb.naturalWidth / thumb.naturalHeight;
            let sx = 0;
            let sy = 0;
            let sw = thumb.naturalWidth;
            let sh = thumb.naturalHeight;
            if (sourceRatio > 1) {
              sw = thumb.naturalHeight;
              sx = (thumb.naturalWidth - sw) / 2;
            } else {
              sh = thumb.naturalWidth;
              sy = (thumb.naturalHeight - sh) / 2;
            }
            context.save();
            context.beginPath();
            context.arc(node.screenX, node.screenY, ringRadius - 1.8, 0, Math.PI * 2);
            context.clip();
            context.globalAlpha = active ? 0.76 : Math.max(0.24, Math.min(0.46, depthAlpha * 0.48));
            context.drawImage(thumb, sx, sy, sw, sh, node.screenX - ringRadius, node.screenY - ringRadius, diameter, diameter);
            context.globalAlpha = active ? 0.12 : 0.32;
            context.fillStyle = "#a6192e";
            context.fillRect(node.screenX - ringRadius, node.screenY - ringRadius, diameter, diameter);
            context.restore();
          }
          context.strokeStyle = active ? "rgba(255,238,211,.98)" : "rgba(238,76,64,.78)";
          context.lineWidth = active ? 2.2 : 1.25;
          context.beginPath();
          context.arc(node.screenX, node.screenY, ringRadius, 0, Math.PI * 2);
          context.stroke();
          context.strokeStyle = active ? "rgba(226,43,40,.88)" : "rgba(180,24,38,.54)";
          context.lineWidth = active ? 1.2 : 0.75;
          context.beginPath();
          context.arc(node.screenX, node.screenY, ringRadius + (active ? 5 : 3.5), 0, Math.PI * 2);
          context.stroke();
          context.fillStyle = active ? "rgba(255,239,212,.98)" : "rgba(255,133,100,.92)";
          context.beginPath();
          context.arc(node.screenX, node.screenY, Math.max(1.7, radius * 0.34), 0, Math.PI * 2);
          context.fill();
        } else {
          context.fillStyle = `rgba(255,102,92,${Math.min(1, depthAlpha)})`;
          context.beginPath();
          context.arc(node.screenX, node.screenY, Math.max(1.2, radius), 0, Math.PI * 2);
          context.fill();
        }
      });
      frame = requestAnimationFrame(draw);
    };
    const onPointerDown = (event) => {
      this.pauseForManual("\u62D6\u62FD\u7C92\u5B50\u4E91\uFF1A\u5DF2\u5207\u6362\u4E3A\u624B\u52A8\u6D4F\u89C8");
      dragging = true;
      pointerId = event.pointerId;
      lastX = event.clientX;
      lastY = event.clientY;
      canvas.setPointerCapture(pointerId);
    };
    const onPointerMove = (event) => {
      if (dragging && event.pointerId === pointerId) {
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        lastX = event.clientX;
        lastY = event.clientY;
        rotationY += dx * 6e-3;
        rotationX += dy * 4e-3;
        velocityY = dx * 5e-5;
        velocityX = dy * 35e-6;
        autoTarget = null;
        setHovered(null);
        closePreview(false);
      } else if (!selected)
        setHovered(findNode(event.clientX, event.clientY));
    };
    const onPointerUp = (event) => {
      if (event.pointerId !== pointerId)
        return;
      dragging = false;
      pointerId = -1;
      canvas.releasePointerCapture?.(event.pointerId);
      if (!selected)
        setHovered(findNode(event.clientX, event.clientY));
    };
    const onPointerLeave = () => {
      if (!dragging && !selected)
        setHovered(null);
    };
    const onClick = (event) => {
      const node = findNode(event.clientX, event.clientY);
      this.pauseForManual(node ? "\u5DF2\u5C55\u5F00\u98CE\u91C7\u7167\u7247\uFF1A\u81EA\u52A8\u64AD\u653E\u6682\u505C" : "\u5DF2\u5207\u6362\u4E3A\u624B\u52A8\u6D4F\u89C8");
      if (!node) {
        closePreview();
        setHovered(null);
        return;
      }
      autoTarget = node;
      setHovered(node);
      openPreview(node);
    };
    const onPreviewLeave = () => {
      if (!this.autoplay)
        closePreview();
    };
    const onPreviewClick = (event) => {
      event.stopPropagation();
      this.openMediaLightbox(previewImage);
    };
    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("click", onClick);
    preview.addEventListener("pointerleave", onPreviewLeave);
    preview.addEventListener("click", onPreviewClick);
    const motionController = {
      pause() {
        motionRunning = false;
        cancelAnimationFrame(frame);
        frame = 0;
      },
      resume() {
        if (motionRunning || destroyed)
          return;
        motionRunning = true;
        lastDrawTime = 0;
        frame = requestAnimationFrame(draw);
      },
      stop() {
        this.pause();
      }
    };
    this.registerPageMotion(motionController);
    this.particleTourStart = startAutoTour;
    this.particleTourStop = stopAutoTour;
    this.particleCleanup = () => {
      destroyed = true;
      motionController.pause();
      stopAutoTour();
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("click", onClick);
      preview.removeEventListener("pointerleave", onPreviewLeave);
      preview.removeEventListener("click", onPreviewClick);
      previewAnimation?.cancel();
    };
  }

  // src/player/storybook-player.js
  var reduceMotion3 = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var StorybookPlayer = class {
    constructor(root) {
      this.currentIndex = 0;
      this.started = true;
      this.autoplay = config.settings.autoplay ?? true;
      this.musicEnabled = true;
      this.speed = config.settings.defaultSpeed ?? 1.5;
      this.transitioning = false;
      this.pageTimer = 0;
      this.progressFrame = 0;
      this.timerStart = 0;
      this.timerDuration = 0;
      this.revealAnimations = [];
      this.revealTimers = [];
      this.particleCleanup = null;
      this.pageMotionControllers = /* @__PURE__ */ new Set();
      this.performanceTier = this.detectPerformanceTier();
      this.qualityProbeStarted = false;
      this.particleTourStart = null;
      this.particleTourStop = null;
      this.activeVideo = null;
      this.pointerFrame = 0;
      this.viewportFrame = 0;
      this.viewportObserver = null;
      this.touchStartX = 0;
      this.touchStartY = 0;
      this.lastImageTapAt = 0;
      this.lastImageTapTarget = null;
      this.lightboxScale = 1;
      this.lightboxX = 0;
      this.lightboxY = 0;
      this.lightboxPointers = /* @__PURE__ */ new Map();
      this.lightboxLastDistance = 0;
      this.lightboxDragOrigin = { x: 0, y: 0, imageX: 0, imageY: 0 };
      this.lightboxMediaType = "image";
      this.curlDragging = false;
      this.curlDirection = 1;
      this.curlPointerId = null;
      this.curlStartX = 0;
      this.curlStartY = 0;
      this.curlProgress = 0;
      this.curlUnderIndex = -1;
      this.pendingCurlStart = 0;
      this.suppressSwipeUntil = 0;
      this.mediaLoadToken = 0;
      this.mediaLoadTimers = /* @__PURE__ */ new Set();
      this.preloadedUrls = /* @__PURE__ */ new Set();
      this.root = root;
      this.audio = new Audio(config.settings.music);
      this.audio.loop = true;
      this.audio.volume = config.settings.musicVolume;
      this.installViewportSizing();
      this.renderShell();
      this.applyPerformanceTier();
      this.bindEvents();
      this.renderCurrent(false);
      this.preloadAround();
      this.scheduleQualityProbe();
    }
    renderShell() {
      const chapterMarkup = config.chapters.map((chapter) => {
        const chapterPages = config.pages.map((page, index) => ({ page, index })).filter(({ page }) => page.chapterId === chapter.id);
        const startIndex = config.pages.findIndex((page) => page.id === chapter.startPageId);
        return `<section class="chapter-group" data-chapter-group="${chapter.id}">
      <button type="button" class="chapter-link" data-chapter-id="${chapter.id}" data-page-id="${chapter.startPageId}">
        <span class="chapter-tab-mark" aria-hidden="true">${config.settings.brandEmblem ? `<img src="${config.settings.brandEmblem}" alt="" decoding="async">` : cmbMark("cmb-tab-svg")}</span>
        <span class="chapter-link-number">${esc(chapter.number)}</span>
        <span class="chapter-link-copy"><b>${esc(chapter.title)}</b><small>${esc(chapter.subtitle)}</small></span>
        <span class="chapter-page-number">${pad(startIndex + 1)}</span>
      </button>
      <div class="chapter-subnav" aria-label="${esc(chapter.title)}\u4E8C\u7EA7\u76EE\u5F55">
        ${chapterPages.map(({ page, index }, local) => `<button type="button" data-chapter-page-index="${index}" class="chapter-subpage" aria-label="${esc(page.pageLabel)}">
          <span>${pad(local + 1)}</span><b>${esc(page.pageLabel)}</b><i>${pad(index + 1)}</i>
        </button>`).join("")}
      </div>
    </section>`;
      }).join("");
      this.root.innerHTML = `<div class="experience" data-autoplay="${this.autoplay}">
    <div class="desk-surface" aria-hidden="true"><i></i><i></i><i></i></div>
    <div class="desk-pen" aria-hidden="true"><i></i></div>
    <div class="book-object" style="--spread-curve-clip:${bookSpreadClipPath()}">
      ${bookGeometrySvg()}
      <div class="cover-underlay" aria-hidden="true"></div>
      <div class="leaf-stack leaf-left" aria-hidden="true"></div>
      <div class="leaf-stack leaf-right" aria-hidden="true"></div>
      <div class="page-arch page-arch-left page-arch-top" aria-hidden="true">${pageArchSvg("left")}</div>
      <div class="page-arch page-arch-right page-arch-top" aria-hidden="true">${pageArchSvg("right")}</div>
      <div class="page-arch page-arch-left page-arch-bottom" aria-hidden="true">${pageArchSvg("left")}</div>
      <div class="page-arch page-arch-right page-arch-bottom" aria-hidden="true">${pageArchSvg("right")}</div>

      <aside class="chapter-rail" aria-label="\u6545\u4E8B\u76EE\u5F55" style="--page-curve-clip:${pageCurveClipPath("left")}">
        <div class="rail-page-inner">
          ${config.settings.brandEmblem ? `<img class="rail-brand-watermark is-emblem-only" src="${config.settings.brandEmblem}" alt="" aria-hidden="true">` : ""}
          <div class="rail-brand cmb-brand">
            ${config.settings.brandHeaderLogo ? `<div class="cmb-logo-lockup">
                  <span class="cmb-logo-fallback" aria-hidden="true"><span class="brand-seal cmb-seal">${cmbMark("cmb-mark-svg")}</span><span><b>\u62DB\u5546\u94F6\u884C</b><small>CHINA MERCHANTS BANK</small></span></span>
                  <img class="cmb-horizontal-logo" src="${config.settings.brandHeaderLogo}" alt="\u62DB\u5546\u94F6\u884C CHINA MERCHANTS BANK" decoding="async" onload="this.parentElement?.classList.add('is-loaded')" onerror="this.hidden=true">
                </div>` : `<span class="cmb-logo-fallback is-static"><span class="brand-seal cmb-seal">${cmbMark("cmb-mark-svg")}</span><span><b>\u62DB\u5546\u94F6\u884C</b><small>CHINA MERCHANTS BANK</small></span></span>`}
          </div>
          <div class="rail-edition" aria-label="\u62DB\u5546\u94F6\u884C\u82CF\u5DDE\u5206\u884C2026\u5C4A\u65B0\u5458\u5DE5\u57F9\u8BAD\u4E0E\u5165\u804C">
            <b>\u62DB\u5546\u94F6\u884C\u82CF\u5DDE\u5206\u884C</b><span>2026\u5C4A\u65B0\u5458\u5DE5\u57F9\u8BAD\u4E0E\u5165\u804C</span><small>\u56E0\u60A8\u800C\u53D8 \xB7 \u624E\u6839\u82CF\u57CE</small>
          </div>
          <button class="rail-mobile-close icon-button" type="button" aria-label="\u5173\u95ED\u76EE\u5F55">${icon("close")}</button>
          <div class="rail-heading"><span>CONTENTS</span><em>\u76EE\u5F55</em></div>
          <nav class="chapter-list">${chapterMarkup}</nav>
          <div class="rail-footer"><span>2026\u5C4A\u65B0\u5458\u5DE5\u57F9\u8BAD\u6210\u957F\u7EAA\u5B9E</span><span>\u62DB\u805A\u97F6\u534E \xB7 \u5411\u9633\u542F\u822A \xB7 \u56E0\u60A8\u800C\u53D8</span></div>
          <span class="left-folio">CONTENTS \xB7 \u76EE\u5F55</span>
        </div>
      </aside>

      <main class="reader" style="--page-curve-clip:${pageCurveClipPath("right")}">
        <header class="reader-header">
          <button type="button" class="mobile-menu icon-button" aria-label="\u6253\u5F00\u76EE\u5F55">${icon("menu")}</button>
          <div class="reader-breadcrumb"><span class="current-chapter-number">00</span><b class="current-chapter-name">\u5E8F\u7AE0</b><i></i><em class="current-page-label">\u5C01\u9762</em></div>
          <div class="reader-status"><span class="status-dot"></span><b class="auto-status">AUTO PLAY</b><small class="page-clock">00:00</small></div>
        </header>

        <section class="book-stage" aria-label="\u7F51\u9875\u6545\u4E8B\u4E66">
          <div class="book-shell">
            <div class="page-stack stack-one"></div><div class="page-stack stack-two"></div><div class="page-stack stack-three"></div>
            <div class="page-viewport">
              <div class="curl-under-page" aria-hidden="true"></div>
              <div class="page-surface"></div>
              <div class="reader-brand-watermark is-emblem-only" aria-hidden="true">${config.settings.brandEmblem ? `<img src="${config.settings.brandEmblem}" alt="">` : cmbMark("cmb-watermark-svg")}</div>
              <div class="page-edge-light"></div>
              <div class="static-page-curl" aria-hidden="true"></div>
              <div class="page-curl-preview" aria-hidden="true"><div class="curl-paper"></div><div class="curl-fold"></div><div class="curl-shadow"></div></div>
              <button type="button" class="page-curl-handle curl-handle-prev" data-curl-direction="-1" aria-label="\u62D6\u52A8\u8FD4\u56DE\u4E0A\u4E00\u9875"></button>
              <button type="button" class="page-curl-handle curl-handle-next" data-curl-direction="1" aria-label="\u62D6\u52A8\u7FFB\u5230\u4E0B\u4E00\u9875"></button>
              <div class="turn-sheet" aria-hidden="true"><div class="sheet-front"></div><div class="sheet-back"></div><div class="sheet-shadow"></div></div>
              <div class="transition-veil" aria-hidden="true"></div>
            </div>
          </div>
        </section>

        <footer class="reader-controls">
          <div class="timeline"><div class="timeline-fill"></div><div class="timeline-markers">${config.pages.map((_, i) => `<button type="button" data-page-index="${i}" aria-label="\u8DF3\u8F6C\u5230\u7B2C ${i + 1} \u9875"><span></span></button>`).join("")}</div></div>
          <div class="page-counter"><strong>01</strong><span>/</span><em>${pad(config.pages.length)}</em></div>
          <div class="corner-controls">
            <button type="button" class="book-tab play-toggle" aria-label="\u6682\u505C\u81EA\u52A8\u64AD\u653E"><span>AUTO</span>${icon("pause")}</button>
            <button type="button" class="book-tool music-toggle is-active" aria-label="\u5173\u95ED\u80CC\u666F\u97F3\u4E50">${icon("music")}</button>
            <button type="button" class="book-tool speed-button" aria-label="\u5207\u6362\u64AD\u653E\u901F\u5EA6"><span>${this.speed.toFixed(2).replace(/0$/, "")}\xD7</span></button>
            <button type="button" class="book-tool fullscreen-toggle" aria-label="\u5168\u5C4F\u64AD\u653E">${icon("expand")}</button>
          </div>
          <button type="button" class="page-corner-turn corner-prev prev-page" aria-label="\u4E0A\u4E00\u9875"><span>\u4E0A\u4E00\u9875</span></button>
          <button type="button" class="page-corner-turn corner-next next-page" aria-label="\u4E0B\u4E00\u9875"><span>\u4E0B\u4E00\u9875</span></button>
        </footer>
      </main>

      <div class="book-gutter" aria-hidden="true"><i></i></div>
      <div class="center-page-notch" aria-hidden="true"></div>
      <div class="rail-backdrop"></div>
    </div>
    <div class="toast" role="status" aria-live="polite"></div>
    <div class="image-lightbox" aria-hidden="true" role="dialog" aria-modal="true" aria-label="\u7167\u7247\u653E\u5927\u67E5\u770B">
      <button type="button" class="image-lightbox-close" aria-label="\u5173\u95ED\u7167\u7247\u67E5\u770B">${icon("close")}</button>
      <div class="image-lightbox-stage">
        <img src="" alt="">
        <video class="image-lightbox-video" src="" poster="" controls playsinline preload="metadata"></video>
      </div>
      <p class="image-lightbox-tip">\u70B9\u51FB\u53F3\u4E0A\u5173\u95ED</p>
    </div>
  </div>`;
      this.reader = $(".reader", this.root);
      this.surface = $(".page-surface", this.root);
      this.pageViewport = $(".page-viewport", this.root);
      this.chapterRail = $(".chapter-rail", this.root);
    }
    bindEvents() {
      this.root.addEventListener("click", (event) => {
        const target = event.target;
        if (target.closest(".image-lightbox-close") || target.classList.contains("image-lightbox")) {
          this.closeImageLightbox();
          return;
        }
        if (target.closest(".start-story")) {
          void this.startExperience();
          return;
        }
        if (target.closest(".restart-story")) {
          this.restartAutoplayFromCover();
          return;
        }
        if (target.closest(".prev-page")) {
          if (performance.now() < this.suppressSwipeUntil)
            return;
          this.manualGoTo(this.currentIndex - 1);
          return;
        }
        if (target.closest(".next-page")) {
          if (performance.now() < this.suppressSwipeUntil)
            return;
          this.manualGoTo(this.currentIndex + 1);
          return;
        }
        if (target.closest(".play-toggle")) {
          this.toggleAutoplay();
          return;
        }
        if (target.closest(".music-toggle")) {
          void this.toggleMusic();
          return;
        }
        if (target.closest(".fullscreen-toggle")) {
          void this.toggleFullscreen();
          return;
        }
        if (target.closest(".speed-button")) {
          this.cycleSpeed();
          return;
        }
        if (target.closest(".mobile-menu")) {
          this.toggleRail(true);
          return;
        }
        if (target.closest(".rail-mobile-close") || target.closest(".rail-backdrop")) {
          this.toggleRail(false);
          return;
        }
        const chapterLink = target.closest(".chapter-link");
        if (chapterLink) {
          const pageId = chapterLink.dataset.pageId;
          const index = config.pages.findIndex((page) => page.id === pageId);
          this.pauseForManual("\u5DF2\u5207\u6362\u4E3A\u624B\u52A8\u6D4F\u89C8");
          this.goTo(index);
          this.toggleRail(false);
          return;
        }
        const chapterPage = target.closest("[data-chapter-page-index]");
        if (chapterPage) {
          this.pauseForManual("\u5DF2\u5207\u6362\u4E3A\u624B\u52A8\u6D4F\u89C8");
          this.goTo(Number(chapterPage.dataset.chapterPageIndex));
          this.toggleRail(false);
          return;
        }
        const timelineButton = target.closest("[data-page-index]");
        if (timelineButton) {
          this.pauseForManual("\u5DF2\u5207\u6362\u4E3A\u624B\u52A8\u6D4F\u89C8");
          this.goTo(Number(timelineButton.dataset.pageIndex));
          return;
        }
        const storyMediaContainer = target.closest(".story-page .media-frame, .story-page .particle-photo-preview");
        const directStoryMedia = target.closest(".story-page img, .story-page video");
        const media = directStoryMedia ?? storyMediaContainer?.querySelector("img, video") ?? null;
        if (media && !target.closest(".start-story") && this.isStoryContentMedia(media)) {
          event.preventDefault();
          event.stopPropagation();
          this.openMediaLightbox(media);
          return;
        }
        const focusThumb = target.closest(".focus-thumb");
        if (focusThumb) {
          this.pauseForManual("\u5DF2\u9009\u62E9\u9AD8\u5149\u7167\u7247\uFF1A\u81EA\u52A8\u64AD\u653E\u6682\u505C");
          $$(".focus-thumb", this.surface).forEach((item) => item.classList.toggle("is-focused", item === focusThumb));
          const readout = $(".focus-readout b", this.surface);
          const index = Number(focusThumb.dataset.focusIndex ?? 0);
          if (readout)
            readout.textContent = pad(index + 1);
          return;
        }
      });
      this.root.addEventListener("dblclick", (event) => {
        const target = event.target;
        if (target.closest(".image-lightbox-stage")) {
          event.preventDefault();
          this.toggleLightboxZoom(event.clientX, event.clientY);
          return;
        }
        const media = target.closest(".story-page img, .story-page video");
        if (media && this.isStoryContentMedia(media)) {
          event.preventDefault();
          event.stopPropagation();
          this.openMediaLightbox(media);
        }
      });
      this.root.addEventListener("pointerup", (event) => {
        if (event.pointerType !== "touch")
          return;
        const target = event.target;
        const media = target.closest(".story-page img, .story-page video");
        if (!media || !this.isStoryContentMedia(media)) {
          this.lastImageTapTarget = null;
          this.lastImageTapAt = 0;
          return;
        }
        const now = performance.now();
        if (this.lastImageTapTarget === media && now - this.lastImageTapAt < 360) {
          event.preventDefault();
          this.openMediaLightbox(media);
          this.lastImageTapTarget = null;
          this.lastImageTapAt = 0;
        } else {
          this.lastImageTapTarget = media;
          this.lastImageTapAt = now;
        }
      });
      this.bindImageLightboxGestures();
      this.bindPageCurlGestures();
      window.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft")
          this.manualGoTo(this.currentIndex - 1);
        if (event.key === "ArrowRight")
          this.manualGoTo(this.currentIndex + 1);
        if (event.code === "Space") {
          event.preventDefault();
          this.toggleAutoplay();
        }
        if (event.key.toLowerCase() === "m")
          void this.toggleMusic();
        if (event.key === "Escape") {
          if (this.root.classList.contains("is-image-lightbox-open"))
            this.closeImageLightbox();
          else
            this.toggleRail(false);
        }
      });
      this.pageViewport.addEventListener("touchstart", (event) => {
        this.touchStartX = event.touches[0].clientX;
        this.touchStartY = event.touches[0].clientY;
      }, { passive: true });
      this.pageViewport.addEventListener("touchend", (event) => {
        if (performance.now() < this.suppressSwipeUntil)
          return;
        const dx = event.changedTouches[0].clientX - this.touchStartX;
        const dy = event.changedTouches[0].clientY - this.touchStartY;
        if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy))
          this.manualGoTo(this.currentIndex + (dx < 0 ? 1 : -1));
      }, { passive: true });
      this.reader.addEventListener("pointermove", (event) => {
        if (this.pointerFrame || reduceMotion3)
          return;
        this.pointerFrame = requestAnimationFrame(() => {
          this.pointerFrame = 0;
          const rect = this.reader.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          this.root.style.setProperty("--pointer-x", x.toFixed(3));
          this.root.style.setProperty("--pointer-y", y.toFixed(3));
        });
      });
      document.addEventListener("fullscreenchange", () => this.root.classList.toggle("is-fullscreen", Boolean(document.fullscreenElement)));
      document.addEventListener("visibilitychange", () => {
        this.revealAnimations.forEach((animation) => document.hidden ? animation.pause() : animation.play());
        this.syncPageMotion();
      });
    }
    detectPerformanceTier() {
      const cores = navigator.hardwareConcurrency || 4;
      const memory = navigator.deviceMemory || 4;
      const pixels = Math.max(1, window.innerWidth * window.innerHeight * Math.min(window.devicePixelRatio || 1, 2));
      if (cores <= 4 || memory <= 4 || pixels > 55e5)
        return "medium";
      return "high";
    }
    applyPerformanceTier() {
      this.root.dataset.performanceTier = this.performanceTier;
      this.root.classList.toggle("is-medium-performance", this.performanceTier === "medium");
      this.root.classList.toggle("is-low-performance", this.performanceTier === "low");
    }
    scheduleQualityProbe() {
      if (this.qualityProbeStarted || reduceMotion3)
        return;
      this.qualityProbeStarted = true;
      window.setTimeout(() => {
        let frames = 0;
        const start = performance.now();
        const sample = (now) => {
          frames += 1;
          if (now - start < 900) {
            requestAnimationFrame(sample);
            return;
          }
          const fps = frames * 1e3 / Math.max(1, now - start);
          const nextTier = fps < 24 ? "low" : fps < 47 ? "medium" : this.performanceTier;
          if (nextTier !== this.performanceTier) {
            this.performanceTier = nextTier;
            this.applyPerformanceTier();
          }
        };
        requestAnimationFrame(sample);
      }, 1200);
    }
    registerPageMotion(controller) {
      this.pageMotionControllers.add(controller);
      this.syncPageMotion();
      return controller;
    }
    syncPageMotion() {
      const shouldRun = !document.hidden && this.started;
      this.pageMotionControllers.forEach((controller) => controller[shouldRun ? "resume" : "pause"]?.());
    }
    installViewportSizing() {
      const smallestPositive = (...values) => {
        const usable = values.filter((value) => Number.isFinite(value) && value > 0);
        return usable.length ? Math.min(...usable) : 0;
      };
      const apply = () => {
        this.viewportFrame = 0;
        const viewport = window.visualViewport;
        const doc = document.documentElement;
        const scaledVisualWidth = viewport ? viewport.width * viewport.scale : 0;
        const scaledVisualHeight = viewport ? viewport.height * viewport.scale : 0;
        const measuredWidth = smallestPositive(doc.clientWidth, window.innerWidth, scaledVisualWidth);
        const measuredHeight = smallestPositive(doc.clientHeight, window.innerHeight, scaledVisualHeight);
        const width = Math.max(280, Math.round(measuredWidth || window.innerWidth || 280));
        const height = Math.max(360, Math.round(measuredHeight || window.innerHeight || 360));
        const rootStyle = document.documentElement.style;
        rootStyle.setProperty("--app-width", `${width}px`);
        rootStyle.setProperty("--app-height", `${height}px`);
        rootStyle.setProperty("--app-offset-left", "0px");
        rootStyle.setProperty("--app-offset-top", "0px");
        const narrow = width <= 900 || window.matchMedia("(max-width: 900px)").matches;
        const phone = width <= 560 || window.matchMedia("(max-width: 560px)").matches;
        this.root.classList.toggle("is-narrow-layout", narrow);
        this.root.classList.toggle("is-phone-layout", phone);
        this.root.dataset.viewportWidth = String(width);
        this.root.dataset.viewportHeight = String(height);
        this.root.dataset.viewportScale = String(viewport?.scale ?? 1);
        if (!narrow)
          this.root.classList.remove("is-rail-open");
      };
      const schedule = () => {
        if (this.viewportFrame)
          cancelAnimationFrame(this.viewportFrame);
        this.viewportFrame = requestAnimationFrame(apply);
      };
      apply();
      window.addEventListener("resize", schedule, { passive: true });
      window.addEventListener("orientationchange", schedule, { passive: true });
      window.visualViewport?.addEventListener("resize", schedule, { passive: true });
      window.visualViewport?.addEventListener("scroll", schedule, { passive: true });
      document.addEventListener("fullscreenchange", schedule);
      this.viewportObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
      this.viewportObserver?.observe(document.documentElement);
    }
    isStoryContentMedia(media) {
      return !media.closest(".reader-brand-watermark, .rail-brand, .rail-brand-watermark, .chapter-tab-mark, .cover-standard-emblem, .layout-cover .cover-image");
    }
    openMediaLightbox(media) {
      const lightbox = $(".image-lightbox", this.root);
      const imageTarget = $(".image-lightbox-stage img", this.root);
      const videoTarget = $(".image-lightbox-video", this.root);
      if (!lightbox || !imageTarget || !videoTarget)
        return;
      this.pauseForManual("\u5DF2\u6253\u5F00\u5A92\u4F53\u67E5\u770B\uFF1A\u81EA\u52A8\u64AD\u653E\u6682\u505C");
      videoTarget.pause();
      videoTarget.removeAttribute("src");
      videoTarget.load();
      imageTarget.removeAttribute("src");
      imageTarget.alt = "";
      if (media instanceof HTMLVideoElement) {
        this.lightboxMediaType = "video";
        videoTarget.src = media.currentSrc || media.src;
        videoTarget.poster = media.poster || "";
        videoTarget.setAttribute("aria-label", media.getAttribute("aria-label") || "\u653E\u5927\u89C6\u9891");
        lightbox.classList.add("is-video-mode");
        lightbox.classList.remove("is-image-mode");
        media.pause();
        void videoTarget.play().catch(() => void 0);
      } else {
        const source = media.currentSrc || media.src;
        if (!source)
          return;
        this.lightboxMediaType = "image";
        imageTarget.src = source;
        imageTarget.alt = media.alt || "\u653E\u5927\u7167\u7247";
        lightbox.classList.add("is-image-mode");
        lightbox.classList.remove("is-video-mode");
      }
      this.lightboxScale = 1;
      this.lightboxX = 0;
      this.lightboxY = 0;
      this.lightboxPointers.clear();
      this.lightboxLastDistance = 0;
      this.applyLightboxTransform();
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      this.root.classList.add("is-image-lightbox-open");
      document.body.classList.add("has-image-lightbox");
    }
    closeImageLightbox() {
      const lightbox = $(".image-lightbox", this.root);
      if (!lightbox?.classList.contains("is-open"))
        return;
      const video = $(".image-lightbox-video", this.root);
      video?.pause();
      if (video) {
        video.removeAttribute("src");
        video.load();
      }
      lightbox.classList.remove("is-open", "is-video-mode", "is-image-mode");
      lightbox.setAttribute("aria-hidden", "true");
      this.root.classList.remove("is-image-lightbox-open");
      document.body.classList.remove("has-image-lightbox");
      this.lightboxPointers.clear();
      this.lightboxLastDistance = 0;
    }
    applyLightboxTransform() {
      const lightbox = $(".image-lightbox", this.root);
      if (!lightbox)
        return;
      lightbox.style.setProperty("--lightbox-scale", this.lightboxScale.toFixed(3));
      lightbox.style.setProperty("--lightbox-x", `${this.lightboxX.toFixed(1)}px`);
      lightbox.style.setProperty("--lightbox-y", `${this.lightboxY.toFixed(1)}px`);
    }
    setLightboxScale(nextScale, clientX, clientY) {
      const lightbox = $(".image-lightbox", this.root);
      if (!lightbox)
        return;
      const previous = this.lightboxScale;
      const scale = clamp(nextScale, 1, 5);
      if (clientX !== void 0 && clientY !== void 0 && previous > 0) {
        const rect = lightbox.getBoundingClientRect();
        const localX = clientX - (rect.left + rect.width / 2) - this.lightboxX;
        const localY = clientY - (rect.top + rect.height / 2) - this.lightboxY;
        const ratio = scale / previous;
        this.lightboxX -= localX * (ratio - 1);
        this.lightboxY -= localY * (ratio - 1);
      }
      this.lightboxScale = scale;
      if (scale <= 1.001) {
        this.lightboxX = 0;
        this.lightboxY = 0;
      }
      this.applyLightboxTransform();
    }
    toggleLightboxZoom(clientX, clientY) {
      if (this.lightboxMediaType !== "image")
        return;
      this.setLightboxScale(this.lightboxScale > 1.15 ? 1 : 2.5, clientX, clientY);
    }
    bindImageLightboxGestures() {
      const stage = $(".image-lightbox-stage", this.root);
      if (!stage)
        return;
      stage.addEventListener("wheel", (event) => {
        if (!this.root.classList.contains("is-image-lightbox-open") || this.lightboxMediaType !== "image")
          return;
        event.preventDefault();
        const factor = Math.exp(-event.deltaY * 15e-4);
        this.setLightboxScale(this.lightboxScale * factor, event.clientX, event.clientY);
      }, { passive: false });
      stage.addEventListener("pointerdown", (event) => {
        if (!this.root.classList.contains("is-image-lightbox-open") || this.lightboxMediaType !== "image")
          return;
        stage.setPointerCapture?.(event.pointerId);
        this.lightboxPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
        this.lightboxDragOrigin = { x: event.clientX, y: event.clientY, imageX: this.lightboxX, imageY: this.lightboxY };
        if (this.lightboxPointers.size === 2) {
          const points = Array.from(this.lightboxPointers.values());
          this.lightboxLastDistance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
        }
      });
      stage.addEventListener("pointermove", (event) => {
        if (!this.lightboxPointers.has(event.pointerId))
          return;
        this.lightboxPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
        if (this.lightboxPointers.size >= 2) {
          const points = Array.from(this.lightboxPointers.values()).slice(0, 2);
          const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
          const centerX = (points[0].x + points[1].x) / 2;
          const centerY = (points[0].y + points[1].y) / 2;
          if (this.lightboxLastDistance > 0)
            this.setLightboxScale(this.lightboxScale * distance / this.lightboxLastDistance, centerX, centerY);
          this.lightboxLastDistance = distance;
          return;
        }
        if (this.lightboxScale <= 1.001)
          return;
        this.lightboxX = this.lightboxDragOrigin.imageX + event.clientX - this.lightboxDragOrigin.x;
        this.lightboxY = this.lightboxDragOrigin.imageY + event.clientY - this.lightboxDragOrigin.y;
        this.applyLightboxTransform();
      });
      const release = (event) => {
        this.lightboxPointers.delete(event.pointerId);
        this.lightboxLastDistance = 0;
        try {
          stage.releasePointerCapture?.(event.pointerId);
        } catch {
        }
      };
      stage.addEventListener("pointerup", release);
      stage.addEventListener("pointercancel", release);
    }
    prepareCurlUnderPage(direction) {
      const under = $(".curl-under-page", this.root);
      if (!under)
        return;
      if (this.curlUnderIndex !== direction || !under.firstElementChild) {
        under.innerHTML = `<div class="curl-blank-leaf" aria-hidden="true"><i></i><b></b></div>`;
        this.curlUnderIndex = direction;
      }
      under.classList.add("is-active");
      under.dataset.direction = String(direction);
    }
    clearCurlUnderPage() {
      const under = $(".curl-under-page", this.root);
      under?.classList.remove("is-active");
      if (under)
        under.innerHTML = "";
      this.curlUnderIndex = -1;
      this.pageViewport.classList.remove("is-curling", "is-curl-left");
      this.pageViewport.style.removeProperty("--curl-cut-x");
      this.pageViewport.style.removeProperty("--curl-cut-y");
    }
    setCurlPreview(direction, progress, dragging = false) {
      const preview = $(".page-curl-preview", this.root);
      if (!preview)
        return;
      const rect = this.pageViewport.getBoundingClientRect();
      const clamped = Math.max(0, Math.min(1, progress));
      this.curlDirection = direction;
      this.curlProgress = clamped;
      const shaped = clamped * clamped * (3 - 2 * clamped);
      const curlWidth = Math.max(0, rect.width * 0.66 * shaped);
      const curlHeight = Math.max(0, Math.min(rect.height * 0.72, rect.height * (0.18 + 0.54 * shaped) * shaped));
      preview.classList.toggle("is-active", clamped > 0.012);
      preview.classList.toggle("is-left", direction < 0);
      preview.classList.toggle("is-dragging", dragging);
      preview.style.setProperty("--curl-width", `${curlWidth}px`);
      preview.style.setProperty("--curl-height", `${curlHeight}px`);
      preview.style.setProperty("--curl-opacity", String(Math.min(1, 0.08 + shaped * 1.15)));
      preview.style.setProperty("--curl-bend", `${Math.round(10 + shaped * 58)}deg`);
      preview.style.setProperty("--curl-twist", `${Math.round((direction > 0 ? -1 : 1) * shaped * 2.5)}deg`);
      preview.style.setProperty("--curl-curve", String(shaped));
      this.pageViewport.style.setProperty("--curl-cut-x", `${Math.min(rect.width * 0.66, curlWidth * 0.98)}px`);
      this.pageViewport.style.setProperty("--curl-cut-y", `${Math.min(rect.height * 0.72, curlHeight * 0.98)}px`);
      this.pageViewport.classList.toggle("is-curling", clamped > 0.025);
      this.pageViewport.classList.toggle("is-curl-left", direction < 0);
      if (clamped > 0.025)
        this.prepareCurlUnderPage(direction);
      else
        this.clearCurlUnderPage();
    }
    async animateCurl(direction, from, to, duration) {
      if (reduceMotion3) {
        this.setCurlPreview(direction, to);
        return;
      }
      const start = performance.now();
      await new Promise((resolve) => {
        const tick = (now) => {
          const t = Math.min(1, (now - start) / Math.max(1, duration));
          const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
          this.setCurlPreview(direction, from + (to - from) * eased);
          if (t < 1)
            requestAnimationFrame(tick);
          else
            resolve();
        };
        requestAnimationFrame(tick);
      });
    }
    bindPageCurlGestures() {
      const begin = (event, direction) => {
        if (this.transitioning || event.button > 0)
          return;
        const targetIndex = this.currentIndex + direction;
        if (targetIndex < 0 || targetIndex >= config.pages.length)
          return;
        this.curlDragging = true;
        this.curlDirection = direction;
        this.curlPointerId = event.pointerId;
        this.curlStartX = event.clientX;
        this.curlStartY = event.clientY;
        event.currentTarget?.setPointerCapture?.(event.pointerId);
        this.pauseForManual("\u624B\u52A8\u6380\u9875\u5DF2\u6682\u505C\u81EA\u52A8\u64AD\u653E");
        this.setCurlPreview(direction, 0.12, true);
        event.preventDefault();
        event.stopPropagation();
      };
      $$(".page-curl-handle, .page-corner-turn", this.root).forEach((handle) => {
        const direction = handle.classList.contains("corner-prev") || handle.classList.contains("curl-handle-prev") ? -1 : 1;
        handle.addEventListener("pointerdown", (event) => begin(event, direction));
        handle.addEventListener("pointerenter", () => {
          if (!this.curlDragging && !this.transitioning)
            this.setCurlPreview(direction, 0.14);
        });
        handle.addEventListener("pointerleave", () => {
          if (!this.curlDragging)
            this.setCurlPreview(this.curlDirection, 0);
        });
      });
      const getCorner = (event) => {
        const rect = this.pageViewport.getBoundingClientRect();
        const threshold = Math.max(78, Math.min(170, rect.width * 0.18));
        const bottomDistance = rect.bottom - event.clientY;
        if (bottomDistance < -10 || bottomDistance > threshold * 1.35)
          return null;
        const leftDistance = event.clientX - rect.left;
        const rightDistance = rect.right - event.clientX;
        if (rightDistance >= 0 && rightDistance <= threshold)
          return { direction: 1, distance: Math.hypot(rightDistance, Math.max(0, bottomDistance)), threshold };
        if (leftDistance >= 0 && leftDistance <= threshold)
          return { direction: -1, distance: Math.hypot(leftDistance, Math.max(0, bottomDistance)), threshold };
        return null;
      };
      this.pageViewport.addEventListener("pointermove", (event) => {
        if (this.transitioning || this.curlDragging || reduceMotion3)
          return;
        const corner = getCorner(event);
        if (!corner) {
          this.setCurlPreview(this.curlDirection, 0);
          return;
        }
        this.setCurlPreview(corner.direction, Math.max(0.05, (1 - Math.min(1, corner.distance / corner.threshold)) * 0.34));
      });
      this.pageViewport.addEventListener("pointerleave", () => {
        if (!this.curlDragging)
          this.setCurlPreview(this.curlDirection, 0);
      });
      this.pageViewport.addEventListener("pointerdown", (event) => {
        if (this.curlDragging)
          return;
        const corner = getCorner(event);
        if (corner)
          begin(event, corner.direction);
      });
      const move = (event) => {
        if (!this.curlDragging || this.curlPointerId !== event.pointerId)
          return;
        const rect = this.pageViewport.getBoundingClientRect();
        const horizontal = this.curlDirection > 0 ? this.curlStartX - event.clientX : event.clientX - this.curlStartX;
        const vertical = this.curlStartY - event.clientY;
        const travel = Math.max(0, horizontal) + Math.max(0, vertical) * 0.38;
        const progress = 0.12 + travel / Math.max(110, rect.width * 0.58);
        this.setCurlPreview(this.curlDirection, progress, true);
        event.preventDefault();
      };
      const release = async (event) => {
        if (!this.curlDragging || this.curlPointerId !== event.pointerId)
          return;
        const progress = this.curlProgress;
        const direction = this.curlDirection;
        this.curlDragging = false;
        this.curlPointerId = null;
        this.suppressSwipeUntil = performance.now() + 700;
        if (progress <= 0.16 || progress >= 0.34) {
          this.pendingCurlStart = Math.max(0.12, progress);
          this.goTo(this.currentIndex + direction);
        } else {
          await this.animateCurl(direction, progress, 0, 260);
          this.setCurlPreview(direction, 0);
        }
      };
      window.addEventListener("pointermove", move, { passive: false });
      window.addEventListener("pointerup", release);
      window.addEventListener("pointercancel", release);
    }
    async startExperience() {
      if (this.transitioning)
        return;
      this.started = true;
      this.autoplay = true;
      this.updateAutoplayUI();
      this.clearPageClock();
      this.root.classList.add("is-opening");
      if (this.musicEnabled) {
        void this.audio.play().catch(() => {
          this.musicEnabled = false;
          this.updateMusicButton();
        });
      }
      window.setTimeout(() => {
        this.root.classList.remove("is-opening");
        if (this.currentIndex === 0)
          this.goTo(1, true);
        else
          this.scheduleCurrent();
      }, reduceMotion3 ? 80 : 560);
    }
    manualGoTo(index) {
      if (!this.started && index !== 0)
        return;
      this.pauseForManual("\u624B\u52A8\u64CD\u4F5C\u5DF2\u6682\u505C\u81EA\u52A8\u64AD\u653E");
      this.goTo(index);
    }
    pauseForManual(message) {
      this.particleTourStop?.();
      if (this.autoplay) {
        this.autoplay = false;
        this.updateAutoplayUI();
        this.showToast(message);
      }
      this.clearPageClock();
    }
    goTo(index, animate = true) {
      if (this.transitioning)
        return;
      let nextIndex = index;
      if (nextIndex < 0)
        nextIndex = config.settings.loop ? config.pages.length - 1 : 0;
      if (nextIndex >= config.pages.length)
        nextIndex = config.settings.loop ? 0 : config.pages.length - 1;
      if (nextIndex === this.currentIndex && this.surface.childElementCount) {
        this.scheduleCurrent();
        return;
      }
      const from = this.currentIndex;
      this.currentIndex = nextIndex;
      const direction = nextIndex >= from ? 1 : -1;
      if (!animate || reduceMotion3) {
        this.renderCurrent(false);
        return;
      }
      void this.transitionTo(config.pages[nextIndex], direction);
    }
    prepareIncomingPage(page) {
      this.pageViewport.dataset.page = page.id;
      this.pageViewport.dataset.layout = page.layout;
      this.pageViewport.dataset.chapter = page.chapterId;
      this.surface.classList.add("is-swap-hidden", "is-awaiting-reveal");
      this.surface.innerHTML = renderPage(page);
      this.hydrateCurrentImages();
      void this.surface.offsetWidth;
    }
    showIncomingSurface(keyframes, options) {
      const animation = this.surface.animate(keyframes, { fill: "both", ...options });
      this.surface.classList.remove("is-swap-hidden");
      return animation;
    }
    async transitionTo(page, direction) {
      this.transitioning = true;
      const dir = direction;
      const duration = Math.min(1250, Math.max(1050, config.settings.transitionMs * 0.82));
      const outgoing = this.surface;
      const turnSheet = $(".turn-sheet", this.root);
      const veil = $(".transition-veil", this.root);
      const transition = page.transition;
      const curlStart = Math.max(0, Math.min(1, this.pendingCurlStart || this.curlProgress || 0));
      let turningLeaf = null;
      let leafAnimation = null;
      let incoming = null;
      this.pendingCurlStart = 0;
      this.pageViewport.dataset.transition = transition;
      this.pageViewport.dataset.direction = String(direction);
      this.pageViewport.classList.add("is-page-turning");
      turnSheet.classList.remove("is-active");
      veil.classList.remove("is-active");
      this.clearCurlUnderPage();
      try {
        /* The corner is only the opening gesture. Expanding it to 100% creates
           a flat tinted veil, especially in Chromium-based 360 browsers. */
        await this.animateCurl(dir, curlStart, 0.2, Math.min(230, duration * 0.2));

        turningLeaf = document.createElement("div");
        turningLeaf.className = `page-turn-leaf ${dir < 0 ? "is-backward" : "is-forward"}`;
        const snapshot = outgoing.cloneNode(true);
        snapshot.classList.remove("is-swap-hidden", "is-awaiting-reveal");
        snapshot.removeAttribute("id");
        turningLeaf.append(snapshot);
        outgoing.parentElement.append(turningLeaf);

        this.setCurlPreview(dir, 0);
        this.clearPageRuntime();
        this.prepareIncomingPage(page);
        this.updateNavigation();
        this.attachVideoEvents();
        this.runReveal(page);
        this.setupValuesBrand(page);
        this.setupParticleCloud(page);
        this.setupFilmRibbon(page);

        const sign = dir > 0 ? -1 : 1;
        const shift = dir > 0 ? "-4%" : "4%";
        leafAnimation = turningLeaf.animate([
          { transform: "perspective(2600px) rotateY(0deg) translate3d(0,0,1px)", offset: 0 },
          { transform: `perspective(2600px) rotateY(${sign * 16}deg) translate3d(${dir > 0 ? "-.5%" : ".5%"},0,20px)`, offset: .2 },
          { transform: `perspective(2600px) rotateY(${sign * 58}deg) translate3d(${dir > 0 ? "-2%" : "2%"},0,34px)`, offset: .62 },
          { transform: `perspective(2600px) rotateY(${sign * 96}deg) translate3d(${shift},0,2px)`, offset: 1 }
        ], {
          duration,
          easing: "cubic-bezier(.33,.02,.18,1)",
          fill: "forwards"
        });
        incoming = this.showIncomingSurface([
          { transform: `translateX(${dir > 0 ? "1.1%" : "-1.1%"})`, opacity: .48 },
          { transform: "translateX(0)", opacity: 1 }
        ], {
          duration: Math.round(duration * .9),
          delay: Math.round(duration * .08),
          easing: "cubic-bezier(.18,.64,.2,1)"
        });
        await Promise.allSettled([leafAnimation.finished, incoming.finished]);
        leafAnimation.cancel();
        incoming.cancel();
        turningLeaf.remove();
        turningLeaf = null;
        this.clearCurlUnderPage();
        this.scheduleCurrent();
        this.preloadAround();
      } finally {
        leafAnimation?.cancel();
        incoming?.cancel();
        turningLeaf?.remove();
        turnSheet.classList.remove("is-active");
        veil.classList.remove("is-active");
        outgoing.style.transformOrigin = "";
        outgoing.style.visibility = "";
        this.pageViewport.classList.remove("is-page-turning");
        this.setCurlPreview(dir, 0);
        this.clearCurlUnderPage();
        this.transitioning = false;
      }
    }
    renderCurrent(withAnimation) {
      this.clearPageRuntime();
      const page = config.pages[this.currentIndex];
      this.pageViewport.dataset.page = page.id;
      this.pageViewport.dataset.layout = page.layout;
      this.pageViewport.dataset.chapter = page.chapterId;
      this.surface.classList.add("is-swap-hidden", "is-awaiting-reveal");
      this.surface.innerHTML = renderPage(page);
      this.hydrateCurrentImages();
      void this.surface.offsetWidth;
      if (withAnimation && !reduceMotion3) {
        const animation = this.showIncomingSurface([{ opacity: 0 }, { opacity: 1 }], { duration: 500 });
        void animation.finished.finally(() => animation.cancel());
      } else {
        this.surface.classList.remove("is-swap-hidden");
      }
      this.afterRender();
    }
    afterRender() {
      this.updateNavigation();
      this.attachVideoEvents();
      this.runReveal(config.pages[this.currentIndex]);
      this.setupValuesBrand(config.pages[this.currentIndex]);
      this.setupParticleCloud(config.pages[this.currentIndex]);
      this.setupFilmRibbon(config.pages[this.currentIndex]);
      this.scheduleCurrent();
      this.preloadAround();
    }
    updateNavigation() {
      const page = config.pages[this.currentIndex];
      const chapter = config.chapters.find((item) => item.id === page.chapterId) ?? config.chapters[0];
      this.pageViewport.dataset.page = page.id;
      this.pageViewport.dataset.layout = page.layout;
      this.pageViewport.dataset.chapter = page.chapterId;
      $(".current-chapter-number", this.root).textContent = chapter.number;
      $(".current-chapter-name", this.root).textContent = chapter.title;
      $(".current-page-label", this.root).textContent = page.pageLabel;
      $(".page-counter strong", this.root).textContent = pad(this.currentIndex + 1);
      $$(".chapter-link", this.root).forEach((button) => button.classList.toggle("is-active", button.dataset.chapterId === chapter.id));
      $$(".chapter-group", this.root).forEach((group) => group.classList.toggle("is-active", group.dataset.chapterGroup === chapter.id));
      $$("[data-page-index]", this.root).forEach((button, index) => {
        button.classList.toggle("is-current", index === this.currentIndex);
        button.classList.toggle("is-past", index < this.currentIndex);
      });
      $$("[data-chapter-page-index]", this.root).forEach((button) => {
        button.classList.toggle("is-active", Number(button.dataset.chapterPageIndex) === this.currentIndex);
      });
      this.updateAutoplayUI();
    }
    runReveal(page) {
      return runReveal.call(this, page);
    }
    async setupValuesBrand(page) {
      return setupValuesBrand.call(this, page);
    }
    setupParticleCloud(page) {
      return setupParticleCloud.call(this, page);
    }
    setupFilmRibbon(page) {
      return setupFilmRibbon.call(this, page);
    }
    attachVideoEvents() {
      this.activeVideo = $("video", this.surface);
      if (!this.activeVideo)
        return;
      const timeLabel = $(".video-time", this.surface);
      this.activeVideo.addEventListener("timeupdate", () => {
        if (!timeLabel || !this.activeVideo)
          return;
        const seconds = Math.floor(this.activeVideo.currentTime);
        timeLabel.textContent = `00:${pad(seconds)}`;
      });
      this.activeVideo.addEventListener("play", () => {
        this.audio.volume = config.settings.videoMusicVolume;
      });
      this.activeVideo.addEventListener("pause", () => {
        if (!this.activeVideo?.ended)
          this.audio.volume = config.settings.musicVolume * 0.55;
      });
      this.activeVideo.addEventListener("ended", () => {
        this.audio.volume = config.settings.musicVolume;
        if (this.autoplay && config.pages[this.currentIndex].waitForVideoEnd)
          this.goTo(this.currentIndex + 1);
      });
      this.activeVideo.addEventListener("error", () => {
        if (this.autoplay)
          this.startPageClock(2500);
      });
    }
    scheduleCurrent() {
      this.clearPageClock();
      if (!this.autoplay || !this.started)
        return;
      const page = config.pages[this.currentIndex];
      if (page.layout === "particle-cloud") {
        this.setClockText("STAR");
        this.particleTourStart?.();
        return;
      }
      if (page.waitForVideoEnd && this.activeVideo) {
        this.activeVideo.currentTime = 0;
        this.activeVideo.muted = false;
        void this.activeVideo.play().catch(() => {
          this.activeVideo.muted = true;
          return this.activeVideo.play();
        }).catch(() => this.startPageClock(page.durationMs ?? config.settings.defaultDurationMs));
        this.setClockText("VIDEO");
        this.startVideoProgress(this.activeVideo);
        return;
      }
      this.startPageClock((page.durationMs ?? config.settings.defaultDurationMs) / this.speed);
    }
    startPageClock(duration) {
      this.timerDuration = duration;
      this.timerStart = performance.now();
      this.pageTimer = window.setTimeout(() => this.goTo(this.currentIndex + 1), duration);
      const tick = (now) => {
        const elapsed = now - this.timerStart;
        const progress = clamp(elapsed / this.timerDuration, 0, 1);
        this.setTimelineProgress(progress);
        this.setClockText(this.formatRemaining(Math.max(0, this.timerDuration - elapsed)));
        if (progress < 1 && this.autoplay)
          this.progressFrame = requestAnimationFrame(tick);
      };
      this.progressFrame = requestAnimationFrame(tick);
    }
    startVideoProgress(video) {
      const tick = () => {
        const progress = video.duration && Number.isFinite(video.duration) ? video.currentTime / video.duration : 0;
        this.setTimelineProgress(progress);
        if (!video.ended && this.autoplay)
          this.progressFrame = requestAnimationFrame(tick);
      };
      this.progressFrame = requestAnimationFrame(tick);
    }
    clearPageClock() {
      window.clearTimeout(this.pageTimer);
      cancelAnimationFrame(this.progressFrame);
      this.pageTimer = 0;
      this.progressFrame = 0;
      this.setTimelineProgress(0);
    }
    clearPageRuntime() {
      this.clearPageClock();
      this.mediaLoadToken++;
      this.mediaLoadTimers.forEach((timer) => window.clearTimeout(timer));
      this.mediaLoadTimers.clear();
      this.revealAnimations.forEach((animation) => animation.cancel());
      this.revealAnimations = [];
      this.revealTimers.forEach((timer) => {
        window.clearTimeout(timer);
        window.clearInterval(timer);
      });
      this.revealTimers = [];
      this.particleTourStop?.();
      this.particleTourStart = null;
      this.particleTourStop = null;
      this.particleCleanup?.();
      this.particleCleanup = null;
      this.pageMotionControllers.forEach((controller) => controller.stop?.());
      this.pageMotionControllers.clear();
      if (this.activeVideo) {
        this.activeVideo.pause();
        this.activeVideo.removeAttribute("src");
        this.activeVideo.load();
      }
      this.activeVideo = null;
      this.audio.volume = config.settings.musicVolume;
    }
    restartAutoplayFromCover() {
      if (this.transitioning)
        return;
      this.particleTourStop?.();
      this.clearPageClock();
      this.started = true;
      this.autoplay = true;
      this.currentIndex = 0;
      this.updateAutoplayUI();
      if (this.musicEnabled)
        void this.audio.play().catch(() => void 0);
      this.renderCurrent(false);
      this.setTimelineProgress(0);
      this.showToast("\u5DF2\u4ECE\u5C01\u9762\u91CD\u65B0\u5F00\u59CB\u81EA\u52A8\u64AD\u653E");
    }
    toggleAutoplay() {
      if (this.autoplay && this.started) {
        this.autoplay = false;
        this.particleTourStop?.();
        this.clearPageClock();
        this.activeVideo?.pause();
        this.updateAutoplayUI();
        this.showToast("\u81EA\u52A8\u64AD\u653E\u5DF2\u6682\u505C");
        return;
      }
      this.restartAutoplayFromCover();
    }
    updateAutoplayUI() {
      this.root.dataset.autoplay = String(this.autoplay);
      const experience = $(".experience", this.root);
      if (experience)
        experience.dataset.autoplay = String(this.autoplay);
      const button = $(".play-toggle", this.root);
      button.innerHTML = `<span>AUTO</span>${this.autoplay && this.started ? icon("pause") : icon("play")}`;
      button.setAttribute("aria-label", this.autoplay && this.started ? "\u6682\u505C\u81EA\u52A8\u64AD\u653E" : "\u4ECE\u5C01\u9762\u5F00\u59CB\u81EA\u52A8\u64AD\u653E");
      const status = $(".auto-status", this.root);
      status.textContent = this.autoplay ? "AUTO PLAY" : "MANUAL";
      $(".status-dot", this.root)?.classList.toggle("is-paused", !this.autoplay);
      this.syncPageMotion();
    }
    async toggleMusic(forceOn) {
      this.musicEnabled = forceOn ?? !this.musicEnabled;
      if (this.musicEnabled) {
        try {
          await this.audio.play();
        } catch {
          this.musicEnabled = false;
        }
      } else
        this.audio.pause();
      this.updateMusicButton();
      this.showToast(this.musicEnabled ? "\u80CC\u666F\u97F3\u4E50\u5DF2\u5F00\u542F" : "\u80CC\u666F\u97F3\u4E50\u5DF2\u5173\u95ED");
    }
    updateMusicButton() {
      const button = $(".music-toggle", this.root);
      button.classList.toggle("is-active", this.musicEnabled);
      button.innerHTML = this.musicEnabled ? icon("music") : icon("mute");
    }
    cycleSpeed() {
      const speeds = [0.75, 1, 1.25, 1.5];
      const current = speeds.indexOf(this.speed);
      this.speed = speeds[(current + 1) % speeds.length];
      $(".speed-button span", this.root).textContent = `${this.speed.toFixed(2).replace(/0$/, "")}\xD7`;
      this.showToast(`\u9875\u9762\u8282\u594F ${this.speed}\xD7`);
      if (this.autoplay && !config.pages[this.currentIndex].waitForVideoEnd)
        this.scheduleCurrent();
    }
    async toggleFullscreen() {
      if (!document.fullscreenElement)
        await this.root.requestFullscreen?.();
      else
        await document.exitFullscreen?.();
    }
    toggleRail(open) {
      this.root.classList.toggle("is-rail-open", open);
    }
    setTimelineProgress(progress) {
      const pageStart = this.currentIndex / config.pages.length;
      const pageShare = 1 / config.pages.length;
      const total = (pageStart + pageShare * progress) * 100;
      this.root.style.setProperty("--story-progress", `${total}%`);
    }
    setClockText(value) {
      const clock = $(".page-clock", this.root);
      if (clock)
        clock.textContent = value;
    }
    formatRemaining(ms) {
      const total = Math.ceil(ms / 1e3);
      return `00:${pad(total)}`;
    }
    showToast(message) {
      const toast = $(".toast", this.root);
      toast.textContent = message;
      toast.classList.remove("is-visible");
      void toast.offsetWidth;
      toast.classList.add("is-visible");
      window.setTimeout(() => toast.classList.remove("is-visible"), 1900);
    }
    hydrateCurrentImages() {
      const token = ++this.mediaLoadToken;
      const images = $$("img[data-deferred-src]", this.surface);
      const loadOne = (img) => {
        if (token !== this.mediaLoadToken || !img?.isConnected)
          return;
        const src = img.dataset.deferredSrc;
        if (!src)
          return;
        delete img.dataset.deferredSrc;
        img.classList.add("is-media-loading");
        img.addEventListener("load", () => {
          img.classList.remove("is-media-loading");
          img.classList.add("is-media-ready");
        }, { once: true });
        img.addEventListener("error", () => img.classList.add("is-media-error"), { once: true });
        img.src = src;
      };
      images.slice(0, 5).forEach(loadOne);
      const rest = images.slice(5);
      let cursor = 0;
      const pump = () => {
        if (token !== this.mediaLoadToken)
          return;
        rest.slice(cursor, cursor + 2).forEach(loadOne);
        cursor += 2;
        if (cursor < rest.length) {
          const timer = window.setTimeout(() => {
            this.mediaLoadTimers.delete(timer);
            pump();
          }, 85);
          this.mediaLoadTimers.add(timer);
        }
      };
      if (rest.length) {
        const timer = window.setTimeout(() => {
          this.mediaLoadTimers.delete(timer);
          pump();
        }, 70);
        this.mediaLoadTimers.add(timer);
      }
    }
    async loadImageBatch(sources, concurrency = 3) {
      const results = new Array(sources.length).fill(null);
      let cursor = 0;
      const worker = async () => {
        while (cursor < sources.length) {
          const index = cursor++;
          const src = sources[index];
          if (!src)
            continue;
          results[index] = await new Promise((resolve) => {
            const img = new Image();
            img.decoding = "async";
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = src;
          });
        }
      };
      await Promise.all(Array.from({ length: Math.min(concurrency, Math.max(1, sources.length)) }, () => worker()));
      return results;
    }
    preloadAround() {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection?.saveData)
        return;
      const indexes = [this.currentIndex + 1, this.currentIndex - 1, this.currentIndex + 2];
      const sources = [];
      indexes.forEach((index) => {
        const page = config.pages[index];
        if (!page)
          return;
        (page.media ?? []).filter((media) => media.type === "image" && media.src).slice(0, 4).forEach((media) => {
          if (!this.preloadedUrls.has(media.src)) {
            this.preloadedUrls.add(media.src);
            sources.push(media.src);
          }
        });
      });
      if (!sources.length)
        return;
      const schedule = window.requestIdleCallback ?? ((callback) => window.setTimeout(callback, 180));
      schedule(() => {
        sources.slice(0, 8).forEach((src, index) => {
          const timer = window.setTimeout(() => {
            this.mediaLoadTimers.delete(timer);
            const img = new Image();
            img.decoding = "async";
            img.fetchPriority = "low";
            img.src = src;
          }, index * 110);
          this.mediaLoadTimers.add(timer);
        });
      });
      if (this.preloadedUrls.size > 48)
        this.preloadedUrls = new Set(Array.from(this.preloadedUrls).slice(-32));
    }
  };

  // src/main.js
  var mount = document.getElementById("app");
  if (!mount) throw new Error("#app \u4E0D\u5B58\u5728");
  new StorybookPlayer(mount);
})();
