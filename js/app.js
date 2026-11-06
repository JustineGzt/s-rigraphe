/* ==========================================================================
   Atelier CréerSon — studio de personnalisation
   Les réglages (contact, tarifs, articles…) sont dans js/config.js
   ========================================================================== */
(() => {
  'use strict';

  const CFG = Object.assign({
    brand: 'Atelier CréerSon', email: '', phone: '', whatsapp: '', instagram: '', tiktok: '', facebook: '',
    formEndpoint: '', paymentLink: '', realisations: [], articles: {}, techniques: {}, tiers: [],
    creation: { offerteDes: 0, offres: [] },
  }, window.SITE_CONFIG || {});

  const COLORS = [
    { name: 'Blanc', hex: '#f4f3ef' },
    { name: 'Noir', hex: '#16161a' },
    { name: 'Gris chiné', hex: '#9b9da3' },
    { name: 'Marine', hex: '#1e2b4d' },
    { name: 'Rouge', hex: '#b5202d' },
    { name: 'Forêt', hex: '#25463b' },
    { name: 'Sable', hex: '#d9c8a7' },
    { name: 'Lilas', hex: '#b9a8dc' },
  ];

  const FONTS = [
    { label: 'Archivo Black', family: 'Archivo Black', css: '400' },
    { label: 'Bricolage', family: 'Bricolage Grotesque', css: '800' },
    { label: 'Bebas Neue', family: 'Bebas Neue', css: '400' },
    { label: 'Syne', family: 'Syne', css: '800' },
    { label: 'Playfair italique', family: 'Playfair Display', css: 'italic 700' },
    { label: 'Permanent Marker', family: 'Permanent Marker', css: '400' },
    { label: 'Pacifico', family: 'Pacifico', css: '400' },
    { label: 'Space Grotesk', family: 'Space Grotesk', css: '700' },
  ];

  const STYLES = ['Minimaliste', 'Streetwear', 'Vintage / rétro', 'Illustré', 'Typographique', 'Humour', 'Élégant', 'Coloré'];
  const PLACES = ['Cœur (petit)', 'Centre poitrine', 'Grand dos', 'Manche', 'Devant + dos'];

  const NS = 'http://www.w3.org/2000/svg';
  const XLINK = 'http://www.w3.org/1999/xlink';
  const CM_PER_UNIT = 30 / 160; // la zone d'impression d'un t-shirt (160 unités) ≈ 30 cm

  /* ------------------------------------------------------------------------
     Silhouettes (viewBox 400 × 460)
     ------------------------------------------------------------------------ */
  const NECKS = {
    round: { front: 'C168,72 232,72 250,30', back: 'C170,46 230,46 250,30', inner: 'M150,30 C170,42 230,42 250,30 C232,72 168,72 150,30 Z' },
    hood: { front: 'C176,96 224,96 250,30', back: 'C170,46 230,46 250,30', inner: 'M150,30 C170,42 230,42 250,30 C224,96 176,96 150,30 Z' },
  };
  const seam = (...ds) => ds.map((d) => `<path d="${d}"/>`).join('');
  const hem = (d) => `<path d="${d}" stroke-dasharray="3 3"/>`;
  const T_PRINT = { x: 120, y: 96, w: 160, h: 220 };

  const SHAPES = {
    classique: {
      neck: 'round', print: T_PRINT, sleeve: { x: 338, y: 96, w: 30, h: 38 },
      rest: 'L330,52 Q350,60 362,80 L398,142 L346,176 L322,148 L324,438 Q200,452 76,438 L78,148 L54,176 L2,142 L38,80 Q50,60 70,52 Z',
      seams: seam('M78,148 Q66,100 70,52', 'M322,148 Q334,100 330,52', 'M10,131 L62,165', 'M390,131 L338,165') + hem('M78,426 Q200,440 322,426'),
    },
    oversize: {
      neck: 'round', print: { x: 115, y: 100, w: 170, h: 225 },
      rest: 'L336,50 Q358,58 370,84 L398,166 L342,188 L330,160 L332,440 Q200,454 68,440 L70,160 L58,188 L2,166 L30,84 Q42,58 64,50 Z',
      seams: seam('M70,160 Q58,110 64,50', 'M330,160 Q342,110 336,50', 'M8,152 L60,180', 'M392,152 L340,180') + hem('M70,428 Q200,442 330,428'),
    },
    heritage: {
      neck: 'round', print: { x: 118, y: 96, w: 164, h: 225 }, sleeve: { x: 346, y: 120, w: 34, h: 48 },
      rest: 'L340,46 Q362,54 372,74 L400,190 L346,204 L334,176 L336,440 Q200,450 64,440 L66,176 L54,204 L0,190 L28,74 Q38,54 60,46 Z',
      seams: seam('M66,176 Q60,110 58,48', 'M334,176 Q340,110 342,48', 'M3,178 L57,192', 'M397,178 L343,192') + hem('M66,428 Q200,440 334,428'),
    },
    cintre: {
      neck: 'round', print: { x: 125, y: 96, w: 150, h: 210 },
      rest: 'L326,52 Q346,60 358,80 L392,140 L342,172 L318,148 Q300,290 314,438 Q200,450 86,438 Q100,290 82,148 L58,172 L8,140 L42,80 Q54,60 74,52 Z',
      seams: seam('M82,148 Q70,100 74,52', 'M318,148 Q330,100 326,52', 'M15,128 L64,162', 'M385,128 L336,162') + hem('M88,426 Q200,438 312,426'),
    },
    longues: {
      neck: 'round', print: T_PRINT, sleeve: { x: 336, y: 96, w: 26, h: 40 }, cuff: { x: 350, y: 348, w: 34, h: 32 },
      longSleeve: { x: 346, y: 180, w: 22, h: 160 },
      rest: 'L330,52 Q350,60 362,80 L392,404 L352,410 L324,176 L324,438 Q200,452 76,438 L76,176 L48,410 L8,404 L38,80 Q50,60 70,52 Z',
      seams: seam('M76,176 Q66,110 70,52', 'M324,176 Q334,110 330,52', 'M11,384 L50,390', 'M389,384 L350,390') + hem('M78,426 Q200,440 322,426'),
    },
    hoodie: {
      neck: 'hood', print: { x: 125, y: 132, w: 150, h: 175 },
      // la capuche couvre le haut du dos et l'encolure : zones décalées
      backPrint: { x: 120, y: 140, w: 160, h: 220 }, label: { side: 'front', x: 184, y: 44, w: 32, h: 22 },
      chestY: 132, cuff: { x: 350, y: 340, w: 34, h: 32 }, longSleeve: { x: 350, y: 180, w: 24, h: 180 },
      rest: 'L334,52 Q354,60 366,82 L394,400 L350,408 L328,178 L330,438 Q200,452 70,438 L72,178 L50,408 L6,400 L34,82 Q46,60 66,52 Z',
      seams: seam('M72,178 Q62,112 66,52', 'M328,178 Q338,112 334,52', 'M9,380 L52,388', 'M391,380 L348,388') + hem('M70,414 Q200,428 330,414'),
      frontSeams: seam('M130,320 L270,320 L294,404 Q200,414 106,404 Z'),
      under: {
        front: '<path class="js-fill" d="M140,44 C128,2 272,2 260,44 Z"/><path d="M140,44 C128,2 272,2 260,44 Z" fill="#000" opacity=".2"/>',
        back: '',
      },
      over: {
        front: '<g fill="none" stroke="#000" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"><path d="M183,82 Q181,102 184,124"/><path d="M217,82 Q219,102 216,124"/></g>',
        back: '<path class="js-fill" d="M146,30 C148,2 252,2 254,30 C258,92 232,124 200,128 C168,124 142,92 146,30 Z"/>'
          + '<path d="M146,30 C148,2 252,2 254,30 C258,92 232,124 200,128 C168,124 142,92 146,30 Z" fill="#000" fill-opacity=".06" stroke="#000" stroke-opacity=".25" stroke-width="1.5"/>'
          + '<path d="M200,8 L200,126" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="1.3"/>',
      },
    },
    tote: {
      tote: true, print: { x: 100, y: 172, w: 200, h: 230 },
      body: 'M58,118 L342,118 L352,442 L48,442 Z',
      seams: seam('M56,146 L344,146') + hem('M52,428 L348,428'),
      under: '<path class="js-stroke" d="M120,122 C120,16 280,16 280,122" fill="none" stroke-width="16" stroke-linecap="round"/>'
        + '<path d="M120,122 C120,16 280,16 280,122" fill="none" stroke="#000" stroke-opacity=".14" stroke-width="16" stroke-linecap="round"/>',
    },
    // tote rectangulaire à longues anses (Westford Mill W101)
    toteLong: {
      tote: true, print: { x: 110, y: 214, w: 180, h: 200 },
      body: 'M74,184 L326,184 L328,448 L72,448 Z',
      seams: seam('M74,198 L326,198') + hem('M73,436 L327,436'),
      under: '<path class="js-stroke" d="M130,188 L130,26 L270,26 L270,188" fill="none" stroke-width="18" stroke-linejoin="round"/>'
        + '<path d="M130,188 L130,26 L270,26 L270,188" fill="none" stroke="#000" stroke-opacity=".14" stroke-width="18" stroke-linejoin="round"/>',
    },
    // tote à soufflet, coins du bas coupés (Econscious EC8000)
    toteEco: {
      tote: true, print: { x: 112, y: 200, w: 176, h: 170 },
      body: 'M60,172 L340,172 L342,384 L296,440 L104,440 L58,384 Z',
      seams: seam('M60,186 L340,186', 'M126,172 L126,186', 'M274,172 L274,186') + hem('M66,380 L334,380'),
      under: '<path class="js-stroke" d="M136,176 L136,48 Q136,34 150,34 L250,34 Q264,34 264,48 L264,176" fill="none" stroke-width="20" stroke-linejoin="round"/>'
        + '<path d="M136,176 L136,48 Q136,34 150,34 L250,34 Q264,34 264,48 L264,176" fill="none" stroke="#000" stroke-opacity=".14" stroke-width="20" stroke-linejoin="round"/>',
    },
  };

  function getShape(article, fit, side) {
    const key = article === 'tote' ? 'tote' : article === 'hoodie' ? 'hoodie' : (SHAPES[fit] ? fit : 'classique');
    const s = SHAPES[key];
    if (s.tote) return { tote: true, body: s.body, neck: '', inner: '', under: s.under, over: '', seams: s.seams, print: s.print, backPrint: s.print };
    const n = NECKS[s.neck];
    return {
      body: `M150,30 ${n[side]} ${s.rest}`,
      neck: `M150,30 ${n[side]}`,
      inner: side === 'front' ? n.inner : '',
      under: s.under ? s.under[side] : '',
      over: s.over ? s.over[side] : '',
      seams: s.seams + (side === 'front' && s.frontSeams ? s.frontSeams : ''),
      print: s.print,
      sleeve: s.sleeve,
      cuff: s.cuff,
      longSleeve: s.longSleeve,
      backPrint: s.backPrint,
      label: s.label,
      chestY: s.chestY,
    };
  }

  /* Emplacements : la broderie (devant + manches, sur les modèles prévus) et l'impression des articles
     qui listent leurs `emplacements`. Manche gauche = gauche de la personne qui le porte. */
  const EMB = CFG.techniques.broderie;
  const EZ = (EMB?.maxCm || 12) / CM_PER_UNIT; // côté max d'une broderie poitrine, en unités SVG
  const DEFAULT_SLEEVE = { x: 346, y: 120, w: 34, h: 48 };
  const mirror = (z) => ({ ...z, x: 400 - z.x - z.w });

  const DEFAULT_EMB = ['poitrine', 'coeur', 'manche-g', 'manche-d'];
  const embZonesFor = (shape) => {
    const sl = shape.sleeve || DEFAULT_SLEEVE, cuff = shape.cuff, y = shape.chestY || 88;
    const p = shape.print, bag = { x: p.x + p.w / 2 - EZ / 2, y: p.y + 30, w: EZ, h: EZ };
    return {
      'sac-avant': { side: 'front', label: 'Avant', ...bag },
      'sac-arriere': { side: 'back', label: 'Arrière', ...bag },
      poitrine: { side: 'front', label: 'Centre poitrine', x: 200 - EZ / 2, y, w: EZ, h: EZ },
      coeur: { side: 'front', label: 'Poitrine gauche', x: 238, y: y + 12, w: EZ * 0.75, h: EZ * 0.75 },
      'manche-g': { side: 'front', label: 'Manche gauche', ...sl },
      'manche-d': { side: 'front', label: 'Manche droite', ...mirror(sl) },
      ...(cuff && {
        'poignet-g': { side: 'front', label: 'Poignet gauche', ...cuff },
        'poignet-d': { side: 'front', label: 'Poignet droit', ...mirror(cuff) },
      }),
    };
  };

  const printZonesFor = (shape) => {
    const sl = shape.sleeve || DEFAULT_SLEEVE, ls = shape.longSleeve;
    return {
      avant: { side: 'front', label: 'Imprimé avant', ...shape.print },
      'grand-avant': { side: 'front', label: 'Grande impression avant', x: 104, y: 92, w: 192, h: 270 },
      arriere: { side: 'back', label: 'Imprimé arrière', ...(shape.backPrint || { x: 120, y: 70, w: 160, h: 220 }) },
      'grand-arriere': { side: 'back', label: 'Grand format au dos', x: 104, y: 64, w: 192, h: 300 },
      etiquette: { side: 'back', label: 'Étiquette intérieure', x: 176, y: 48, w: 48, h: 30, ...shape.label },
      'manche-g': { side: 'front', label: 'Manche courte gauche', ...sl },
      'manche-d': { side: 'front', label: 'Manche courte droite', ...mirror(sl) },
      ...(ls && {
        'manche-longue-d': { side: 'front', label: 'Manche longue droite', ...mirror(ls) },
        'manche-longue-g': { side: 'front', label: 'Manche longue gauche', ...ls },
      }),
    };
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = () => Math.random().toString(36).slice(2, 9);
  const fmt = (n) => n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
  const isDark = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return (0.299 * r + 0.587 * g + 0.114 * b) < 140;
  };

  /* ------------------------------------------------------------------------
     État
     ------------------------------------------------------------------------ */
  const firstKey = (o) => Object.keys(o || {})[0];
  const state = {
    color: COLORS[0],
    side: 'front',
    layers: [],
    selected: null,
    mode: 'product',
    styles: new Set(),
    places: new Set(),
    inspo: [],
    creation: (CFG.creation.offres.find((o) => o.defaut) || CFG.creation.offres[0])?.id,
    article: firstKey(CFG.articles),
    fit: null,
    material: null,
    tech: firstKey(CFG.techniques),
    sizes: {},
    textColorTouched: false,
    zone: 'poitrine',
  };
  const art = () => CFG.articles[state.article];
  state.fit = firstKey(art().fits);
  state.material = art().materials[0].id;

  const isEmb = () => state.tech === 'broderie' && !!EMB;
  const palette = () => (art().colors?.length ? art().colors : isEmb() && EMB.colors?.length ? EMB.colors : COLORS);

  // emplacements du mode en cours, ou null quand chaque face a une seule zone libre
  function zonesNow() {
    const shape = getShape(state.article, state.fit, 'front');
    const ids = isEmb() ? art().emplacementsBroderie || DEFAULT_EMB : art().emplacements;
    if (!ids?.length) return null;
    const all = isEmb() ? embZonesFor(shape) : printZonesFor(shape);
    const zones = Object.fromEntries(ids.filter((id) => all[id]).map((id) => [id, all[id]]));
    Object.entries(zones).forEach(([id, z]) => (z.id = id));
    return zones;
  }

  let PRINT = getShape(state.article, state.fit, 'front').print;
  let ZONES = zonesNow();
  const zoneList = () => Object.values(ZONES || {});
  const firstZoneOn = (side) => zoneList().find((z) => z.side === side);
  const activeZone = () => {
    if (!ZONES) return '';
    const l = current();
    return l && l.side === state.side ? l.zone : state.zone;
  };
  const currentZones = (side = state.side) => (ZONES ? zoneList().filter((z) => z.side === side) : [PRINT]);
  const zoneFor = (l) => (ZONES ? ZONES[l.zone] || zoneList()[0] : PRINT);
  const maxWidth = (l) => {
    if (!ZONES) return 320;
    const z = zoneFor(l);
    return Math.min(z.w, z.h / l.aspect);
  };

  // chaque élément (et l'emplacement choisi) reste sur un emplacement valable pour le mode en cours
  function normalizeZones() {
    if (!ZONES) return;
    // un élément sans emplacement valable va sur un emplacement libre (même face d'abord) plutôt que de s'empiler
    const taken = new Set(state.layers.filter((l) => ZONES[l.zone]).map((l) => l.zone));
    state.layers.forEach((l) => {
      if (!ZONES[l.zone]) {
        const free = zoneList().filter((z) => !taken.has(z.id));
        const z = free.find((x) => x.side === l.side) || free[0] || firstZoneOn(l.side) || zoneList()[0];
        l.zone = z.id;
        l.x = z.x + z.w / 2; l.y = z.y + z.h / 2;
        taken.add(z.id);
      }
      l.side = ZONES[l.zone].side;
    });
    if (ZONES[state.zone]?.side !== state.side) state.zone = (firstZoneOn(state.side) || zoneList()[0]).id;
  }

  // garde l'élément dans sa zone (avec emplacements : entièrement dedans, taille comprise)
  function clampLayer(l) {
    const z = zoneFor(l);
    l.w = clamp(l.w, 8, maxWidth(l));
    l.h = l.w * l.aspect;
    if (ZONES) {
      l.x = clamp(l.x, z.x + l.w / 2, z.x + z.w - l.w / 2);
      l.y = clamp(l.y, z.y + l.h / 2, z.y + z.h - l.h / 2);
    } else {
      l.x = clamp(l.x, z.x, z.x + z.w);
      l.y = clamp(l.y, z.y, z.y + z.h);
    }
  }

  /* ------------------------------------------------------------------------
     Vêtement SVG
     ------------------------------------------------------------------------ */
  const tint = (markup, color) => markup
    .replace(/class="js-fill"/g, `class="js-fill" style="fill:${color}"`)
    .replace(/class="js-stroke"/g, `class="js-stroke" style="stroke:${color}"`);

  const zoneRects = (zones, cls = '') => zones.map((z) =>
    `<rect${cls ? ` class="${cls}"` : ''} data-z="${z.id || ''}" x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" rx="3"/>`).join('');

  function shirtMarkup(p, color, shape, design = '', zones = [shape.print]) {
    return `
<svg class="shirt-svg" viewBox="0 0 400 460" xmlns="${NS}" xmlns:xlink="${XLINK}">
  <defs>
    <clipPath id="${p}-clip"><path class="js-body-d" d="${shape.body}"/></clipPath>
    <clipPath id="${p}-print" class="js-printclip">${zoneRects(zones)}</clipPath>
    <linearGradient id="${p}-shade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#000" stop-opacity=".28"/>
      <stop offset=".2" stop-color="#000" stop-opacity=".05"/>
      <stop offset=".42" stop-color="#fff" stop-opacity=".10"/>
      <stop offset=".7" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity=".30"/>
    </linearGradient>
    <linearGradient id="${p}-vshade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".10"/>
      <stop offset=".35" stop-color="#fff" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity=".2"/>
    </linearGradient>
    <linearGradient id="${p}-art" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ff4d1f"/><stop offset="1" stop-color="#2f3bff"/>
    </linearGradient>
    <filter id="${p}-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="${p}-noise" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
  </defs>
  <g class="js-shirt">
    <g class="js-under">${tint(shape.under, color)}</g>
    <path class="js-inner js-fill" d="${shape.inner}" style="fill:${color}"/>
    <path class="js-inner" d="${shape.inner}" fill="#000" opacity=".38"/>
    <path class="js-body-d js-fill" d="${shape.body}" style="fill:${color}"/>
    <g class="js-design" clip-path="url(#${p}-print)">${design}</g>
    <g clip-path="url(#${p}-clip)" pointer-events="none">
      <rect width="400" height="460" fill="url(#${p}-shade)"/>
      <rect width="400" height="460" fill="url(#${p}-vshade)"/>
      <g filter="url(#${p}-blur)" fill="none" stroke-linecap="round">
        <path d="M108,190 Q140,262 116,362" stroke="#000" stroke-opacity=".14" stroke-width="10"/>
        <path d="M292,180 Q262,272 288,382" stroke="#000" stroke-opacity=".12" stroke-width="10"/>
        <path d="M150,330 Q200,356 256,326" stroke="#fff" stroke-opacity=".09" stroke-width="12"/>
        <path d="M80,152 Q120,142 142,118" stroke="#000" stroke-opacity=".18" stroke-width="10"/>
        <path d="M320,152 Q280,142 258,118" stroke="#000" stroke-opacity=".18" stroke-width="10"/>
      </g>
      <rect width="400" height="460" filter="url(#${p}-noise)" opacity=".07"/>
      <g class="js-seams" fill="none" stroke="#000" stroke-opacity=".22" stroke-width="1.3">${shape.seams}</g>
    </g>
    <path class="js-neck js-stroke" d="${shape.neck}" fill="none" stroke-width="7" stroke-linecap="round" style="stroke:${color}"/>
    <path class="js-neck" d="${shape.neck}" fill="none" stroke="#000" stroke-opacity=".22" stroke-width="7" stroke-linecap="round"/>
    <g class="js-over" pointer-events="none">${tint(shape.over, color)}</g>
  </g>
  <g class="js-zones">${zoneRects(zones, 'js-zone')}</g>
  <g class="js-sel"></g>
</svg>`;
  }

  function setShirtColor(svg, hex) {
    $$('.js-fill', svg).forEach((el) => (el.style.fill = hex));
    $$('.js-stroke', svg).forEach((el) => (el.style.stroke = hex));
  }
  function setShape(svg, shape, color, zones = [shape.print]) {
    $$('.js-body-d', svg).forEach((el) => el.setAttribute('d', shape.body));
    $$('.js-neck', svg).forEach((el) => el.setAttribute('d', shape.neck));
    $$('.js-inner', svg).forEach((el) => el.setAttribute('d', shape.inner));
    $('.js-under', svg).innerHTML = tint(shape.under, color);
    $('.js-over', svg).innerHTML = tint(shape.over, color);
    $('.js-seams', svg).innerHTML = shape.seams;
    $('.js-printclip', svg).innerHTML = zoneRects(zones);
    $('.js-zones', svg).innerHTML = zoneRects(zones, 'js-zone');
    setShirtColor(svg, color);
  }

  // forme + zones du studio pour une face donnée
  const applyStage = (target, side) => setShape(target, getShape(state.article, state.fit, side), state.color.hex, currentZones(side));

  /* ------------------------------------------------------------------------
     Hero : t-shirt qui change de couleur
     ------------------------------------------------------------------------ */
  function initHero() {
    const host = $('#heroShirt');
    const design = `
      <g transform="translate(200 188)">
        <path id="h-circ" d="M0,-56 a56,56 0 1,1 -0.1,0" fill="none"/>
        <g>
          <text font-family="DM Mono, monospace" font-weight="500" font-size="10.5" letter-spacing="2.6" fill="url(#h-art)">
            <textPath href="#h-circ" xlink:href="#h-circ">TON LOGO ICI ✺ TON IDÉE ICI ✺ TON STYLE ✺</textPath>
          </text>
          ${reduced ? '' : '<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="24s" repeatCount="indefinite"/>'}
        </g>
        <path d="M0,-30 C4,-7 7,-4 30,0 C7,4 4,7 0,30 C-4,7 -7,4 -30,0 C-7,-4 -4,-7 0,-30Z" fill="url(#h-art)"/>
      </g>`;
    host.innerHTML = shirtMarkup('h', COLORS[0].hex, getShape('tshirt', 'classique', 'front'), design);
    const svg = $('svg', host);
    $('.js-zone', svg).remove();
    const dot = $('#heroColorDot');
    const name = $('#heroColorName');
    const tag = name.parentElement;
    $$('.js-fill, .js-stroke', svg).forEach((el) => (el.style.transition = 'fill .7s ease, stroke .7s ease'));

    let ci = 0;
    const apply = () => {
      const c = COLORS[ci];
      setShirtColor(svg, c.hex);
      dot.style.background = c.hex;
      name.textContent = c.name;
      tag.classList.remove('pop'); void tag.offsetWidth; tag.classList.add('pop');
    };
    apply();
    let paused = false;
    $('#heroVisual').addEventListener('mouseenter', () => (paused = true));
    $('#heroVisual').addEventListener('mouseleave', () => (paused = false));
    if (!reduced) setInterval(() => { if (!paused && !document.hidden) { ci = (ci + 1) % COLORS.length; apply(); } }, 2400);
  }

  /* ------------------------------------------------------------------------
     Techniques, réalisations, inspirations
     ------------------------------------------------------------------------ */
  function initTechShowcase() {
    $('#techShowcase').innerHTML = Object.entries(CFG.techniques).map(([id, t]) => `
      <article class="tech-card card reveal">
        <div class="sample sw-${id}"></div>
        <div class="body">
          <h3>${esc(t.name)}</h3>
          <p>${esc(t.desc)}</p>
          <ul>
            <li>${fmt(t.perFace)} par face et par pièce</li>
            <li>${t.setup ? `${fmt(t.setup)} de mise en route / face` : 'Sans frais de mise en route'}</li>
            ${t.maxCm ? `<li>Jusqu'à ${t.maxCm} cm de large</li>` : ''}
          </ul>
        </div>
      </article>`).join('');
  }

  function initRealisations() {
    const items = CFG.realisations || [];
    if (!items.length) return;
    $('#realisations').hidden = false;
    $('#realGrid').innerHTML = items.map((r) => `
      <figure class="real card reveal">
        <img src="${esc(r.src)}" alt="${esc(r.title || '')}" loading="lazy">
        <figcaption><b>${esc(r.title || '')}</b><span>${esc(r.tags || '')}</span></figcaption>
      </figure>`).join('');
  }

  function initGallery() {
    const looks = [
      {
        title: 'Midnight Crew', desc: 'Streetwear · typographie', color: 1, side: 'front',
        art: `<g font-family="Archivo Black, sans-serif" text-anchor="middle">
          <text x="200" y="168" font-size="22" fill="#f3efe6">MIDNIGHT</text>
          <text x="200" y="194" font-size="22" fill="none" stroke="#ffd43b" stroke-width="1">MIDNIGHT</text>
          <text x="200" y="220" font-size="22" fill="none" stroke="#ffd43b" stroke-width="1" opacity=".45">MIDNIGHT</text>
          <text x="200" y="244" font-size="10" letter-spacing="6" font-family="DM Mono, monospace" fill="#f3efe6">CREW — PARIS</text></g>`,
      },
      {
        title: 'Café Lune', desc: 'Logo d\'entreprise · cœur', color: 6, side: 'front',
        art: `<g transform="translate(250 140)">
          <circle r="25" fill="none" stroke="#3b2a1e" stroke-width="2.5"/>
          <circle r="19" fill="#3b2a1e"/>
          <path d="M-8,-7 h14 v7 a7,7 0 0 1 -14,0 z M6,-4 h3 a3,3 0 0 1 0,6 h-3" fill="none" stroke="#d9c8a7" stroke-width="2"/>
          <path d="M-3,-14 q2,-3 0,-6 M2,-14 q2,-3 0,-6" fill="none" stroke="#d9c8a7" stroke-width="1.4" stroke-linecap="round"/>
          <text y="14" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="5.5" letter-spacing="1" fill="#d9c8a7">CAFÉ LUNE</text></g>`,
      },
      {
        title: 'Team Claire', desc: 'EVJF · texte manuscrit', color: 0, side: 'front',
        art: `<g text-anchor="middle">
          <text x="200" y="180" font-family="Pacifico, cursive" font-size="24" fill="#ff4d1f">Team Claire</text>
          <text x="200" y="210" font-family="DM Mono, monospace" font-weight="500" font-size="11" letter-spacing="5" fill="#1e2b4d">EVJF · 06.2027</text>
          <text x="200" y="245" font-size="18" fill="#ff4d1f">✿ ✿ ✿</text></g>`,
      },
      {
        title: 'Run Club 42', desc: 'Club de sport · dos', color: 3, side: 'back',
        art: `<g text-anchor="middle" font-family="Archivo Black, sans-serif">
          <text x="200" y="140" font-size="24" letter-spacing="2" fill="#f3efe6">MARTIN</text>
          <text x="200" y="262" font-size="118" fill="#ffd43b">42</text>
          <text x="200" y="292" font-family="DM Mono, monospace" font-weight="500" font-size="11" letter-spacing="6" fill="#f3efe6">RUN CLUB</text></g>`,
      },
    ];
    const g = $('#gallery');
    g.innerHTML = looks.map((l, i) => `
      <button class="look card reveal" data-color="${l.color}" type="button" aria-label="Partir du modèle ${esc(l.title)}">
        <div class="look-shirt">${shirtMarkup('g' + i, COLORS[l.color].hex, getShape('tshirt', 'classique', l.side), l.art)}</div>
        <h3>${esc(l.title)}</h3><p>${esc(l.desc)}</p>
        <span class="use">Utiliser cette couleur →</span>
      </button>`).join('');
    $$('.js-zone', g).forEach((z) => z.remove());
    $$('.look', g).forEach((b) => b.addEventListener('click', () => {
      if (!palette().includes(COLORS[+b.dataset.color])) { toast(`Cette couleur n'existe pas sur le modèle ${articleName()}${isEmb() ? ' brodé' : ''}`); return; }
      setColor(COLORS[+b.dataset.color]);
      $('#studio').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      toast(`Couleur « ${COLORS[+b.dataset.color].name} » sélectionnée`);
    }));
  }

  /* ------------------------------------------------------------------------
     Studio
     ------------------------------------------------------------------------ */
  const stage = $('#stage');
  const stageShirt = $('#stageShirt');
  let svg; // SVG du studio

  const ICONS = {
    tshirt: '<svg viewBox="0 0 48 48"><path d="M8 14 18 8c2 4 10 4 12 0l10 6-4 8-4-2v20H16V20l-4 2z"/></svg>',
    longsleeve: '<svg viewBox="0 0 48 48"><path d="M8 14 18 8c2 4 10 4 12 0l10 6 3 26h-5l-2-18v20H16V22l-2 18H9z"/></svg>',
    hoodie: '<svg viewBox="0 0 48 48"><path d="M17 9c1-5 13-5 14 0l9 5 2 24h-5l-2-16v20H13V22l-2 16H6l2-24z"/><path d="M19 10c1 6 9 6 10 0M19 34h10"/></svg>',
    tote: '<svg viewBox="0 0 48 48"><path d="M9 18h30l-2 24H11z"/><path d="M17 18c0-11 14-11 14 0"/></svg>',
  };

  function initStudio() {
    stageShirt.innerHTML = shirtMarkup('s', state.color.hex, getShape(state.article, state.fit, 'front'));
    svg = $('svg', stageShirt);
    $$('.js-fill, .js-stroke', svg).forEach((el) => (el.style.transition = 'fill .5s ease, stroke .5s ease'));

    // couleurs
    renderSwatches();
    $('#swatches').addEventListener('click', (e) => {
      const b = e.target.closest('.swatch');
      if (b) setColor(palette()[+b.dataset.i]);
    });

    // devant / dos
    $('#sideSeg').addEventListener('click', (e) => {
      const b = e.target.closest('button[data-side]');
      if (b) switchSide(b.dataset.side);
    });

    // onglets article / logo / idée
    $('#modeTabs').addEventListener('click', (e) => {
      const b = e.target.closest('button[data-mode]');
      if (b) setMode(b.dataset.mode);
    });
    $$('a[data-mode]').forEach((a) => a.addEventListener('click', () => setMode(a.dataset.mode)));
    $$('[data-goto]').forEach((b) => b.addEventListener('click', () => setMode(b.dataset.goto)));
    $('#zoneTabs').addEventListener('click', (e) => { const b = e.target.closest('[data-z]'); if (b) setZone(b.dataset.z); });
    window.addEventListener('resize', () => { moveIndicator($('#sideSeg')); moveIndicator($('#modeTabs')); placeEmpty(); });

    // article, coupe, matière, technique
    initProduct();

    // polices
    $('#fontSelect').innerHTML = FONTS.map((f, i) => `<option value="${i}" style="font-family:'${f.family}'">${f.label}</option>`).join('');
    $('#textColor').addEventListener('input', (e) => { state.textColorTouched = true; paintTextColor(e.target.value); });
    paintTextColor($('#textColor').value);
    $('#addText').addEventListener('click', addText);
    $('#textInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); addText(); } });

    // fichiers
    $('#fileInput').addEventListener('change', (e) => { addFiles(e.target.files); e.target.value = ''; });
    setupDrop();
    document.addEventListener('paste', (e) => {
      const files = [...(e.clipboardData?.files || [])].filter((f) => f.type.startsWith('image/'));
      if (files.length) { setMode('logo'); addFiles(files); }
    });

    // outils de calque
    $('#sizeRange').addEventListener('input', (e) => { const l = current(); if (l) { setWidth(l, +e.target.value); updateLayerDom(l); } });
    $('#rotRange').addEventListener('input', (e) => { const l = current(); if (l) { l.rot = +e.target.value; updateLayerDom(l); } });
    $('#sizeRange').addEventListener('change', changed);
    $('#rotRange').addEventListener('change', changed);
    $('#deleteLayer').addEventListener('click', () => removeLayer(state.selected));
    $('#centerLayer').addEventListener('click', () => {
      const l = current(); if (!l) return;
      const z = zoneFor(l);
      l.x = z.x + z.w / 2;
      if (ZONES) l.y = z.y + z.h / 2;
      clampLayer(l); updateLayerDom(l); changed();
    });
    $('#dupLayer').addEventListener('click', () => {
      const l = current(); if (!l) return;
      const copy = { ...l, id: uid(), x: l.x + 14, y: l.y + 14, file: null };
      clampLayer(copy);
      addLayer(copy);
    });
    $('#moveSide').addEventListener('click', () => {
      const l = current(); if (!l || ZONES) return;
      l.side = l.side === 'front' ? 'back' : 'front';
      switchSide(l.side);
      changed();
    });
    $('#removeBg').addEventListener('click', toggleRemoveBg);
    $('#downloadMock').addEventListener('click', async () => {
      const c = await renderComposite();
      c.toBlob((b) => downloadBlob(b, 'maquette.png'), 'image/png');
    });

    // interactions directes sur le vêtement
    setupPointer();

    // mode idée
    chipGroup($('#styleChips'), STYLES, state.styles);
    chipGroup($('#placeChips'), PLACES, state.places, refresh);
    $('#inspoInput').addEventListener('change', (e) => { addInspo(e.target.files); e.target.value = ''; });
    $('#ideaText').addEventListener('input', () => { clearTimeout(ideaTimer); ideaTimer = setTimeout(refresh, 300); });
    initCreation();

    // clavier
    document.addEventListener('keydown', (e) => {
      if (!state.selected || /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName)) return;
      const l = current(); if (!l) return;
      const step = e.shiftKey ? 10 : 2;
      const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
      if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); removeLayer(l.id); }
      else if (moves[e.key]) {
        e.preventDefault();
        l.x += moves[e.key][0];
        l.y += moves[e.key][1];
        clampLayer(l);
        updateLayerDom(l);
      } else if (e.key === 'Escape') select(null);
    });

    renderDesign();
    renderZones();
    updateEmpty();
    setMode(state.mode);
    moveIndicator($('#sideSeg'));
  }
  let ideaTimer;

  function moveIndicator(group) {
    const active = $('button.active', group);
    const ind = $('.seg-ind, .tab-ind', group);
    if (!active || !ind) return;
    ind.style.width = `${active.offsetWidth}px`;
    ind.style.transform = `translateX(${active.offsetLeft - 3}px)`;
  }

  // offres de création du design (mode idée)
  function initCreation() {
    const box = $('#creationOpts');
    const { offres, offerteDes } = CFG.creation;
    const paint = () => {
      box.innerHTML = offres.map((o) => `
        <button type="button" class="mat-opt${o.id === state.creation ? ' active' : ''}" data-v="${o.id}" aria-pressed="${o.id === state.creation}">
          <span class="radio"></span>
          <span><b>${esc(o.name)}</b><small>${esc(o.desc)}</small></span>
          <span class="price">${creationPrice(o)}</span>
        </button>`).join('');
    };
    box.addEventListener('click', (e) => {
      const b = e.target.closest('[data-v]');
      if (!b) return;
      state.creation = b.dataset.v;
      paint();
      refresh();
    });
    const head = offerteDes ? `Offerte dès ${offerteDes} pièces. Sinon, réglée` : 'Réglée';
    $('#creationNote').textContent = `${head} après le devis, avant de commencer. 2 séries de retouches incluses.`;
    paint();
  }

  function setMode(mode) {
    state.mode = mode;
    $$('#modeTabs button').forEach((b) => b.classList.toggle('active', b.dataset.mode === mode));
    $$('.pane').forEach((p) => p.classList.toggle('active', p.dataset.pane === mode));
    moveIndicator($('#modeTabs'));
  }

  function setColor(c) {
    state.color = c;
    setShirtColor(svg, c.hex);
    $$('#swatches .swatch').forEach((s) => {
      const on = palette()[+s.dataset.i]?.hex === c.hex;
      s.classList.toggle('active', on);
      s.setAttribute('aria-checked', on);
    });
    $('#colorName').textContent = c.name;
    $('#stageEmpty').classList.toggle('dark', isDark(c.hex));
    syncTextColor();
    changed();
  }

  function paintTextColor(v) { $('.color-pick span').style.setProperty('--tc', v); }

  let flipping = false;
  async function switchSide(side) {
    if (side === state.side || flipping || (ZONES && !firstZoneOn(side))) return;
    $$('#sideSeg button').forEach((b) => {
      b.classList.toggle('active', b.dataset.side === side);
      b.setAttribute('aria-selected', b.dataset.side === side);
    });
    moveIndicator($('#sideSeg'));
    flipping = true;
    const dir = side === 'back' ? 1 : -1;
    if (!reduced && stageShirt.animate) {
      await stageShirt.animate([{ transform: 'rotateY(0deg)' }, { transform: `rotateY(${90 * dir}deg)` }], { duration: 220, easing: 'cubic-bezier(.5,0,.75,0)' }).finished;
    }
    state.side = side;
    if (ZONES && ZONES[state.zone]?.side !== side) state.zone = firstZoneOn(side).id;
    applyStage(svg, side);
    renderZones();
    renderDesign();
    if (!reduced && stageShirt.animate) {
      await stageShirt.animate([{ transform: `rotateY(${-90 * dir}deg)` }, { transform: 'rotateY(0deg)' }], { duration: 380, easing: 'cubic-bezier(.22,1,.36,1)' }).finished;
    }
    flipping = false;
    updateEmpty();
  }

  /* ----- article, coupe, matière, technique ----- */
  function initProduct() {
    $('#articleOpts').addEventListener('click', (e) => { const b = e.target.closest('.opt'); if (b) setArticle(b.dataset.v); });
    $('#fitOpts').addEventListener('click', (e) => { const b = e.target.closest('.opt'); if (b && !embLocked('fit', b.dataset.v)) { state.fit = b.dataset.v; applyShape(); } });
    $('#embZones').addEventListener('click', (e) => { const b = e.target.closest('.emb-zone'); if (b) setZone(b.dataset.z); });
    $('#materialOpts').addEventListener('click', (e) => { const b = e.target.closest('.mat-opt'); if (b) { state.material = b.dataset.v; renderProduct(); refresh(); } });
    $('#techOpts').addEventListener('click', (e) => { const b = e.target.closest('.opt'); if (b) setTech(b.dataset.v); });
    $('#techAdvice').addEventListener('click', (e) => { const b = e.target.closest('[data-tech]'); if (b) setTech(b.dataset.tech); });
    renderProduct();
  }

  const minPerFace = () => Math.min(...Object.values(CFG.techniques).map((t) => t.perFace));
  const priceTag = (p) => (p ? `+${fmt(p)}` : 'inclus');

  function renderProduct() {
    const a = art();
    $('#articleOpts').innerHTML = Object.entries(CFG.articles).map(([id, x]) => `
      <button type="button" class="opt${id === state.article ? ' active' : ''}" data-v="${id}" aria-pressed="${id === state.article}"${embLocked('article', id) ? ' disabled' : ''}>
        ${ICONS[id] || ICONS[firstKey(x.fits)] || (firstKey(x.fits).startsWith('tote') ? ICONS.tote : ICONS.tshirt)}<b>${esc(x.label)}</b><small>${embLocked('article', id) ? 'pas en broderie' : `${x.model ? `${esc(x.model)} · ` : ''}dès ${fmt(Math.min(...Object.keys(CFG.techniques).filter((t) => !x.techniques || x.techniques.includes(t)).map((t) => fromPrice(x, t))))}`}</small>
      </button>`).join('');
    const fits = Object.entries(a.fits);
    $('#fitField').hidden = fits.length < 2;
    $('#fitOpts').innerHTML = fits.map(([id, f]) => `
      <button type="button" class="opt${id === state.fit ? ' active' : ''}" data-v="${id}" aria-pressed="${id === state.fit}"${embLocked('fit', id) ? ' disabled' : ''}>
        <b>${esc(f.label)}</b><small>${embLocked('fit', id) ? 'pas en broderie' : priceTag(f.price)}</small>
      </button>`).join('');
    $('#materialOpts').innerHTML = a.materials.map((m) => `
      <button type="button" class="mat-opt${m.id === state.material ? ' active' : ''}" data-v="${m.id}" aria-pressed="${m.id === state.material}">
        <span class="radio"></span>
        <span><b>${esc(m.name)}</b><em>${esc(m.gsm)}</em><small>${esc(m.desc)}</small></span>
        <span class="price">${priceTag(m.price)}</span>
      </button>`).join('');
    $('#techOpts').innerHTML = Object.entries(CFG.techniques).map(([id, t]) => `
      <button type="button" class="opt tech-opt${id === state.tech ? ' active' : ''}" data-v="${id}" aria-pressed="${id === state.tech}"${techLocked(id) ? ' disabled' : ''}>
        <span class="tsw sw-${id}"></span><b>${esc(t.name)}</b><small>${techLocked(id) ? 'pas sur cet article' : a.cost ? `dès ${fmt(fromPrice(a, id))}` : `+${fmt(t.perFace)} / face${t.setup ? ` · ${fmt(t.setup)} mise en route` : ''}`}</small>
      </button>`).join('');
  }

  // en broderie, seuls les modèles (article + coupe éventuelle) prévus sont possibles
  const embAllowed = () => [].concat(EMB?.only || []);
  const embFits = (o, article) => !o.article || o.article === article;
  function embLocked(kind, id) {
    const ok = embAllowed();
    if (!isEmb() || !ok.length) return false;
    if (kind === 'article') return !ok.some((o) => embFits(o, id));
    return !ok.some((o) => embFits(o, state.article) && (!o.fit || o.fit === id));
  }

  const articleName = () => {
    const a = art();
    return Object.keys(a.fits).length > 1 ? `${a.label} ${a.fits[state.fit].label}` : a.label;
  };

  function setArticle(id) {
    if (!CFG.articles[id] || embLocked('article', id)) return;
    state.article = id;
    const a = art();
    if (!a.fits[state.fit]) state.fit = firstKey(a.fits);
    if (!a.materials.some((m) => m.id === state.material)) state.material = a.materials[0].id;
    // technique non proposée sur cet article : on passe à la première possible
    if (techLocked(state.tech)) {
      state.tech = a.techniques.find((t) => CFG.techniques[t]);
      toast(`${a.label} : ${CFG.techniques[state.tech].name} sélectionnée`);
    }
    renderSizes();
    applyShape();
  }

  // un article peut limiter ses techniques (`techniques: [...]` dans la config)
  const techLocked = (id) => !!art().techniques && !art().techniques.includes(id);

  function setTech(id) {
    if (!CFG.techniques[id] || id === state.tech || techLocked(id)) return;
    state.tech = id;
    if (isEmb()) enterEmbroidery();
    applyShape();
  }

  function applyShape() {
    PRINT = getShape(state.article, state.fit, state.side).print;
    ZONES = zonesNow();
    normalizeZones();
    // couleur indisponible sur ce modèle : on prend la teinte la plus proche
    if (!palette().some((c) => c.hex === state.color.hex)) {
      const rgb = (hex) => { const n = parseInt(hex.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
      const [r, g, b] = rgb(state.color.hex);
      const dist = (c) => { const [r2, g2, b2] = rgb(c.hex); return (r - r2) ** 2 + (g - g2) ** 2 + (b - b2) ** 2; };
      state.color = palette().reduce((best, c) => (dist(c) < dist(best) ? c : best));
    }
    applyStage(svg, state.side);
    state.layers.forEach(clampLayer);
    renderProduct();
    renderSwatches();
    renderZones();
    renderDesign();
    changed();
  }

  /* ----- broderie : modèle, coloris et emplacements imposés ----- */
  function enterEmbroidery() {
    const ok = embAllowed();
    const match = ok.find((o) => embFits(o, state.article) && (!o.fit || o.fit === state.fit))
      || ok.find((o) => embFits(o, state.article)) || ok[0];
    const before = articleName();
    if (match) {
      const articleChanged = match.article && state.article !== match.article;
      if (articleChanged) state.article = match.article;
      if (match.fit && art().fits[match.fit]) state.fit = match.fit;
      else if (!art().fits[state.fit]) state.fit = firstKey(art().fits);
      if (!art().materials.some((m) => m.id === state.material)) state.material = art().materials[0].id;
      if (articleChanged) renderSizes();
    }
    // pas de broderie au dos : applyShape ramène tout devant, sur un emplacement autorisé
    const embAll = embZonesFor(getShape(state.article, state.fit, 'front'));
    const backOk = (art().emplacementsBroderie || DEFAULT_EMB).some((z) => embAll[z]?.side === 'back');
    const moved = backOk ? 0 : state.layers.filter((l) => l.side === 'back').length;
    if (state.side === 'back' && !backOk) {
      state.side = 'front';
      $$('#sideSeg button').forEach((b) => { b.classList.toggle('active', b.dataset.side === 'front'); b.setAttribute('aria-selected', b.dataset.side === 'front'); });
      moveIndicator($('#sideSeg'));
    }
    const msgs = [];
    if (articleName() !== before) msgs.push(`${articleName()} sélectionné`);
    if (moved) msgs.push('les éléments du dos sont passés devant');
    if (msgs.length) toast(`Broderie : ${msgs.join(' · ')}`);
  }

  function renderSwatches() {
    const list = palette();
    $('#swatches').innerHTML = list.map((c, i) => {
      const on = c.hex === state.color.hex;
      return `<button class="swatch${on ? ' active' : ''}${c.hex2 ? ' duo' : ''}" style="--c:${c.hex}${c.hex2 ? `;--c2:${c.hex2}` : ''}" role="radio" aria-checked="${on}" aria-label="${esc(c.name)}" title="${esc(c.name)}" data-i="${i}"></button>`;
    }).join('');
    setShirtColor(svg, state.color.hex);
    $('#colorName').textContent = state.color.name;
    $('#stageEmpty').classList.toggle('dark', isDark(state.color.hex));
    syncTextColor();
  }

  // texte clair sur vêtement foncé (tant que le client n'a pas choisi lui-même)
  function syncTextColor() {
    if (state.textColorTouched) return;
    const tc = isDark(state.color.hex) ? '#f4f3ef' : '#111111';
    $('#textColor').value = tc;
    paintTextColor(tc);
  }

  const ZONE_ICON = (z, vh) => `<svg viewBox="0 0 400 ${vh}" aria-hidden="true">
    <path d="${getShape(state.article, state.fit, z.side).body}"/>
    <rect x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" rx="4"/></svg>`;

  const cmSize = (z) => `${Math.round(z.w * CM_PER_UNIT)} × ${Math.round(z.h * CM_PER_UNIT)} cm`;

  function renderZones() {
    const zones = zoneList();
    const noBack = !!ZONES && !firstZoneOn('back');
    const back = $('#sideSeg button[data-side="back"]');
    back.disabled = noBack;
    back.title = noBack ? 'Pas de broderie au dos' : '';
    $('#embField').hidden = !ZONES;
    $('#zoneTabs').hidden = !ZONES;
    $('#moveSide').hidden = !!ZONES;
    stage.classList.toggle('zoned', !!ZONES);
    if (!ZONES) { highlightZone(); return; }
    const active = activeZone();
    const used = new Set(state.layers.map((l) => l.zone));
    const vh = Math.max(300, ...zones.map((z) => z.y + z.h + 24));
    $('#embLabel').textContent = isEmb() ? 'Emplacement de la broderie' : "Emplacement de l'impression";
    $('#embNote').textContent = isEmb()
      ? `Choisis l'emplacement avant d'ajouter ton logo, ou clique dessus pour y déplacer l'élément sélectionné. Chaque emplacement brodé compte comme une face.${noBack ? ' Pas de broderie au dos.' : ''}`
      : "Choisis l'emplacement avant d'ajouter ton visuel. Chaque emplacement imprimé compte comme une face.";
    $('#embZones').innerHTML = zones.map((z) => `
      <button type="button" class="emb-zone${z.id === active ? ' active' : ''}" data-z="${z.id}" aria-pressed="${z.id === active}">
        ${ZONE_ICON(z, vh)}<b>${esc(z.label)}</b><small>${cmSize(z)} max</small>
      </button>`).join('');
    $('#zoneTabs').innerHTML = zones.map((z) => `
      <button type="button" class="zone-tab${z.id === active ? ' active' : ''}" data-z="${z.id}" aria-pressed="${z.id === active}">
        ${esc(z.label)}${used.has(z.id) ? '<i class="zone-dot" aria-label="(utilisé)"></i>' : ''}
      </button>`).join('');
    const tabs = $('#zoneTabs'), tab = $('.active', tabs);
    if (tab) tabs.scrollLeft = tab.offsetLeft - (tabs.offsetWidth - tab.offsetWidth) / 2;
    $('#stageEmpty b').textContent = 'Dépose ton design ici';
    $('#stageEmpty span').textContent = `${ZONES[active].label} · ${cmSize(ZONES[active])}`;
    highlightZone();
  }

  function highlightZone() {
    const active = activeZone();
    $$('.js-zone', svg).forEach((r) => r.classList.toggle('on', r.dataset.z === active));
    placeEmpty();
    updateEmpty();
  }

  // l'invitation à déposer un fichier se place au centre de l'emplacement choisi
  function placeEmpty() {
    const box = $('#stageEmpty');
    const z = ZONES?.[activeZone()];
    if (!z) {
      box.style.left = box.style.top = '';
      if (!ZONES) { $('b', box).textContent = 'Glisse ton logo ici'; $('span', box).textContent = 'ou ajoute-le avec les outils du studio'; }
      return;
    }
    const k = stageShirt.offsetWidth / 400;
    box.style.left = `${stageShirt.offsetLeft + (z.x + z.w / 2) * k}px`;
    box.style.top = `${stageShirt.offsetTop + (z.y + z.h / 2) * k}px`;
  }

  function setZone(id) {
    const z = ZONES?.[id];
    if (!z) return;
    state.zone = id;
    const l = current();
    if (l && l.zone !== id) {
      if (isEmb()) {
        // broderie : l'élément sélectionné suit l'emplacement choisi
        l.zone = id;
        l.x = z.x + z.w / 2; l.y = z.y + z.h / 2;
        clampLayer(l);
        updateLayerDom(l);
        changed();
      } else select(null);
    }
    if (z.side !== state.side) switchSide(z.side);
    renderZones();
  }

  /* ----- prix ----- */
  const totalQty = () => Object.values(state.sizes).reduce((a, b) => a + b, 0);

  const usedZones = () => [...new Set(state.layers.map((l) => l.zone).filter((z) => ZONES?.[z]))];

  function facesCount() {
    if (ZONES) return usedZones().length || 1;
    const sides = new Set(state.layers.map((l) => l.side));
    if (sides.size) return sides.size;
    return state.places.has('Devant + dos') ? 2 : 1;
  }

  function quote() {
    const a = art();
    const fit = a.fits[state.fit];
    const mat = a.materials.find((m) => m.id === state.material);
    const t = CFG.techniques[state.tech];
    const faces = facesCount();
    const qty = totalQty();
    const tier = [...CFG.tiers].sort((x, y) => y.min - x.min).find((x) => qty >= x.min);
    const off = tier ? tier.off : 0;
    const creation = creationQuote(qty);

    // article fournisseur : coût réel (impression comprise) + marge ; la remise ne touche que la marge
    const cost = supplierCost(faces);
    if (cost) {
      const marge = margeOf(a);
      const ship = shippingCost(a, qty);
      const base = cost + marge;
      const total = qty ? (cost + marge * (1 - off)) * qty + ship + creation.fee : 0;
      return { faces, qty, base, setup: 0, ship, off, offMarge: true, creation, total, unit: qty ? total / qty : base };
    }

    const base = a.base + (fit?.price || 0) + (mat?.price || 0) + t.perFace * faces;
    const setup = t.setup * faces;
    const total = qty ? (base * qty + setup) * (1 - off) + creation.fee : 0;
    return { faces, qty, base, setup, ship: 0, off, creation, total, unit: qty ? total / qty : base };
  }

  // création du design : due dès qu'une idée est décrite, offerte à partir de `offerteDes` pièces
  const hasIdea = () => !!($('#ideaText').value.trim() || state.inspo.length);
  const creationPrice = (o) => `${o.aPartirDe ? 'dès ' : ''}${fmt(o.price)}`;
  function creationQuote(qty) {
    const offer = hasIdea() ? CFG.creation.offres.find((o) => o.id === state.creation) : null;
    if (!offer || !qty) return { offer, fee: 0, free: false };
    const free = CFG.creation.offerteDes > 0 && qty >= CFG.creation.offerteDes;
    return { offer, fee: free ? 0 : offer.price, free };
  }

  // marge par pièce : celle de l'article, sinon la marge par défaut
  const margeOf = (a) => a.marge ?? CFG.marge ?? 0;
  // frais d'envoi d'une commande : 1er article + chaque article suivant
  function shippingCost(a, qty) {
    if (!qty) return 0;
    const l = a.livraison || CFG.livraison;
    return l.premier + l.suivant * (qty - 1);
  }

  // prix fournisseur d'une pièce (1 emplacement inclus, + surcoût par emplacement en plus)
  function supplierCost(faces, a = art(), tech = state.tech) {
    const emb = tech === 'broderie';
    const cost = (emb && a.costBroderie) || a.cost;
    if (!cost) return 0;
    const extra = (emb ? a.costFaceBroderie ?? a.costFace : a.costFace) || 0;
    return cost + extra * Math.max(0, faces - 1);
  }
  // prix « dès » d'un article (1 emplacement), sans livraison
  const fromPrice = (a, tech) => {
    const cost = supplierCost(1, a, tech);
    if (cost) return cost + margeOf(a);
    const t = CFG.techniques[tech];
    return a.base + (t ? t.perFace : minPerFace());
  };

  function specLine() {
    const a = art();
    const mat = a.materials.find((m) => m.id === state.material);
    return `${articleName()}${a.model ? ` (${a.model})` : ''} · ${mat.name} · ${CFG.techniques[state.tech].name}`;
  }

  function techAdvice(q) {
    const t = CFG.techniques[state.tech];
    const imgs = state.layers.filter((l) => l.type === 'image');
    const alt = (id, why) => (techLocked(id) ? why : `${why} <br><button type="button" class="advice-btn" data-tech="${id}">Passer en ${esc(CFG.techniques[id]?.name || id)}</button>`);
    switch (state.tech) {
      case 'broderie':
        return `Brodé uniquement sur ${embAllowed().map((o) => {
          const a = CFG.articles[o.article];
          return `<b>${esc(a ? `${a.label}${o.fit && a.fits[o.fit] ? ` ${a.fits[o.fit].label}` : ''}` : o.article)}</b>`;
        }).join(', ').replace(/, ([^,]*)$/, ' et $1') || 'nos t-shirts'} (${palette().length} coloris sur ce modèle). Emplacements : ${zoneList().map((z) => z.label.toLowerCase()).join(', ')}, ${t.maxCm || 12} cm max. Pas de photos ni de dégradés.`;
      case 'dtg':
        if (isDark(state.color.hex) && CFG.techniques.dtf) return alt('dtf', 'Sur un textile foncé, le DTG demande une sous-couche blanche : le <b>DTF</b> rend souvent plus éclatant.');
        return 'L\'encre pénètre dans le coton : toucher invisible, photos et dégradés compris, dès 1 pièce.';
      case 'serigraphie':
        if (q.qty && q.qty < 20) return alt('dtf', `Pour <b>${q.qty} pièce${q.qty > 1 ? 's' : ''}</b>, les frais d'écran pèsent lourd : le DTF revient souvent moins cher.`);
        return 'Le meilleur rapport qualité/prix en série, avec des couleurs unies très éclatantes.';
      case 'flocage':
        if (imgs.length) return alt('dtf', 'Le flocage convient aux <b>textes et formes simples</b>, pas aux logos détaillés ou aux photos.');
        return 'Parfait pour les noms, numéros et textes en 1 ou 2 couleurs.';
      default:
        if (q.qty >= 20 && CFG.techniques.serigraphie && !techLocked('serigraphie')) return alt('serigraphie', `À partir de <b>20 pièces</b>, la sérigraphie devient souvent plus rentable.`);
        return 'Le plus polyvalent : toutes les couleurs, photos et dégradés, dès 1 pièce.';
    }
  }

  function refresh() {
    const q = quote();
    const t = CFG.techniques[state.tech];
    $('#stageSpec').textContent = specLine();
    $('#stagePrice').textContent = q.qty ? `${fmt(q.unit)} / pièce` : `dès ${fmt(q.base)}`;
    $('#techBadge').textContent = t.name;
    stage.dataset.tech = state.tech;
    $('#techAdvice').innerHTML = techAdvice(q);

    // récap
    const a = art();
    const mat = a.materials.find((m) => m.id === state.material);
    const sides = new Set(state.layers.map((l) => l.side));
    const where = ZONES
      ? (usedZones().map((z) => ZONES[z].label.toLowerCase()).join(' + ') || 'à définir')
      : sides.size === 2 ? 'devant + dos' : sides.has('back') ? 'dos' : sides.has('front') ? 'devant' : (q.faces === 2 ? 'devant + dos' : 'à définir');
    const visuals = state.layers.length
      ? `${state.layers.length} élément${state.layers.length > 1 ? 's' : ''}`
      : ($('#ideaText').value.trim() || state.inspo.length ? 'idée décrite' : 'à ajouter');
    $('#orderSummary').innerHTML = `
      <div class="sum-head"><span>Ta commande</span><a href="#studio">Modifier</a></div>
      <dl>
        <div><dt>Article</dt><dd>${esc(articleName())}${a.model ? ` <small>${esc(a.model)}</small>` : ''}</dd></div>
        <div><dt>Couleur</dt><dd><span class="cdot" style="background:${state.color.hex}"></span>${esc(state.color.name)}</dd></div>
        <div><dt>Matière</dt><dd>${esc(mat.name)}</dd></div>
        <div><dt>Marquage</dt><dd>${esc(t.name)} · ${where}</dd></div>
        <div><dt>Visuel</dt><dd>${visuals}</dd></div>
      </dl>`;

    // estimation
    $('#estUnit').textContent = fmt(q.unit);
    $('#estTotal').textContent = q.qty ? fmt(q.total) : '—';
    const parts = [`${q.faces} face${q.faces > 1 ? 's' : ''} marquée${q.faces > 1 ? 's' : ''}`];
    if (q.setup) parts.push(`${fmt(q.setup)} de mise en route`);
    if (q.off) parts.push(`${Math.round(q.off * 100)} % de remise quantité`);
    if (q.ship) parts.push(`${fmt(q.ship)} de livraison`);
    if (q.creation.fee) parts.push(`${creationPrice(q.creation.offer)} de création du design`);
    if (q.creation.free) parts.push('création du design offerte');
    $('#estNote').textContent = q.qty ? `Inclut ${parts.join(', ')}.` : 'Ajoute des tailles pour calculer ton total.';
    $('#tiers').innerHTML = CFG.tiers.map((x) => `<span class="tier${q.off === x.off && q.qty >= x.min ? ' on' : ''}">${x.min}+ pièces · −${Math.round(x.off * 100)} %</span>`).join('');
  }

  /* ----- calques ----- */
  const current = () => state.layers.find((l) => l.id === state.selected);

  function setWidth(l, w) {
    l.w = clamp(w, isEmb() ? 8 : 16, maxWidth(l));
    l.h = l.w * l.aspect;
    if (ZONES) clampLayer(l);
  }

  function addLayer(l) {
    state.layers.push(l);
    if (l.side !== state.side) switchSide(l.side);
    renderDesign();
    select(l.id);
    changed();
    const node = $(`.js-design > g[data-id="${l.id}"]`, svg);
    if (node && node.animate && !reduced) {
      node.firstChild.animate([{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 500, easing: 'cubic-bezier(.22,1,.36,1)' });
    }
  }

  function removeLayer(id) {
    state.layers = state.layers.filter((l) => l.id !== id);
    if (state.selected === id) state.selected = null;
    renderDesign();
    changed();
  }

  function layerNode(l) {
    const g = document.createElementNS(NS, 'g');
    g.dataset.id = l.id;
    g.setAttribute('transform', `translate(${l.x} ${l.y}) rotate(${l.rot})`);
    const img = document.createElementNS(NS, 'image');
    img.setAttribute('href', l.src);
    img.setAttributeNS(XLINK, 'xlink:href', l.src);
    img.setAttribute('preserveAspectRatio', 'none');
    setImgBox(img, l);
    img.style.transformOrigin = 'center';
    img.style.transformBox = 'fill-box';
    g.appendChild(img);
    return g;
  }
  function setImgBox(img, l) {
    img.setAttribute('x', -l.w / 2);
    img.setAttribute('y', -l.h / 2);
    img.setAttribute('width', l.w);
    img.setAttribute('height', l.h);
  }

  function renderDesign() {
    const g = $('.js-design', svg);
    g.innerHTML = '';
    state.layers.filter((l) => l.side === state.side).forEach((l) => g.appendChild(layerNode(l)));
    renderSelection();
    stage.classList.toggle('has-layers', state.layers.some((l) => l.side === state.side));
  }

  function updateLayerDom(l) {
    const g = $(`.js-design > g[data-id="${l.id}"]`, svg);
    if (g) {
      g.setAttribute('transform', `translate(${l.x} ${l.y}) rotate(${l.rot})`);
      const img = g.firstChild;
      setImgBox(img, l);
      if (img.getAttribute('href') !== l.src) {
        img.setAttribute('href', l.src);
        img.setAttributeNS(XLINK, 'xlink:href', l.src);
      }
    }
    renderSelection();
  }

  function renderSelection() {
    const sel = $('.js-sel', svg);
    const l = current();
    $('#layerTools').hidden = !l;
    if (!l || l.side !== state.side) { sel.innerHTML = ''; return; }
    const hw = l.w / 2 + 4, hh = l.h / 2 + 4;
    sel.innerHTML = `
      <g transform="translate(${l.x} ${l.y}) rotate(${l.rot})">
        <rect class="sel-box" x="${-hw}" y="${-hh}" width="${hw * 2}" height="${hh * 2}" rx="2"/>
        <line class="sel-line" x1="0" y1="${-hh}" x2="0" y2="${-hh - 16}"/>
        <circle class="sel-handle" data-handle="rotate" cx="0" cy="${-hh - 21}" r="6"/>
        <circle class="sel-handle" data-handle="scale" cx="${hw}" cy="${hh}" r="6"/>
      </g>`;
    $('#sizeRange').value = Math.round(l.w);
    $('#rotRange').value = Math.round(l.rot);
    $('#layerDims').textContent = `≈ ${Math.round(l.w * CM_PER_UNIT)} × ${Math.round(l.h * CM_PER_UNIT)} cm`;
    const rb = $('#removeBg');
    rb.hidden = l.type !== 'image';
    rb.classList.toggle('active', !!l.bgRemoved);
    rb.textContent = l.bgRemoved ? 'Remettre le fond' : 'Retirer le fond blanc';
    $('#moveSide').textContent = l.side === 'front' ? 'Passer au dos' : 'Passer devant';
  }

  function select(id) {
    state.selected = id;
    const l = current();
    if (l && l.side !== state.side) switchSide(l.side);
    if (l?.zone && ZONES?.[l.zone]) state.zone = l.zone;
    renderSelection();
    renderLayersList();
    renderZones();
  }

  function renderLayersList() {
    const list = $('#layersList');
    list.innerHTML = state.layers.map((l) => `
      <button class="layer-row${l.id === state.selected ? ' active' : ''}" data-id="${l.id}" type="button">
        <img src="${l.src}" alt=""><span>${esc(l.name)}</span><em>${esc(ZONES?.[l.zone]?.label || (l.side === 'front' ? 'Devant' : 'Dos'))}</em>
      </button>`).join('');
    $$('.layer-row', list).forEach((b) => b.addEventListener('click', () => select(b.dataset.id)));
  }

  function updateEmpty() {
    const z = activeZone();
    $('#stageEmpty').classList.toggle('hidden', state.layers.some((l) => l.side === state.side && (!z || l.zone === z)));
  }

  let changeTimer;
  function changed() {
    renderLayersList();
    if (ZONES) renderZones();
    updateEmpty();
    stage.classList.toggle('has-layers', state.layers.some((l) => l.side === state.side));
    refresh();
    clearTimeout(changeTimer);
    changeTimer = setTimeout(updateMiniPreview, 500);
  }

  /* ----- glisser / tourner / redimensionner ----- */
  function toSvgPoint(e) {
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }

  function setupPointer() {
    let drag = null;
    svg.addEventListener('pointerdown', (e) => {
      if (flipping) return;
      const p = toSvgPoint(e);
      const handle = e.target.closest('[data-handle]');
      const node = e.target.closest('.js-design > g');
      if (handle && current()) {
        const l = current();
        drag = { mode: handle.dataset.handle, l, w0: l.w, d0: Math.hypot(p.x - l.x, p.y - l.y) || 1 };
      } else if (node) {
        select(node.dataset.id);
        const l = current();
        drag = { mode: 'move', l, ox: p.x - l.x, oy: p.y - l.y };
      } else {
        if (state.selected) select(null);
        return;
      }
      e.preventDefault();
      stage.classList.add('dragging');
    });
    window.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const p = toSvgPoint(e);
      const l = drag.l;
      if (drag.mode === 'move') {
        l.x = p.x - drag.ox;
        l.y = p.y - drag.oy;
        clampLayer(l);
      } else if (drag.mode === 'scale') {
        setWidth(l, drag.w0 * Math.hypot(p.x - l.x, p.y - l.y) / drag.d0);
      } else if (drag.mode === 'rotate') {
        let a = Math.atan2(p.y - l.y, p.x - l.x) * 180 / Math.PI + 90;
        if (a > 180) a -= 360;
        for (const snap of [-180, -90, 0, 90, 180]) if (Math.abs(a - snap) < 5) a = snap;
        l.rot = Math.round(a);
      }
      updateLayerDom(l);
    });
    const end = () => {
      if (!drag) return;
      drag = null;
      stage.classList.remove('dragging');
      changed();
    };
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);

    svg.addEventListener('wheel', (e) => {
      const node = e.target.closest('.js-design > g, [data-handle]');
      const l = current();
      if (!node || !l) return;
      e.preventDefault();
      setWidth(l, l.w * (e.deltaY < 0 ? 1.06 : 1 / 1.06));
      updateLayerDom(l);
      clearTimeout(changeTimer);
      changeTimer = setTimeout(changed, 300);
    }, { passive: false });
  }

  /* ----- ajout d'images ----- */
  const readAsDataURL = (file) => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
  const loadImg = (src) => new Promise((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = src;
  });

  async function addFiles(fileList) {
    const files = [...fileList];
    for (const file of files) {
      if (!file.type.startsWith('image/')) { toast(`« ${file.name} » n'est pas une image`); continue; }
      if (file.size > 20 * 1024 * 1024) { toast(`« ${file.name} » dépasse 20 Mo`); continue; }
      try {
        const url = await readAsDataURL(file);
        const img = await loadImg(url);
        let nw = img.naturalWidth || 600, nh = img.naturalHeight || 600;
        let src = url;
        const MAX = 1400;
        if (file.type !== 'image/svg+xml' && Math.max(nw, nh) > MAX) {
          const k = MAX / Math.max(nw, nh);
          nw = Math.round(nw * k); nh = Math.round(nh * k);
          const c = document.createElement('canvas');
          c.width = nw; c.height = nh;
          c.getContext('2d').drawImage(img, 0, 0, nw, nh);
          src = c.toDataURL('image/png');
        }
        const aspect = nh / nw;
        let w = Math.min(120, PRINT.w * 0.75);
        if (w * aspect > 150) w = 150 / aspect;
        const sideCount = state.layers.filter((l) => l.side === state.side).length;
        const layer = {
          id: uid(), type: 'image', name: file.name, file, src, orig: src, aspect,
          w, h: w * aspect, rot: 0, side: state.side, zone: state.zone,
          x: PRINT.x + PRINT.w / 2 + sideCount * 6,
          y: clamp(PRINT.y + 30 + (w * aspect) / 2 + sideCount * 6, PRINT.y, PRINT.y + PRINT.h),
        };
        placeInZone(layer);
        addLayer(layer);
        toast('Logo ajouté ✺ glisse-le pour le placer');
      } catch (err) {
        console.error(err);
        toast(`Impossible de lire « ${file.name} »`);
      }
    }
  }

  function setupDrop() {
    let depth = 0;
    const hasFiles = (e) => [...(e.dataTransfer?.types || [])].includes('Files');
    stage.addEventListener('dragenter', (e) => { if (!hasFiles(e)) return; e.preventDefault(); depth++; stage.classList.add('drag-over'); });
    stage.addEventListener('dragleave', () => { depth = Math.max(0, depth - 1); if (!depth) stage.classList.remove('drag-over'); });
    stage.addEventListener('dragover', (e) => { if (hasFiles(e)) e.preventDefault(); });
    stage.addEventListener('drop', (e) => {
      e.preventDefault(); depth = 0; stage.classList.remove('drag-over');
      setMode('logo');
      addFiles(e.dataTransfer.files);
    });
    const dz = $('#dropzone');
    dz.addEventListener('dragover', (e) => { if (hasFiles(e)) { e.preventDefault(); dz.classList.add('over'); } });
    dz.addEventListener('dragleave', () => dz.classList.remove('over'));
    dz.addEventListener('drop', (e) => { e.preventDefault(); dz.classList.remove('over'); addFiles(e.dataTransfer.files); });
    const iz = $('#inspoInput').closest('.dropzone');
    iz.addEventListener('dragover', (e) => { if (hasFiles(e)) { e.preventDefault(); iz.classList.add('over'); } });
    iz.addEventListener('dragleave', () => iz.classList.remove('over'));
    iz.addEventListener('drop', (e) => { e.preventDefault(); iz.classList.remove('over'); addInspo(e.dataTransfer.files); });
    // évite d'ouvrir le fichier si on le lâche à côté
    window.addEventListener('dragover', (e) => e.preventDefault());
    window.addEventListener('drop', (e) => e.preventDefault());
  }

  /* ----- retrait du fond blanc ----- */
  async function toggleRemoveBg() {
    const l = current();
    if (!l || l.type !== 'image') return;
    if (l.bgRemoved) {
      l.src = l.orig; l.bgRemoved = false;
    } else {
      try {
        const img = await loadImg(l.orig);
        const w = img.naturalWidth || 1000, h = img.naturalHeight || Math.round(1000 * l.aspect);
        const c = document.createElement('canvas');
        c.width = w; c.height = h;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const data = ctx.getImageData(0, 0, w, h);
        const d = data.data;
        for (let i = 0; i < d.length; i += 4) {
          const m = Math.min(d[i], d[i + 1], d[i + 2]);
          if (m >= 242) d[i + 3] = 0;
          else if (m > 205) d[i + 3] = Math.round(d[i + 3] * (242 - m) / 37);
        }
        ctx.putImageData(data, 0, 0);
        l.src = c.toDataURL('image/png');
        l.bgRemoved = true;
      } catch (err) {
        console.error(err);
        toast('Ce fichier ne permet pas de retirer le fond');
        return;
      }
    }
    updateLayerDom(l);
    changed();
  }

  /* ----- texte ----- */
  function trimCanvas(c) {
    const ctx = c.getContext('2d');
    const { width: w, height: h } = c;
    const d = ctx.getImageData(0, 0, w, h).data;
    let x0 = w, y0 = h, x1 = -1, y1 = -1;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (d[(y * w + x) * 4 + 3] > 8) {
          if (x < x0) x0 = x; if (x > x1) x1 = x;
          if (y < y0) y0 = y; if (y > y1) y1 = y;
        }
      }
    }
    if (x1 < 0) return c;
    const pad = 6;
    x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad);
    x1 = Math.min(w - 1, x1 + pad); y1 = Math.min(h - 1, y1 + pad);
    const out = document.createElement('canvas');
    out.width = x1 - x0 + 1; out.height = y1 - y0 + 1;
    out.getContext('2d').drawImage(c, x0, y0, out.width, out.height, 0, 0, out.width, out.height);
    return out;
  }

  async function addText() {
    const input = $('#textInput');
    const txt = input.value.trim();
    if (!txt) { shake(input); input.focus(); return; }
    const f = FONTS[+$('#fontSelect').value];
    const color = $('#textColor').value;
    const size = 180;
    const font = `${f.css} ${size}px "${f.family}", sans-serif`;
    try { await document.fonts.load(font, txt); } catch (_) { /* police de secours */ }
    const c = document.createElement('canvas');
    let ctx = c.getContext('2d');
    ctx.font = font;
    const width = Math.ceil(ctx.measureText(txt).width) + size;
    c.width = Math.min(width, 8000);
    c.height = Math.round(size * 2);
    ctx = c.getContext('2d');
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';
    ctx.fillText(txt, size / 2, c.height / 2);
    const t = trimCanvas(c);
    const aspect = t.height / t.width;
    let w = Math.min(140, PRINT.w * 0.85);
    if (w * aspect > 90) w = 90 / aspect;
    const layer = {
      id: uid(), type: 'text', name: `« ${txt} » · ${f.label}`, text: txt, font: f.label, color,
      src: t.toDataURL('image/png'), aspect, w, h: w * aspect, rot: 0, side: state.side, zone: state.zone,
      x: PRINT.x + PRINT.w / 2, y: PRINT.y + PRINT.h * 0.55,
    };
    placeInZone(layer);
    addLayer(layer);
    input.value = '';
  }

  // avec emplacements : l'élément est posé dans celui choisi (en broderie, il en prend toute la place)
  function placeInZone(l) {
    if (!ZONES) return;
    const z = zoneFor(l);
    l.zone = z.id;
    l.side = z.side;
    l.w = isEmb() ? maxWidth(l) : Math.min(l.w, maxWidth(l));
    l.h = l.w * l.aspect;
    l.x = z.x + z.w / 2;
    l.y = isEmb() ? z.y + z.h / 2 : z.y + Math.min(z.h / 2, l.h / 2 + 30);
    clampLayer(l);
  }

  /* ----- mode idée ----- */
  function chipGroup(host, items, set, onChange) {
    host.innerHTML = items.map((s) => `<button type="button" class="chip" data-v="${esc(s)}">${esc(s)}</button>`).join('');
    host.addEventListener('click', (e) => {
      const b = e.target.closest('.chip');
      if (!b) return;
      const v = b.dataset.v;
      set.has(v) ? set.delete(v) : set.add(v);
      b.classList.toggle('active', set.has(v));
      onChange?.();
    });
  }

  async function addInspo(fileList) {
    for (const file of [...fileList]) {
      if (!file.type.startsWith('image/')) continue;
      if (state.inspo.length >= 8) { toast('8 images maximum'); break; }
      const url = await readAsDataURL(file);
      state.inspo.push({ id: uid(), file, url });
    }
    renderInspo();
  }
  function renderInspo() {
    const host = $('#inspoThumbs');
    host.innerHTML = state.inspo.map((i) => `<div class="thumb"><img src="${i.url}" alt=""><button type="button" data-id="${i.id}" aria-label="Retirer">×</button></div>`).join('');
    $$('button', host).forEach((b) => b.addEventListener('click', () => {
      state.inspo = state.inspo.filter((i) => i.id !== b.dataset.id);
      renderInspo();
    }));
    refresh();
  }

  /* ------------------------------------------------------------------------
     Rendu des maquettes (PNG)
     ------------------------------------------------------------------------ */
  async function renderSide(side, width = 800) {
    const clone = svg.cloneNode(true);
    applyStage(clone, side);
    const g = $('.js-design', clone);
    g.innerHTML = '';
    state.layers.filter((l) => l.side === side).forEach((l) => g.appendChild(layerNode(l)));
    $('.js-zones', clone).innerHTML = '';
    $('.js-sel', clone).innerHTML = '';
    const height = Math.round(width * 460 / 400);
    clone.setAttribute('width', width);
    clone.setAttribute('height', height);
    const str = new XMLSerializer().serializeToString(clone);
    const img = await loadImg('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(str));
    const c = document.createElement('canvas');
    c.width = width; c.height = height;
    c.getContext('2d').drawImage(img, 0, 0, width, height);
    return c;
  }

  async function renderComposite() {
    const [front, back] = await Promise.all([renderSide('front', 900), renderSide('back', 900)]);
    const W = 2000, H = 1260;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const ctx = c.getContext('2d');
    const light = isDark(state.color.hex);
    ctx.fillStyle = light ? '#f3efe6' : '#2c5a47';
    ctx.fillRect(0, 0, W, H);
    // quadrillage du tapis de découpe
    ctx.strokeStyle = light ? 'rgba(23,20,15,.08)' : 'rgba(255,255,255,.12)';
    ctx.lineWidth = 2;
    for (let x = 0; x <= W; x += 100) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y <= H; y += 100) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    const fg = light ? '#17140f' : '#f3efe6';
    ctx.drawImage(front, 70, 120, 900, 1035);
    ctx.drawImage(back, 1030, 120, 900, 1035);
    ctx.fillStyle = fg;
    ctx.font = '800 46px "Bricolage Grotesque", sans-serif';
    ctx.fillText(CFG.brand, 70, 82);
    ctx.font = '500 26px "DM Sans", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`${specLine()} · ${state.color.name}`, W - 70, 78);
    ctx.textAlign = 'center';
    ctx.font = '500 26px "DM Mono", monospace';
    ctx.globalAlpha = .6;
    ctx.fillText('DEVANT', 520, H - 40);
    ctx.fillText('DOS', 1480, H - 40);
    ctx.globalAlpha = 1;
    return c;
  }

  let miniVisible = false;
  async function updateMiniPreview() {
    if (!miniVisible) return;
    try {
      const [f, b] = await Promise.all([renderSide('front', 400), renderSide('back', 400)]);
      $('#miniFront').src = f.toDataURL('image/png');
      $('#miniBack').src = b.toDataURL('image/png');
    } catch (err) { console.error(err); }
  }

  function downloadBlob(blob, name) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  /* ------------------------------------------------------------------------
     Formulaire de commande
     ------------------------------------------------------------------------ */
  function renderSizes() {
    const list = art().sizes;
    const prev = state.sizes;
    state.sizes = Object.fromEntries(list.map((s) => [s, prev[s] || 0]));
    const host = $('#sizes');
    host.classList.toggle('single', list.length === 1);
    $('#sizesLabel').textContent = list.length > 1 ? 'Tailles & quantités' : 'Quantité';
    host.innerHTML = list.map((s) => `
      <div class="size${state.sizes[s] ? ' has' : ''}" data-s="${esc(s)}"><b>${esc(s)}</b>
        <div class="ctrl">
          <button type="button" data-d="-1" aria-label="Retirer une pièce ${esc(s)}">−</button>
          <input type="number" min="0" max="999" inputmode="numeric" value="${state.sizes[s]}" aria-label="Quantité ${esc(s)}">
          <button type="button" data-d="1" aria-label="Ajouter une pièce ${esc(s)}">+</button>
        </div>
      </div>`).join('');
    updateQty();
  }

  function setSize(box, n) {
    const s = box.dataset.s;
    state.sizes[s] = clamp(Math.round(n) || 0, 0, 999);
    $('input', box).value = state.sizes[s];
    box.classList.toggle('has', state.sizes[s] > 0);
    updateQty();
  }

  function updateQty() {
    const total = totalQty();
    $('#qtyTotal').textContent = `${total} pièce${total > 1 ? 's' : ''}`;
    refresh();
  }

  function initOrder() {
    const sizes = $('#sizes');
    sizes.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-d]');
      if (!b) return;
      const box = b.closest('.size');
      setSize(box, state.sizes[box.dataset.s] + +b.dataset.d);
    });
    sizes.addEventListener('input', (e) => {
      if (e.target.matches('input')) setSize(e.target.closest('.size'), +e.target.value);
    });
    renderSizes();

    $('#fDate').min = new Date().toISOString().slice(0, 10);
    $('#orderForm').addEventListener('submit', submitOrder);
    $$('#orderForm input').forEach((i) => i.addEventListener('input', () => i.classList.remove('invalid')));
    $('#fConsent').addEventListener('change', (e) => e.target.closest('.check').classList.remove('invalid'));

    new IntersectionObserver((entries) => {
      miniVisible = entries[0].isIntersecting;
      if (miniVisible) updateMiniPreview();
    }, { rootMargin: '200px' }).observe($('#order'));
  }

  function buildRecap() {
    const name = $('#fName').value.trim();
    const phone = $('#fPhone').value.trim();
    const date = $('#fDate').value;
    const q = quote();
    const sizes = Object.keys(state.sizes).filter((s) => state.sizes[s]).map((s) => `${s} × ${state.sizes[s]}`).join(', ');
    const describe = (side) => {
      const ls = state.layers.filter((l) => l.side === side);
      if (!ls.length) return 'rien';
      return ls.map((l) => (l.type === 'text' ? `texte « ${l.text} » (${l.font}, ${l.color})` : `logo ${l.name}${l.bgRemoved ? ' (fond retiré)' : ''}`)
        + ` ≈ ${Math.round(l.w * CM_PER_UNIT)} cm`
        + (ZONES?.[l.zone] ? ` [${isEmb() ? 'broderie ' : ''}${ZONES[l.zone].label.toLowerCase()}]` : '')).join(' ; ');
    };
    const lines = [
      `Nouvelle demande — ${CFG.brand}`,
      '',
      `Client : ${name}`,
      `Email : ${$('#fEmail').value.trim()}`,
      phone ? `Téléphone : ${phone}` : null,
      '',
      `Article : ${specLine()}`,
      `Couleur : ${state.color.name} (${state.color.hex})`,
      `Tailles : ${sizes} — total ${q.qty}`,
      `Estimation : ${fmt(q.unit)} / pièce · ${fmt(q.total)} au total (indicatif)`,
      date ? `Pour le : ${new Date(date + 'T12:00').toLocaleDateString('fr-FR')}` : null,
      '',
      `Devant : ${describe('front')}`,
      `Dos : ${describe('back')}`,
    ];
    const idea = $('#ideaText').value.trim();
    if (idea || state.styles.size || state.places.size || state.inspo.length) {
      lines.push('', '— Idée du client —');
      if (idea) lines.push(idea);
      if (state.styles.size) lines.push(`Style : ${[...state.styles].join(', ')}`);
      if (state.places.size) lines.push(`Emplacement : ${[...state.places].join(', ')}`);
      if (state.inspo.length) lines.push(`Images d'inspiration : ${state.inspo.length}`);
      if (q.creation.offer) lines.push(`Création demandée : ${q.creation.offer.name} (${q.creation.free ? 'offerte' : creationPrice(q.creation.offer)})`);
    }
    const notes = $('#fNotes').value.trim();
    if (notes) lines.push('', `Notes : ${notes}`);
    return lines.filter((l) => l !== null).join('\n');
  }

  async function submitOrder(e) {
    e.preventDefault();
    const err = $('#formError');
    err.textContent = '';
    const name = $('#fName'), email = $('#fEmail'), consent = $('#fConsent');
    const problems = [];
    if (!name.value.trim()) { name.classList.add('invalid'); problems.push('ton nom'); }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { email.classList.add('invalid'); problems.push('un email valide'); }
    if (!totalQty()) problems.push('au moins une pièce');
    const hasDesign = state.layers.length || $('#ideaText').value.trim() || state.inspo.length;
    if (!hasDesign) problems.push('un logo, un texte ou la description de ton idée (dans le studio)');
    if (!consent.checked) { consent.closest('.check').classList.add('invalid'); problems.push('ton accord pour traiter la demande'); }
    if (problems.length) {
      err.textContent = `Il manque : ${problems.join(', ')}.`;
      shake($('#orderForm'));
      return;
    }

    const btn = $('#submitBtn');
    btn.disabled = true;
    btn.classList.add('loading');
    try {
      const mock = await renderComposite();
      const blob = await new Promise((r) => mock.toBlob(r, 'image/png'));
      const recap = buildRecap();
      let sent = false;

      if (CFG.formEndpoint) {
        const fd = new FormData();
        fd.append('name', name.value.trim());
        fd.append('email', email.value.trim());
        fd.append('_replyto', email.value.trim());
        fd.append('_subject', `Nouvelle demande — ${name.value.trim()}`);
        fd.append('_template', 'table');
        fd.append('_captcha', 'false');
        // Pièces jointes limitées à ~10 Mo au total : au-delà, on les signale dans le message
        let budget = 9.5e6 - blob.size;
        const skipped = [];
        const attach = (field, file) => {
          if (file.size <= budget) { fd.append(field, file, file.name); budget -= file.size; } else skipped.push(file.name);
        };
        fd.append('maquette', blob, 'maquette.png');
        state.layers.filter((l) => l.file).forEach((l, i) => attach(`logo_${i + 1}`, l.file));
        state.inspo.forEach((p, i) => attach(`inspiration_${i + 1}`, p.file));
        fd.append('message', skipped.length ? `${recap}\n\nFichiers trop lourds, non joints (à redemander au client) : ${skipped.join(', ')}` : recap);
        const res = await fetch(CFG.formEndpoint, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json().catch(() => ({}));
        if (data.success === false || data.success === 'false') throw new Error(data.message || 'envoi refusé');
        sent = true;
      } else {
        downloadBlob(blob, 'maquette.png');
        const body = `${recap}\n\n(La maquette « maquette.png » vient d'être téléchargée : pense à la joindre à cet email, avec ton logo.)`;
        location.href = `mailto:${CFG.email}?subject=${encodeURIComponent(`Demande de devis — ${name.value.trim()}`)}&body=${encodeURIComponent(body)}`;
      }
      showModal(mock.toDataURL('image/png'), sent);
      confetti();
    } catch (error) {
      console.error(error);
      err.textContent = 'Oups, l\'envoi n\'a pas fonctionné. Réessaie dans un instant ou écris-nous directement.';
    } finally {
      btn.disabled = false;
      btn.classList.remove('loading');
    }
  }

  function showModal(src, sent) {
    const m = $('#modal');
    $('#modalImg').src = src;
    $('#modalTitle').textContent = sent ? 'Demande envoyée !' : 'Presque fini !';
    const paidDesign = quote().creation.fee > 0;
    $('#modalText').textContent = sent
      ? (paidDesign
        ? 'On revient vers toi sous 24h avec ton devis et le lien de paiement de la création.'
        : 'On revient vers toi sous 24h avec ta maquette finale et ton devis.')
      : 'Ton email est prêt : ajoute la maquette qui vient d\'être téléchargée (et ton logo) puis envoie-le. On te répond sous 24h.';
    m.hidden = false;
    $('#modalClose').focus();
  }

  /* ------------------------------------------------------------------------
     Pied de page, contact
     ------------------------------------------------------------------------ */
  function initContact() {
    const contact = [];
    if (CFG.email) contact.push(`<a href="mailto:${esc(CFG.email)}">${esc(CFG.email)}</a>`);
    if (CFG.phone) contact.push(`<a href="tel:${esc(CFG.phone.replace(/\s+/g, ''))}">${esc(CFG.phone)}</a>`);
    $('#footerContact').innerHTML = contact.join('');
    $('#footerContact').parentElement.hidden = !contact.length;

    const socials = [['Instagram', CFG.instagram], ['TikTok', CFG.tiktok], ['Facebook', CFG.facebook]].filter(([, u]) => u);
    $('#footerSocial').innerHTML = socials.map(([n, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${n} ↗</a>`).join('');
    $('#footerSocial').parentElement.hidden = !socials.length;

    if (CFG.whatsapp) {
      const wa = $('#waFloat');
      wa.href = `https://wa.me/${encodeURIComponent(CFG.whatsapp)}`;
      wa.hidden = false;
    }
    if (CFG.paymentLink) {
      $('#modalPay').href = CFG.paymentLink;
      $('#modalPay').hidden = false;
    }
    $('#year').textContent = new Date().getFullYear();

    // chiffres du hero tirés de la config : ils suivent les articles ajoutés ou retirés
    const most = Math.max(COLORS.length, ...Object.values(CFG.articles).map((a) => a.colors?.length || 0));
    $('#statTech').textContent = Object.keys(CFG.techniques).length;
    $('#statColors').textContent = most >= 20 ? `${Math.floor(most / 10) * 10}+` : most;
  }

  /* ------------------------------------------------------------------------
     Effets : apparition au défilement, nav
     ------------------------------------------------------------------------ */
  function initEffects() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        el.classList.add('in');
        io.unobserve(el);
        // une fois apparu, on rend la main aux transitions de survol
        setTimeout(() => { el.style.transitionDelay = ''; el.classList.add('settled'); }, 1000);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });
    requestAnimationFrame(() => document.body.classList.add('ready'));
  }

  function initNav() {
    const nav = $('#nav');
    let last = scrollY;
    window.addEventListener('scroll', () => {
      const y = scrollY;
      nav.classList.toggle('hide', y > last && y > 400);
      last = y;
    }, { passive: true });
  }

  /* ----- petits utilitaires d'interface ----- */
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }
  function shake(el) {
    el.classList.remove('shake');
    void el.offsetWidth;
    el.classList.add('shake');
  }

  function confetti() {
    if (reduced) return;
    const c = $('#confetti');
    const ctx = c.getContext('2d');
    const dpr = Math.min(2, devicePixelRatio || 1);
    c.width = innerWidth * dpr; c.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const colors = ['#ff4d1f', '#ffd43b', '#2f3bff', '#17140f', '#2c5a47'];
    const parts = Array.from({ length: 160 }, () => ({
      x: innerWidth / 2 + (Math.random() - 0.5) * 200, y: innerHeight * 0.45,
      vx: (Math.random() - 0.5) * 16, vy: -Math.random() * 16 - 6,
      s: Math.random() * 8 + 4, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
      c: colors[(Math.random() * colors.length) | 0],
    }));
    const t0 = performance.now();
    const step = (t) => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      parts.forEach((p) => {
        p.vy += 0.42; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        ctx.restore();
      });
      if (t - t0 < 3200) requestAnimationFrame(step);
      else ctx.clearRect(0, 0, innerWidth, innerHeight);
    };
    requestAnimationFrame(step);
  }

  /* ------------------------------------------------------------------------
     Démarrage
     ------------------------------------------------------------------------ */
  initHero();
  initTechShowcase();
  initRealisations();
  initGallery();
  initStudio();
  initOrder();
  initContact();
  initEffects();
  initNav();
  refresh();

  $('#modalClose').addEventListener('click', () => ($('#modal').hidden = true));
  $('#modal').addEventListener('click', (e) => { if (e.target.id === 'modal') e.currentTarget.hidden = true; });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $('#modal').hidden = true; });
  document.fonts?.ready.then(() => { moveIndicator($('#sideSeg')); moveIndicator($('#modeTabs')); });
})();
